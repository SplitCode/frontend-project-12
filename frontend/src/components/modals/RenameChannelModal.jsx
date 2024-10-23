import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, Form, FormGroup, FormControl,
  FormLabel,
  Button,
} from 'react-bootstrap';
import { object, string } from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useEditChannelMutation, useGetChannelsQuery } from '../../api/channelsApi';
import { setCurrentChannel } from '../../store/slices/channelsSlice';

const RenameChannelModal = (props) => {
  const { showModal, handleClose, channelNames } = props;
  const { t } = useTranslation();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const modalChannelId = useSelector((state) => state.modals.modalChannelId);
  const modalChannelName = useSelector((state) => state.modals.modalChannelName);
  const [renameChannel] = useEditChannelMutation();
  const { refetch } = useGetChannelsQuery();

  const ModalSchema = object().shape({
    name: string().notOneOf(channelNames, t('errors.channelExists')).min(3, t('errors.minMaxLength')).max(20, t('errors.minMaxLength'))
      .required(t('errors.required')),
  });

  const refInput = useRef(null);
  useEffect(() => {
    if (refInput.current) {
      refInput.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: modalChannelName,
      channelId: modalChannelId,
    },
    validationSchema: ModalSchema,
    onSubmit: async (values) => {
      try {
        const data = {
          name: values.name,
          id: values.channelId,
          removable: true,
        };
        await renameChannel(data);
        refetch();
        handleClose();
        dispatch(setCurrentChannel(values));
        toast.success(t('toasts.renameChannel'));
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show={showModal === 'renaming'} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              id="name"
              name="name"
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              className="mb-2"
            />
            <FormLabel visuallyHidden htmlFor="name">{t('modals.channelName')}</FormLabel>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="me-2"
            >
              {t('modals.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {t('modals.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;

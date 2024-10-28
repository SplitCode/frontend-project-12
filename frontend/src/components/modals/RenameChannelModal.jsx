import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Modal, Form, FormGroup, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useEditChannelMutation } from '../../api/channelsApi';
import { RENAMING_MODAL } from '../../constants/modalTypes';

const RenameChannelModal = (props) => {
  const {
    showModal, handleClose, handleSelectChannel, t, inputRef,
    ModalSchema, modalChannelId, modalChannelName,
  } = props;

  const [renameChannel] = useEditChannelMutation();

  useEffect(() => {
    inputRef.current.select();
  }, [inputRef]);

  const formik = useFormik({
    initialValues: {
      name: modalChannelName,
      channelId: modalChannelId,
    },
    validationSchema: ModalSchema,
    onSubmit: async (values) => {
      try {
        const data = {
          name: filter.clean(values.name.trim()),
          id: values.channelId,
          removable: true,
        };
        const updatedChannel = await renameChannel(data).unwrap();
        handleClose();
        handleSelectChannel(updatedChannel);
        toast.success(t('toasts.renameChannel'));
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <Modal show={showModal === RENAMING_MODAL} onHide={handleClose}>
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
              onBlur={formik.handleBlur}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              isInvalid={formik.touched.name && formik.errors.name}
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

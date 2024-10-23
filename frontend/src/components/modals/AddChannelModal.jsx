import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, Form, FormGroup, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAddChannelMutation } from '../../api/channelsApi';

const AddChannelModal = (props) => {
  const {
    showModal, handleClose, refetch, handleSelectChannel, ModalSchema, t,
  } = props;
  const inputRef = useRef();
  const [addChannel] = useAddChannelMutation();

  const refInput = useRef(null);
  useEffect(() => {
    if (refInput.current) {
      refInput.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: ModalSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = {
          name: values.name,
          removable: true,
        };

        const newChannel = await addChannel(data).unwrap();
        toast.success(t('toasts.addChannel'));
        refetch();
        handleSelectChannel(newChannel);
        handleClose();
        resetForm();
      } catch (err) {
        console.log('Error adding channel', err);
      }
    },
  });

  return (
    <Modal show={showModal === 'adding'} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
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
              disabled={formik.isSubmitting}
            >
              {t('modals.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;

import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, Form, FormGroup, FormControl,
  FormLabel,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AddChannelModal = (props) => {
  const { t } = useTranslation();
  const { onHide } = props;
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    // validationSchema: AddModalSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
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
              onClick={onHide}
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

export default AddChannelModal;

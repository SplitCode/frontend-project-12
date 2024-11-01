import React, { useEffect } from 'react';
import {
  Form, FormGroup, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { object, string } from 'yup';
import { useAddChannelMutation, useGetChannelsQuery } from '../../api/channelsApi';

const AddChannelModal = (props) => {
  const {
    handleClose, handleSelectChannel, t, inputRef,
  } = props;

  const { data: channels = [] } = useGetChannelsQuery();
  const channelNames = channels.map((channel) => channel.name);
  const [addChannel] = useAddChannelMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const channelNameSchema = object().shape({
    name: string()
      .transform((value) => value.trim())
      .notOneOf(channelNames, t('errors.channelExists'))
      .min(3, t('errors.minMaxLength'))
      .max(20, t('errors.minMaxLength'))
      .required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelNameSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = {
          name: filter.clean(values.name.trim()),
          removable: true,
        };

        const newChannel = await addChannel(data).unwrap();
        toast.success(t('toasts.addChannel'));
        handleSelectChannel(newChannel);
        handleClose();
        resetForm();
      } catch (err) {
        console.error(err);
        toast.error(t('toasts.connectionError'));
      }
    },
  });

  return (
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
  );
};

export default AddChannelModal;

import React, { useEffect } from 'react';
import {
  Form, FormGroup, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { object, string } from 'yup';
import { useAddChannelMutation, useGetChannelsQuery } from '../../api/channelsApi';
import LoadingSpinner from '../LoadingSpinner';

const AddChannelModal = (props) => {
  const {
    handleClose, handleSelectChannel, t, inputRef,
  } = props;

  const { data: channels = [] } = useGetChannelsQuery();
  const channelNames = channels.map((channel) => channel.name);
  const [addChannel, { isLoading }] = useAddChannelMutation();

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
        resetForm();
      } catch (err) {
        toast.error(t('toasts.connectionError'));
      }
      handleClose();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <FormControl
          id="name"
          name="name"
          className="mb-2"
          ref={inputRef}
          onChange={formik.handleChange}
          value={formik.values.name}
          isInvalid={formik.touched.name && formik.errors.name}
          disabled={formik.isSubmitting}
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
          className="me-2"
          onClick={handleClose}
          disabled={formik.isSubmitting}
        >
          {t('modals.cancel')}
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!formik.dirty || formik.isSubmitting}
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              <span>{t('modals.send')}</span>
            </>
          ) : (
            t('modals.send')
          )}
        </Button>
      </div>
    </Form>
  );
};

export default AddChannelModal;

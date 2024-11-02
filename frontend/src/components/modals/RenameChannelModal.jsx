import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Form, FormGroup, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { object, string } from 'yup';
import { useEditChannelMutation, useGetChannelsQuery } from '../../api/channelsApi';
import LoadingSpinner from '../LoadingSpinner';

const RenameChannelModal = (props) => {
  const {
    handleClose, handleSelectChannel, t, inputRef, channelId, channelName,
  } = props;

  const [renameChannel, { isLoading }] = useEditChannelMutation();

  useEffect(() => {
    inputRef.current.select();
  }, [inputRef]);

  const { data: channels = [] } = useGetChannelsQuery();
  const channelNames = channels.map((channel) => channel.name);

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
      name: channelName,
      channelId,
    },
    validationSchema: channelNameSchema,
    onSubmit: async (values) => {
      try {
        const data = {
          name: filter.clean(values.name.trim()),
          id: values.channelId,
          removable: true,
        };
        const updatedChannel = await renameChannel(data).unwrap();
        handleSelectChannel(updatedChannel);
        toast.success(t('toasts.renameChannel'));
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

export default RenameChannelModal;

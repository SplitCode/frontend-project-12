// import React, { useEffect, useRef } from 'react';
import {
  Button, Nav, Col,
  Modal, Form, FormGroup, FormControl,
  FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useGetChannelsQuery, useAddChannelMutation } from '../api/channelsApi';
import { setCurrentChannel } from '../store/slices/channelsSlice';
import { setShowModal } from '../store/slices/modalsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  console.log(channels);
  const showModal = useSelector((state) => state.modals.showModal);
  const currentChannel = useSelector((state) => state.channel.currentChannel);
  const channelNames = channels.map((channel) => channel.name);
  const [addChannel] = useAddChannelMutation();
  // const inputRef = useRef();

  const AddModalSchema = object().shape({
    name: string().notOneOf(channelNames, t('errors.channelExists')).min(3, t('errors.minMaxLength')).max(20, t('errors.minMaxLength'))
      .required(t('errors.required')),
  });

  const handleSelectChannel = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

  const handleShowModal = () => {
    console.log('click');
    // dispatch(setShowModal({ showModal: true, modalType: 'adding' }));
    dispatch(setShowModal(true));
  };

  const handleCloseModal = () => {
    dispatch(setShowModal(false));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: AddModalSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);
        const data = {
          name: values.name,
          removable: true,
        };
        await addChannel(data);
        handleCloseModal();
        resetForm();
      } catch (err) {
        console.log('Error adding channel', err);
      }
    },
  });

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  return (
    <Col xs="4" md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleShowModal}
        >
          <PlusSquare className="fs-5" />
        </button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modals.addChannel')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
              <FormGroup>
                <FormControl
                  id="name"
                  name="name"
                  // ref={inputRef}
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
                  onClick={handleCloseModal}
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

      </div>
      <Nav className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Nav.Item key={channel.id}>
            <Button
              variant={currentChannel.id === channel.id ? 'secondary' : 'light'}
              className="w-100 rounded-0 text-start"
              onClick={() => handleSelectChannel(channel)}
            >
              <span className="me-1">&#35;</span>
              {channel.name}
            </Button>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;

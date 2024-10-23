import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation, useGetChannelsQuery } from '../../api/channelsApi';
import { setCurrentChannel } from '../../store/slices/channelsSlice';

const RemoveChannelModal = (props) => {
  const {
    showModal, handleClose,
  } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentChannelId = useSelector((state) => state.channel.currentChannel.id);
  const modalChannelId = useSelector((state) => state.modals.modalChannelId);
  const defaultChannel = { id: '1', name: 'general', removable: false };
  const [removeChannel] = useRemoveChannelMutation();
  const { refetch } = useGetChannelsQuery();

  const handleRemoveChannel = async (id) => {
    try {
      await removeChannel(id);
      refetch();
      handleClose();
      if (id === currentChannelId) {
        dispatch(setCurrentChannel(defaultChannel));
      }
      toast.success(t('toasts.channelDeleted'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={showModal === 'removing'} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <p className="lead">{t('modals.text')}</p>
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
              variant="danger"
              onClick={() => handleRemoveChannel(modalChannelId)}
            >
              {t('modals.remove')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;

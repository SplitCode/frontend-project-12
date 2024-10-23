import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import { REMOVING_MODAL } from '../../constants/modalTypes';

const RemoveChannelModal = (props) => {
  const {
    showModal, handleClose, handleSelectChannel, t, currentChannelId, modalChannelId, refetch,
  } = props;

  const defaultChannel = { id: '1', name: 'general', removable: false };
  const [removeChannel] = useRemoveChannelMutation();

  const handleRemoveChannel = async (id) => {
    try {
      await removeChannel(id).unwrap();
      refetch();
      handleClose();
      if (id === currentChannelId) {
        handleSelectChannel(defaultChannel);
      }
      toast.success(t('toasts.removeChannel'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={showModal === REMOVING_MODAL} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;

import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import DEFAULT_CHANNEL from '../../constants/defaultChannel';

const RemoveChannelModal = (props) => {
  const {
    handleClose, handleSelectChannel, t, currentChannelId, channelId,
  } = props;

  const [removeChannel] = useRemoveChannelMutation();

  const handleRemoveChannel = async (id) => {
    try {
      await removeChannel(id).unwrap();
      handleClose();
      if (id === currentChannelId) {
        handleSelectChannel(DEFAULT_CHANNEL);
      }
      toast.success(t('toasts.removeChannel'));
    } catch (err) {
      console.error(err);
      toast.error(t('toasts.connectionError'));
    }
  };

  return (
    <>
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
          onClick={() => handleRemoveChannel(channelId)}
        >
          {t('modals.remove')}
        </Button>
      </div>
    </>
  );
};

export default RemoveChannelModal;

import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import { DEFAULT_CHANNEL } from '../../store/slices/constants';
import LoadingSpinner from '../LoadingSpinner';

const RemoveChannelModal = (props) => {
  const {
    handleClose, handleSelectChannel, t, currentChannelId, channelId,
  } = props;

  const [removeChannel, { isLoading }] = useRemoveChannelMutation();

  const handleRemoveChannel = async (id) => {
    try {
      await removeChannel(id).unwrap();
      toast.success(t('toasts.removeChannel'));
      if (id === currentChannelId) {
        handleSelectChannel(DEFAULT_CHANNEL);
      }
    } catch (err) {
      toast.error(t('toasts.connectionError'));
    }
    handleClose();
  };

  return (
    <>
      <p className="lead">{t('modals.text')}</p>
      <div className="d-flex justify-content-end">
        <Button
          type="button"
          variant="secondary"
          className="me-2"
          onClick={handleClose}
        >
          {t('modals.cancel')}
        </Button>
        <Button
          type="submit"
          variant="danger"
          onClick={() => handleRemoveChannel(channelId)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              <span>{t('modals.remove')}</span>
            </>
          ) : (
            t('modals.remove')
          )}
        </Button>
      </div>
    </>
  );
};

export default RemoveChannelModal;

import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/channelsApi';

const RemoveChannelModal = (props) => {
  const { t } = useTranslation();
  const {
    showModal, handleClose, handleSelectChannel, channelId,
  } = props;
  const [removeChannel] = useRemoveChannelMutation();

  const formik = useFormik({
    initialValues: {
      id: channelId,
    },
    onSubmit: async (values) => {
      try {
        console.log('submit');
        await removeChannel(values.id).unwrap();
        handleClose();
        handleSelectChannel();
        toast.success(t('toasts.removeChannel'));
      } catch (err) {
        console.log('Error removing channel', err);
      }
    },
  });

  return (
    <Modal show={showModal === 'removing'} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
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

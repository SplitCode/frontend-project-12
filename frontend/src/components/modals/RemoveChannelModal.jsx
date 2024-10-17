import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const RemoveChannelModal = (props) => {
  const { t } = useTranslation();
  const { onHide } = props;

  const formik = useFormik({
    onSubmit: () => {
      console.log('submit');
    },
  });

  return (
    <Modal show onHide={onHide}>
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
              onClick={onHide}
              className="me-2"
            >
              {t('channel.cancel')}
            </Button>
            <Button
              type="submit"
              variant="danger"
            >
              {t('channel.remove')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;

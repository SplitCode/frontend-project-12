import { useSelector, useDispatch } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { selectIsOpen, closeModal, selectType } from '../../store/slices/modalsSlice';
import { MODALS } from './constants';

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const type = useSelector(selectType);
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const Component = MODALS[type];

  return (
    <BootstrapModal show={isOpen} onHide={handleClose} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>
          {t(`modals.${type}ChannelTitle`)}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {Component && <Component handleClose={handleClose} />}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;

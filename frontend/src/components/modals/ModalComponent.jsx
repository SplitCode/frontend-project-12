import { useSelector, useDispatch } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { selectIsOpen, closeModal, selectType } from '../../store/slices/modalsSlice';
import { MODALS } from './constants';

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const type = useSelector(selectType);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const Component = MODALS[type];

  return (
    <BootstrapModal show={isOpen} onHide={handleClose} centered>
      {Component && <Component handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;

// return ModalContent ? (
//   <Modal show={isOpened} onHide={handleClose} centered>
//     <Modal.Header closeButton>
//       <Modal.Title>
//         {t(`modals.${modalType}ChannelTitle`)}
//       </Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <ModalContent
//         handleClose={handleCloseModal}
//         inputRef={inputRef}
//         handleSelectChannel={handleSelectChannel}
//         currentChannelId={currentChannelId}
//         channelId={channelId}
//         channelName={channelName}
//         t={t}
//       />
//     </Modal.Body>
//   </Modal>
// ) : null;

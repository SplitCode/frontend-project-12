// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
// import { useSelector, useDispatch } from 'react-redux';

// const ModalContainer = ({ children }) => {
//   const { t } = useTranslation();
//   const showModal = useSelector(selectModal);

//   const handleCloseModal = () => {
//     dispatch(setChannelModal({ id: '', name: '', modalName: '' }));
//   };

//   return (
//   <Modal show={showModal} onHide={onHide}>
//     <Modal.Header closeButton>
//       <Modal.Title>{title}</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>{children}</Modal.Body>
//     <Modal.Footer>
//       <Button variant="secondary" onClick={onHide}>
//         {cancelText}
//       </Button>
//       <Button type="button" variant="primary" onClick={onSubmit} disabled={isSubmitting}>
//         {submitText}
//       </Button>
//     </Modal.Footer>
//   </Modal>
//   );
// };

// export default ModalContainer;

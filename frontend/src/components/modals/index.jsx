import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  closeModal, selectModal, selectChannelId, selectChannelName,
} from '../../store/slices/modalsSlice';
import { setCurrentChannel, selectCurrentChannelId } from '../../store/slices/channelsSlice';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import { ADDING_MODAL, REMOVING_MODAL, RENAMING_MODAL } from '../../constants/modalTypes';

const modals = {
  [ADDING_MODAL]: AddChannelModal,
  [REMOVING_MODAL]: RemoveChannelModal,
  [RENAMING_MODAL]: RenameChannelModal,
};

const ModalComponent = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const showModal = useSelector(selectModal);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const currentChannelId = useSelector(selectCurrentChannelId);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleSelectChannel = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

  const Modal = modals[showModal];

  return Modal ? (
    <Modal
      showModal={showModal}
      handleClose={handleCloseModal}
      dispatch={dispatch}
      inputRef={inputRef}
      handleSelectChannel={handleSelectChannel}
      currentChannelId={currentChannelId}
      channelId={channelId}
      channelName={channelName}
      t={t}
    />
  ) : null;
};

export default ModalComponent;

import { useSelector, useDispatch } from 'react-redux';
import { setShowModal } from '../../store/slices/modalsSlice';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import { useGetChannelsQuery } from '../../api/channelsApi';

const modals = {
  adding: AddChannelModal,
  removing: RemoveChannelModal,
  renaming: RenameChannelModal,
};

const ModalComponent = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modals.showModal);
  const { data: channels = [] } = useGetChannelsQuery();
  const channelNames = channels.map((channel) => channel.name);

  const handleCloseModal = () => {
    dispatch(setShowModal(''));
  };

  const Modal = modals[showModal];

  return Modal ? (
    <Modal
      showModal={showModal}
      handleClose={handleCloseModal}
      channelNames={channelNames}
    />
  ) : null;
};

export default ModalComponent;

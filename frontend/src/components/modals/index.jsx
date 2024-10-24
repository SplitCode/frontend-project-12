import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import { useGetChannelsQuery } from '../../api/channelsApi';
import { setChannelModal } from '../../store/slices/modalsSlice';
import { setCurrentChannel } from '../../store/slices/channelsSlice';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const modals = {
  adding: AddChannelModal,
  removing: RemoveChannelModal,
  renaming: RenameChannelModal,
};

const ModalComponent = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const showModal = useSelector((state) => state.modals.showModal);
  const modalChannelId = useSelector((state) => state.modals.modalChannelId);
  const modalChannelName = useSelector((state) => state.modals.modalChannelName);
  const currentChannelId = useSelector((state) => state.channel.currentChannel.id);

  const { data: channels = [] } = useGetChannelsQuery();
  const channelNames = channels.map((channel) => channel.name);

  const ModalSchema = object().shape({
    name: string().notOneOf(channelNames, t('errors.channelExists')).min(3, t('errors.minMaxLength')).max(20, t('errors.minMaxLength'))
      .required(t('errors.required')),
  });

  const handleCloseModal = () => {
    dispatch(setChannelModal({ id: '', name: '', modalName: '' }));
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
      modalChannelId={modalChannelId}
      modalChannelName={modalChannelName}
      ModalSchema={ModalSchema}
      t={t}
    />
  ) : null;
};

export default ModalComponent;

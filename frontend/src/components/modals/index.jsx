import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import { setChannelModal } from '../../store/slices/modalsSlice';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import { useGetChannelsQuery } from '../../api/channelsApi';
import { setCurrentChannel } from '../../store/slices/channelsSlice';

const modals = {
  adding: AddChannelModal,
  removing: RemoveChannelModal,
  renaming: RenameChannelModal,
};

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const showModal = useSelector((state) => state.modals.showModal);
  const channelId = useSelector((state) => state.modals.modalChannelId);
  console.log(channelId);

  const { data: channels = [], refetch } = useGetChannelsQuery();
  console.log(channels);
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
      channelNames={channelNames}
      refetch={refetch}
      handleSelectChannel={handleSelectChannel}
      channelId={channelId}
      t={t}
      ModalSchema={ModalSchema}
    />
  ) : null;
};

export default ModalComponent;

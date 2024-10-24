import { Nav, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetChannelsQuery, channelsApi } from '../../api/channelsApi';
import { setChannelModal } from '../../store/slices/modalsSlice';
import { ADDING_MODAL } from '../../constants/modalTypes';
import { useSocket } from '../../store/hooks/hooks';
import ModalComponent from '../modals';
import ChannelItem from './ChannelsItem';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const socket = useSocket();
  const { data: channels = [] } = useGetChannelsQuery();

  const handleShowModal = (modalName, channel = { id: '', name: '' }) => {
    dispatch(setChannelModal({ id: channel.id, name: channel.name, modalName }));
  };

  useEffect(() => {
    const handleNewChannel = (channel) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel);
      }));
    };

    const handleRemoveChannel = ({ id }) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.filter((curChannels) => curChannels.id !== id)));
    };

    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
    };
  }, [dispatch, socket]);

  return (
    <Col xs="4" md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => handleShowModal(ADDING_MODAL)}
        >
          {t('chat.plus')}
        </button>
      </div>

      <Nav className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channelItem={channel}
            handleShowModal={handleShowModal}
          />
        ))}
      </Nav>
      <ModalComponent />
    </Col>
  );
};

export default Channels;

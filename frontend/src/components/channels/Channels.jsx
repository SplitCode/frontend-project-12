import { Nav, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { useGetChannelsQuery } from '../../api/channelsApi';
import { setChannelModal } from '../../store/slices/modalsSlice';
import ModalComponent from '../modals';
import ChannelItem from './ChannelsItem';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();

  const handleShowModal = (modalName, channel = { id: '', name: '' }) => {
    dispatch(setChannelModal({ id: channel.id, name: channel.name, modalName }));
  };

  return (
    <Col xs="4" md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => handleShowModal('adding')}
        >
          <PlusSquare className="fs-5" />
        </button>
      </div>

      <ModalComponent />

      <Nav className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channelItem={channel}
            handleShowModal={handleShowModal}
          />
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;

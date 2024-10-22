import {
  Button, Nav, Col, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { useGetChannelsQuery } from '../api/channelsApi';
import { setCurrentChannel } from '../store/slices/channelsSlice';
import { setChannelModal } from '../store/slices/modalsSlice';
// import AddChannelModal from './modals/AddChannelModal';
// import RemoveChannelModal from './modals/RemoveChannelModal';
import ModalComponent from './modals';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  // console.log(channels);
  // const showModal = useSelector((state) => state.modals.showModal);
  const currentChannel = useSelector((state) => state.channel.currentChannel);
  // const channelNames = channels.map((channel) => channel.name);

  const handleSelectChannel = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

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
          <Nav.Item key={channel.id} className="w-100">

            {channel.removable ? (
              <Dropdown as={ButtonGroup} drop="down" className="w-100">
                <Button
                  onClick={() => handleSelectChannel(channel)}
                  className="w-100 rounded-0 text-start text-truncate"
                  variant={currentChannel.id === channel.id ? 'secondary' : 'light'}
                >
                  <span className="me-1">&#35;</span>
                  {channel.name}
                </Button>
                <Dropdown.Toggle className="text-end" split variant={currentChannel.id === channel.id ? 'secondary' : 'light'} id={`dropdown-split-button${channel.id}`} />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleShowModal('removing', channel)}>{t('modals.remove')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleShowModal('renaming', channel)}>{t('modals.rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                variant={currentChannel.id === channel.id ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start"
                onClick={() => handleSelectChannel(channel)}
              >
                <span className="me-1">&#35;</span>
                {channel.name}
              </Button>
            )}
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;

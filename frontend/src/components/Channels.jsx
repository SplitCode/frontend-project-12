import { Button, Nav, Col } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery } from '../api/channelsApi';
import { setCurrentChannel } from '../store/slices/channelsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  console.log(channels);
  const currentChannel = useSelector((state) => state.channel.currentChannel);

  const handleChannelClick = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

  return (
    <Col xs="4" md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button
          size="sm"
          variant="outline-primary"
        >
          <Plus />
        </Button>
      </div>
      <Nav className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Nav.Item key={channel.id}>
            <Button
              variant={currentChannel.id === channel.id ? 'secondary' : 'light'}
              className="w-100 rounded-0 text-start"
              onClick={() => handleChannelClick(channel)}
            >
              <span className="me-1">&#35;</span>
              {channel.name}
            </Button>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;

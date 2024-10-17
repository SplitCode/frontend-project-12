import { Button, Nav, Col } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery } from '../api/channelsApi';

const Channels = () => {
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  console.log(channels);

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
              variant="light"
              className="w-100 rounded-0 text-start"
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

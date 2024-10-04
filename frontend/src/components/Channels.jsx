import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useGetChannelsQuery } from '../api/getChannels';

const Channels = () => {
  const channels = useGetChannelsQuery;
  console.log(channels);

  return (
    <Col md="2" xs="4" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          size="sm"
          variant="outline-primary"
          onClick={console.log('+')}
        >
          +
        </Button>
      </div>
      <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        <Nav.Item>
          <Button
            variant="secondary"
            className="w-100 rounded-0 text-start"
          >
            <span className="me-1">#</span>
            general
          </Button>
        </Nav.Item>

        <Nav.Item>
          <Button
            variant="light"
            className="w-100 rounded-0 text-start"
          >
            <span className="me-1">#</span>
            random
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            variant="light"
            className="w-100 rounded-0 text-start"
          >
            <span className="me-1">#</span>
            111
          </Button>
        </Nav.Item>
      </Nav>
    </Col>
  );
};

export default Channels;

import {
  Button, Container, Row, Col, Form,
} from 'react-bootstrap';

const ChatPage = () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
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
        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          <li className="nav-item w-100">
            <Button
              variant="secondary"
              className="w-100 rounded-0 text-start"
            >
              <span className="me-1">#</span>
              general
            </Button>
          </li>
          <li className="nav-item w-100">
            <Button
              variant="secondary"
              className="w-100 rounded-0 text-start"
            >
              <span className="me-1">#</span>
              random
            </Button>
          </li>
          <li className="nav-item w-100">
            <div role="group" className="d-flex dropdown btn-group">
              <Button
                type="button"
                className="w-100 rounded-0 text-start text-truncate btn"
              >
                <span className="me-1">#</span>
                111
              </Button>
            </div>
          </li>
        </ul>
      </Col>
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b>#general</b>
            </p>
            <span className="text-muted">0 сообщений</span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5 ">
            Сообщения
          </div>
          <div className="mt-auto px-5 py-3">
            <Form
              noValidate
              className="py-1 border rounded-2"
            >
              <Form.Group className="input-group">
                <Form.Control
                  name="messageBody"
                  autoComplete="off"
                  aria-label="Новое сообщение"
                  placeholder="Введите сообщение..."
                  className="border-0 p-0 ps-2"
                />
                <Button type="submit" variant="light" className="border-0">
                  <span className="visually-hidden">Отправить</span>
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </Row>
  </Container>
);

export default ChatPage;

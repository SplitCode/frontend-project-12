import { Button, Col, Form } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';

const Messages = () => (
  <Col className="p-0 h-100">
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
              <ArrowRightSquare />
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  </Col>
);

export default Messages;

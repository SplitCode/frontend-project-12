import {
  Button, Container, Row, Form,
} from 'react-bootstrap';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import Channels from '../components/Channels';
// import apiPath from '../api/apiPath';

const ChatPage = () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Channels />
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

// const [channels, setChannels] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);
// const auth = useAuth();

// useEffect(() => {
//   const token = localStorage.getItem('chat-token');

//   const getChannels = async () => {
//     try {
//       const response = await axios.get(apiPath.channelsPath(), {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setChannels(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError('Ошибка при загрузке данных');
//       setLoading(false);
//     }
//   };
//   getChannels();
// }, []);

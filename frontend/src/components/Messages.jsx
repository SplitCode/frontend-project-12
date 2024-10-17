import { Col, Form } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery, useAddMessageMutation } from '../api/messagesApi';

const Messages = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector((state) => state.channel.currentChannel);
  const username = useSelector((state) => state.auth.username);

  const { data: messages = [] } = useGetMessagesQuery(currentChannel.id); // ????
  console.log(messages);

  const [addMessage] = useAddMessageMutation();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { message } = values;
        const data = {
          message,
          channelId: currentChannel.id,
          username,
        };
        await addMessage(data);
        resetForm();
      } catch (error) {
        console.error(error);
      }
      setSubmitting(false);
    },
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              &#35;
              {' '}
              {currentChannel.name}
            </b>
          </p>
          <span className="text-muted">{`${t('chat.messages', { count: messages.length })}`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>
                {message.username}
                :
              </b>
              {' '}
              {message}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form
            noValidate
            className="py-1 border rounded-2"
            onSubmit={formik.onSubmit}
          >
            <Form.Group className="input-group has-validation">
              <Form.Control
                name="message"
                aria-label={t('chat.newMessage')}
                placeholder={t('chat.enterMessage')}
                className="border-0 p-0 ps-2"
                value={formik.values.message}
                onChange={formik.handleChange}
              />
              <button type="submit" className="btn btn-group-vertical">
                <ArrowRightSquare />
                <span className="visually-hidden">{t('chat.send')}</span>
              </button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
};
export default Messages;

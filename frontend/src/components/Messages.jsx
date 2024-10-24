import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Form } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { useGetMessagesQuery, useAddMessageMutation } from '../api/messagesApi';

const Messages = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const messageRef = useRef();

  const { data: messages = [] } = useGetMessagesQuery();

  const username = useSelector((state) => state.auth.username);
  const currentChannel = useSelector((state) => state.channel.currentChannel);
  const channelMessages = messages.filter((message) => message.channelId === currentChannel.id);

  const [addMessage] = useAddMessageMutation();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { message } = values;
        const data = {
          message: filter.clean(message),
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [formik.isSubmitting, currentChannel]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {`# ${currentChannel.name}`}
            </b>
          </p>
          <span className="text-muted">
            {t('chat.message', { count: channelMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messageRef}>
          {channelMessages.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              {': '}
              {message.message}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form
            noValidate
            className="py-1 border rounded-2"
            onSubmit={formik.handleSubmit}
          >
            <Form.Group className="input-group has-validation">
              <Form.Control
                name="message"
                aria-label={t('chat.newMessage')}
                placeholder={t('chat.enterMessage')}
                className="border-0 p-0 ps-2 form-control"
                value={formik.values.message}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
                ref={inputRef}
              />
              <button type="submit" className="btn btn-group-vertical" disabled={formik.isSubmitting || !formik.values.message.trim()}>
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

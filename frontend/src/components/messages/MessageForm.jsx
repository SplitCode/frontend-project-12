import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { selectUsername } from '../../store/slices/authSlice';
import { useAddMessageMutation } from '../../api/messagesApi';

const MessageForm = ({ currentChannel }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const username = useSelector(selectUsername);
  const [addMessage] = useAddMessageMutation();

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
  );
};

export default MessageForm;

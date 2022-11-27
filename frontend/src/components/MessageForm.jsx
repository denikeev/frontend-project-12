import {
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';

import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';

const MessageForm = ({ currentChannelId, socket }) => {
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: { text: '' },
    onSubmit: (values, actions) => {
      const username = localStorage.getItem('username');
      const message = {
        body: values.text,
        username,
        channelId: currentChannelId,
      };

      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);

      socket.emit('newMessage', message, (response) => {
        if (response.status === 'ok') {
          actions.setSubmitting(false);
          actions.resetForm();
        }
      });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <InputGroup>
        <Form.Control
          className="border-0 p-0 ps-2"
          onChange={formik.handleChange}
          name="text"
          id="text"
          value={formik.values.text}
          placeholder="Введите сообщение..." // добавить i18next
          aria-label="Новое сообщение"
          ref={inputRef}
          disabled={formik.isSubmitting}
        />
        <Button className="btn-group-vertical border-0" variant={null} type="submit" disabled={!formik.values.text}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="#212529">
            <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;

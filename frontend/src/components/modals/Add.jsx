import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { channelsSelector } from '../../slices/channelsSlice.js';

const Add = ({ onHide, socket }) => {
  const inputRef = useRef();
  const channels = useSelector(channelsSelector.selectAll);
  const channelNames = channels.map((el) => el.name);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: yup.object({
      name: yup.mixed().notOneOf(channelNames, 'Имя должно быть уникальным').required('обязательное поле'),
    }),

    onSubmit: ({ name }, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);

      socket.emit('newChannel', { name }, (response) => {
        if (response.status === 'ok') {
          onHide();
          actions.setSubmitting(false);
        }
      });
    },
  });

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group mb-3" controlId="formNameId">
            <FormControl name="name" data-testid="input-body" type="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} ref={inputRef} isInvalid={formik.errors.name} disabled={formik.isSubmitting} />
            {formik.touched.name && formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
            <Form.Control.Feedback type="invalid" />
          </FormGroup>
          <Button className="me-2" variant="secondary" onClick={onHide}>Отменить</Button>
          <Button onSubmit={formik.handleSubmit} variant="primary" type="submit">Отправить</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;

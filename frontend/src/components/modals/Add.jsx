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
    onSubmit: ({ name }) => {
      socket.emit('newChannel', { name });
      onHide();
      formik.setSubmitting(false);
    },
  });

  return (
    <Modal show>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup className="form-group" controlId="formNameId">
            <FormControl name="name" data-testid="input-body" type="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} ref={inputRef} isInvalid={formik.errors.name} />
            {formik.touched.name && formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
            <Form.Control.Feedback type="invalid" />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Отменить</Button>
          <Button onSubmit={formik.handleSubmit} variant="primary" type="submit">Отправить</Button>
          {/* <input className="btn btn-primary" type="submit" value="submit" /> */}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Add;

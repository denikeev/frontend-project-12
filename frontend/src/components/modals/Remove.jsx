import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
} from 'react-bootstrap';

const Remove = ({ onHide, socket, channel }) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 3000);

    socket.emit('removeChannel', { id: channel.id }, (response) => {
      if (response.status === 'ok') {
        onHide();
        setSubmitting(false);
      }
    });
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Button className="me-2" variant="secondary" onClick={onHide} disabled={isSubmitting}>Отменить</Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>Удалить</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;

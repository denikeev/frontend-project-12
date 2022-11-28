import {
  Modal,
  Button,
  Form,
} from 'react-bootstrap';

const Remove = ({ onHide, socket, channel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('removeChannel', { id: channel.id });
    onHide();
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Button className="me-2" variant="secondary" onClick={onHide}>Отменить</Button>
          <Button variant="primary" type="submit">Удалить</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;

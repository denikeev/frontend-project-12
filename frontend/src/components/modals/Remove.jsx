import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Button,
  Form,
} from 'react-bootstrap';

import notify from '../../notify.js';

const Remove = ({ onHide, socket, channel }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { t } = useTranslation('translation');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 3000);

    socket.volatile.emit('removeChannel', { id: channel.id }, (response) => {
      if (response.status === 'ok') {
        onHide();
        setSubmitting(false);
        notify('success', t('notifications.deleteChannel'));
      }
    });
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirm')}</p>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Button className="me-2" variant="secondary" onClick={onHide} disabled={isSubmitting}>{t('modals.cancel')}</Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>{t('modals.delete')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;

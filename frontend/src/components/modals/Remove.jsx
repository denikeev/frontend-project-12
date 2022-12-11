import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Button,
  Form,
} from 'react-bootstrap';

import useSocket from '../../hooks/useSocket.jsx';
import { hideModal } from '../../slices/modalSlice.js';
import notify from '../../notify.js';

const Remove = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const { t } = useTranslation('translation');
  const channel = useSelector((state) => state.modalState.channel);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 3000);

    socket.volatile.emit('removeChannel', { id: channel.id }, (response) => {
      if (response.status === 'ok') {
        dispatch(hideModal());
        setSubmitting(false);
        notify('success', t('notifications.deleteChannel'));
      }
    });
  };

  return (
    <Modal show onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirm')}</p>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Button className="me-2" variant="secondary" onClick={() => dispatch(hideModal())} disabled={isSubmitting}>{t('modals.cancel')}</Button>
          <Button variant="danger" type="submit" disabled={isSubmitting}>{t('modals.delete')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;

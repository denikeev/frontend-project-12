import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useSocket from '../../hooks/useSocket.jsx';
import { channelsSelector } from '../../slices/channelsSlice.js';
import { hideModal } from '../../slices/modalSlice.js';
import notify from '../../notify.js';

const Rename = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const channels = useSelector(channelsSelector.selectAll);
  const channel = useSelector((state) => state.modalState.channel);
  const { t } = useTranslation('translation');
  const channelNames = channels.map((el) => el.name);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: { name: channel.name },
    validationSchema: yup.object({
      name: yup.string().min(3, t('signUpPage.validation.usernameMinMax')).max(20, t('signUpPage.validation.usernameMinMax')).required(t('signUpPage.validation.required'))
        .notOneOf(channelNames, t('modals.uniqName')),
    }),
    onSubmit: ({ name }, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);

      socket.volatile.emit('renameChannel', { id: channel.id, name }, (response) => {
        if (response.status === 'ok') {
          dispatch(hideModal());
          actions.setSubmitting(false);
          notify('success', t('notifications.renameChannel'));
        }
      });
    },
  });

  return (
    <Modal show onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group mb-3" controlId="name">
            <FormControl
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name}
              disabled={formik.isSubmitting}
              ref={inputRef}
              name="name"
              type="name"
            />
            <Form.Label className="visually-hidden">{t('modals.labelChannelName')}</Form.Label>
            {formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
          </FormGroup>
          <Button className="me-2" variant="secondary" onClick={() => dispatch(hideModal())}>
            {t('modals.cancel')}
          </Button>
          <Button
            onSubmit={formik.handleSubmit}
            variant="primary"
            type="submit"
          >
            {t('modals.submit')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;

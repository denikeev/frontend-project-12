import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';

import useSocket from '../../hooks/useSocket.jsx';
import { setCurrentChannel, channelsSelector } from '../../slices/channelsSlice.js';
import { hideModal } from '../../slices/modalSlice.js';
import notify from '../../notify.js';

const Add = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const inputRef = useRef();
  const channels = useSelector(channelsSelector.selectAll);
  const channelNames = channels.map((el) => el.name);
  const { t } = useTranslation('translation');

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: yup.object({
      name: yup.string().min(3, t('signUpPage.validation.usernameMinMax')).max(20, t('signUpPage.validation.usernameMinMax')).required(t('signUpPage.validation.required'))
        .notOneOf(channelNames, t('modals.uniqName')),
    }),

    onSubmit: ({ name }, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);

      socket.volatile.emit('newChannel', { name }, (response) => {
        if (response.status === 'ok') {
          dispatch(setCurrentChannel(response.data.id));
          dispatch(hideModal());
          actions.setSubmitting(false);
          notify('success', t('notifications.addChannel'));
        }
      });
    },
  });

  return (
    <Modal show onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group mb-3" controlId="name">
            <FormControl
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              isInvalid={formik.errors.name}
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

export default Add;

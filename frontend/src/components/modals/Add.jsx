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
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel, channelsSelector } from '../../slices/channelsSlice.js';
import notify from '../../notify.js';

const Add = ({ onHide, socket }) => {
  const inputRef = useRef();
  const channels = useSelector(channelsSelector.selectAll);
  const channelNames = channels.map((el) => el.name);
  const dispatch = useDispatch();
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
          onHide();
          actions.setSubmitting(false);
          notify('success', t('notifications.addChannel'));
        }
      });
    },
  });

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group mb-3" controlId="name">
            <FormControl name="name" data-testid="input-body" type="name" value={formik.values.name} onChange={formik.handleChange} ref={inputRef} isInvalid={formik.errors.name} disabled={formik.isSubmitting} aria-label={t('modals.ariaAddInput')} />
            {formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
          </FormGroup>
          <Button className="me-2" variant="secondary" onClick={onHide}>{t('modals.cancel')}</Button>
          <Button onSubmit={formik.handleSubmit} variant="primary" type="submit">{t('modals.submit')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;

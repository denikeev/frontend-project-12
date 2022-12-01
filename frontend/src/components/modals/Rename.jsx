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
import { useTranslation } from 'react-i18next';
import { channelsSelector } from '../../slices/channelsSlice.js';

const Rename = ({ onHide, socket, channel }) => {
  console.log('channel>>>', channel);
  const inputRef = useRef();
  const channels = useSelector(channelsSelector.selectAll);
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

      socket.emit('renameChannel', { id: channel.id, name }, (response) => {
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
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
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
          <Button className="me-2" variant="secondary" onClick={onHide}>{t('modals.cancel')}</Button>
          <Button onSubmit={formik.handleSubmit} variant="primary" type="submit">{t('modals.submit')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;

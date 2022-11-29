import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { logIn } from '../slices/authSlice.js';
import routes from '../routes.js';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const { t } = useTranslation('translation', { keyPrefix: 'forms.login' });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: yup.object({
      username: yup.string().required('Required'),
      password: yup.string().required('Required').min(5, t('passwordMinText')),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        localStorage.setItem('username', res.data.username);
        dispatch(logIn());
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.response && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <fieldset disabled={formik.isSubmitting}>
        <Form.Group className="mb-3">
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            id="username"
            name="username"
            placeholder={t('namePlaceholder')}
            autoComplete="username"
            isInvalid={authFailed}
            required
            ref={inputRef}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
            name="password"
            type="password"
            placeholder={t('passwordPlaceholder')}
            autoComplete="current-password"
            isInvalid={authFailed}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <Form.Control.Feedback type="invalid">{t('authFailed')}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          {t('loginBtn')}
        </Button>
      </fieldset>
    </Form>
  );
};

export default LoginPage;

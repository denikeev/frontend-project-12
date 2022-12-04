import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';

import * as yup from 'yup';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  FloatingLabel,
} from 'react-bootstrap';
import notify from '../notify.js';
import { logIn } from '../slices/authSlice.js';
import routes from '../routes.js';
import Header from './Header.jsx';

const SignUpPage = () => {
  const { t } = useTranslation('translation');
  const { t: tc } = useTranslation('translation', { keyPrefix: 'commonLoginSignUpForms' });
  const [signUpFailed, setSignUpFailed] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rollbar = useRollbar();

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: yup.object({
      username: yup.string().required(t('signUpPage.validation.required')).min(3, t('signUpPage.validation.usernameMinMax')).max(20, t('validation.usernameMinMax')),
      password: yup.string().required(t('signUpPage.validation.required')).min(6, t('signUpPage.validation.passwordMin')),
      confirmPassword: yup.string().oneOf([yup.ref('password')], t('signUpPage.validation.passwordsMatch')),
    }),
    onSubmit: async ({ username, password }) => {
      setSignUpFailed(false);

      try {
        const res = await axios.post(routes.signUpPath(), { username, password });
        localStorage.setItem('userId', JSON.stringify(res.data));
        localStorage.setItem('username', res.data.username);
        dispatch(logIn());
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.response && err.response.status === 409) {
          setSignUpFailed(true);
          inputRef.current.select();
          return;
        }
        if (err.code === 'ERR_NETWORK') {
          notify('warn', t('notifications.networkWarn'), { autoClose: 7000 });
          return;
        }
        rollbar.error('unknown signup error', err);
        throw err;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container fluid className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <img src="/images/tota.jpg" className="rounded-circle" alt={t('signUpPage.title')} />
                <Form onSubmit={formik.handleSubmit} className="w-50">
                  <h1 className="text-center mb-4">{t('signUpPage.title')}</h1>
                  <fieldset disabled={formik.isSubmitting}>
                    <FloatingLabel controlId="username" label={tc('usernameLabel')} className="mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        name="username"
                        placeholder={tc('usernameLabel')}
                        autoComplete="username"
                        isInvalid={!!formik.errors.username || signUpFailed}
                        ref={inputRef}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="password" label={tc('passwordLabel')} className="mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        name="password"
                        type="password"
                        placeholder={tc('passwordLabel')}
                        autoComplete="new-password"
                        aria-describedby="passwordHelpBlock"
                        isInvalid={(formik.touched.password && !!formik.errors.password)
                          || signUpFailed}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="confirmPassword" label={t('signUpPage.confirmPassLabel')} className="mb-4">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        name="confirmPassword"
                        type="password"
                        placeholder={t('signUpPage.confirmPassLabel')}
                        autoComplete="new-password"
                        isInvalid={(formik.touched.password && !!formik.errors.confirmPassword)
                          || signUpFailed}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword || t('signUpPage.userExist')}</Form.Control.Feedback>
                    </FloatingLabel>
                    <Button variant="outline-primary" className="w-100" type="submit">{t('signUpPage.signUp')}</Button>
                  </fieldset>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpPage;

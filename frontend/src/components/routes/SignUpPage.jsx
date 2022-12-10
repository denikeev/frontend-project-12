import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRollbar } from '@rollbar/react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
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
import notify from '../../notify.js';
import useAuth from '../../hooks/useAuth.jsx';
import routes from '../../routes.js';
import urls from '../../urls.js';

const SignUpPage = () => {
  const rollbar = useRollbar();
  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  const inputRef = useRef();
  const auth = useAuth();
  const [signUpFailed, setSignUpFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: yup.object({
      username: yup.string().required(t('signUpPage.validation.required')).min(3, t('signUpPage.validation.usernameMinMax')).max(20, t('validation.usernameMinMax')),
      password: yup.string().required(t('signUpPage.validation.required')).min(6, t('signUpPage.validation.passwordMin')),
      confirmPassword: yup.string().oneOf([yup.ref('password')], t('signUpPage.validation.passwordsMustMatch')),
    }),
    onSubmit: async ({ username, password }) => {
      setSignUpFailed(false);

      try {
        const res = await axios.post(routes.signUpPath(), { username, password });
        auth.logIn(res.data);
        navigate(urls.root);
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

  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm p-3 p-sm-4 p-lg-5">
            <Row className="align-items-center justify-content-around">
              <div className="col-auto text-center">
                <img src="/images/tota.jpg" className="rounded-circle" alt={t('signUpPage.title')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col col-xl-6">
                <h1 className="text-center mb-4">{t('signUpPage.title')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <FloatingLabel controlId="username" label={t('signUpPage.usernameLabel')} className="mb-3">
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      isInvalid={!!formik.errors.username || signUpFailed}
                      ref={inputRef}
                      name="username"
                      placeholder={t('signUpPage.validation.usernameMinMax')}
                      autoComplete="username"
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel controlId="password" label={t('loginPage.passwordLabel')} className="mb-3">
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={(formik.touched.password && !!formik.errors.password)
                        || signUpFailed}
                      name="password"
                      type="password"
                      placeholder={t('signUpPage.validation.passwordMin')}
                      autoComplete="new-password"
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel controlId="confirmPassword" label={t('signUpPage.confirmPassLabel')} className="mb-4">
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      isInvalid={(formik.touched.password && !!formik.errors.confirmPassword)
                        || signUpFailed}
                      name="confirmPassword"
                      type="password"
                      placeholder={t('signUpPage.validation.passwordsMustMatch')}
                      autoComplete="new-password"
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword || t('signUpPage.userExist')}</Form.Control.Feedback>
                  </FloatingLabel>
                  <Button variant="outline-primary" className="w-100" type="submit">{t('signUpPage.signUp')}</Button>
                </fieldset>
              </Form>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useRollbar } from '@rollbar/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  FloatingLabel,
} from 'react-bootstrap';

import routes from '../../routes.js';
import useAuth from '../../hooks/useAuth.jsx';
import notify from '../../notify.js';
import urls from '../../urls.js';

const LoginPage = () => {
  const rollbar = useRollbar();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { t } = useTranslation('translation');
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        auth.logIn(res.data);
        navigate(urls.root);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.response && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        if (err.code === 'ERR_NETWORK') {
          notify('warn', t('notifications.networkWarn'), { autoClose: 7000 });
          return;
        }
        rollbar.error('unknown login error', err);
        throw err;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row justify-content-center p-5">
              <Col xs={12} md={6} className="d-flex">
                <img src="/images/tota-on-top.jpg" className="m-auto rounded-circle" alt={t('loginPage.title')} />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-sm-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <FloatingLabel controlId="username" label={t('loginPage.usernameLabel')} className="mb-3">
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      isInvalid={authFailed}
                      ref={inputRef}
                      name="username"
                      placeholder={t('loginPage.usernameLabel')}
                      autoComplete="username"
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="password" label={t('loginPage.passwordLabel')} className="mb-4">
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={authFailed}
                      name="password"
                      type="password"
                      placeholder={t('loginPage.passwordLabel')}
                      autoComplete="current-password"
                      required
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{t('loginPage.invalidAuth')}</Form.Control.Feedback>
                  </FloatingLabel>
                  <Button variant="outline-primary" className="w-100" type="submit">
                    {t('loginPage.loginBtn')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4 text-center">
              <span>
                {t('loginPage.noAccount')}
                {' '}
              </span>
              <Link to="/signup">{t('signUpPage.title')}</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;

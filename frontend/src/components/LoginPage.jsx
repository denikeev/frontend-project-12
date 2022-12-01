import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  FloatingLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Header from './Header.jsx';
import { logIn } from '../slices/authSlice.js';
import routes from '../routes.js';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const { t } = useTranslation('translation');

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
        console.log('res>>>', res);
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
    <div className="d-flex flex-column h-100">
      <Header />
      <Container fluid className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                  <img src="/images/tota-on-top.jpg" className="rounded-circle" alt={t('loginPage.title')} />
                </Col>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
                  <fieldset disabled={formik.isSubmitting}>
                    <FloatingLabel controlId="username" label={t('commonLoginSignUpForms.usernameLabel')} className="mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        name="username"
                        placeholder={t('commonLoginSignUpForms.usernameLabel')}
                        autoComplete="username"
                        required
                        isInvalid={authFailed}
                        ref={inputRef}
                      />
                    </FloatingLabel>
                    <FloatingLabel controlId="password" label={t('commonLoginSignUpForms.passwordLabel')} className="mb-4">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        name="password"
                        type="password"
                        placeholder={t('commonLoginSignUpForms.passwordLabel')}
                        autoComplete="current-password"
                        required
                        isInvalid={authFailed}
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
    </div>
  );
};

export default LoginPage;

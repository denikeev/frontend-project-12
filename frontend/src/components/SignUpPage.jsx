import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { logIn } from '../slices/authSlice.js';
import routes from '../routes.js';

const SignUpPage = () => {
  const [signUpFailed, setSignUpFailed] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: yup.object({
      username: yup.string().required('Обязательное поле').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
      password: yup.string().required('Обязательное поле').min(6, 'Не менее 6 символов'),
      confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    }),
    onSubmit: async ({ username, password }) => {
      setSignUpFailed(false);

      try {
        const res = await axios.post(routes.signUpPath({ username, password }));
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
        throw err;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Container fluid className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <img src="/images/tota.jpg" className="rounded-circle" alt="Регистрация" />
                <Form onSubmit={formik.handleSubmit} className="w-50">
                  <h1 className="text-center mb-4">Регистрация</h1>
                  <fieldset disabled={formik.isSubmitting}>
                    <FloatingLabel controlId="username" label="Имя пользователя" className="mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        name="username"
                        placeholder="От 3 до 20 символов"
                        autoComplete="username"
                        isInvalid={!!formik.errors.username || signUpFailed}
                        ref={inputRef}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="password" label="Пароль" className="mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        name="password"
                        type="password"
                        placeholder="Не менее 6 символов"
                        autoComplete="new-password"
                        aria-describedby="passwordHelpBlock"
                        isInvalid={(formik.touched.password && !!formik.errors.password)
                          || signUpFailed}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="confirmPassword" label="Подтвердите пароль" className="mb-4">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        name="confirmPassword"
                        type="password"
                        placeholder="Пароли должны совпадать"
                        autoComplete="new-password"
                        isInvalid={(formik.touched.password && !!formik.errors.confirmPassword)
                          || signUpFailed}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword || 'Такой пользователь существует'}</Form.Control.Feedback>
                    </FloatingLabel>
                    <Button variant="outline-primary" className="w-100" type="submit">Зарегистрироваться</Button>
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

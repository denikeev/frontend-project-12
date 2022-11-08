import { useFormik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'forms.login' });

  const formik = useFormik({
    initialValues: { name: '', password: '' },
    validationSchema: yup.object({
      name: yup.string().required('Required'),
      password: yup.string().required('Required').min(6, 'Must be 6 characters or greater'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          id="name"
          name="name"
          type="text"
          placeholder={t('namePlaceholder')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          autoComplete="off"
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          id="password"
          name="password"
          type="password"
          placeholder={t('passwordPlaceholder')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </Form.Group>
      <Button variant="primary" type="submit">
        {t('loginBtn')}
      </Button>
    </Form>
  );
};

export default LoginPage;

import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { setUserData } from '../../store/slices/authSlice';
import { useLoginMutation } from '../../api/authApi';
import { ROOT_PATH, getRoutesPath } from '../../router/routesPath';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const [login, { isLoading }] = useLoginMutation();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setAuthFailed(false);
      try {
        const data = await login(values).unwrap();
        dispatch(setUserData(data));
        navigate(getRoutesPath(ROOT_PATH));
      } catch (err) {
        if (err.status === 401) {
          setFieldError('username', t('errors.invalidData'));
          setAuthFailed(true);
          inputRef.current.select();
        } else {
          toast.error(t('toasts.connectionError'));
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">
        {t('loginForm.login')}
      </h1>
      <Form.Floating className="mb-3">
        <Form.Control
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder={t('loginForm.username')}
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed}
          ref={inputRef}
        />
        <Form.Label htmlFor="username">{t('loginForm.username')}</Form.Label>
        {formik.touched.username && formik.errors.username && (
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
        )}
      </Form.Floating>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder={t('loginForm.password')}
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="password">
          {t('loginForm.password')}
        </Form.Label>
        {formik.touched.password && formik.errors.password && (
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
        disabled={isLoading}
      >
        {t('loginForm.login')}
      </Button>
    </Form>
  );
};

export default LoginForm;

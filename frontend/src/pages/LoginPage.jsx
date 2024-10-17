import { Button, Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useAuth } from '../store/hooks/hooks';
import loginImage from '../assets/images/login.jpg';
import { setToken, setUsername } from '../store/slices/authSlice';
import { useLoginMutation } from '../api/authApi';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [login] = useLoginMutation();

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
        const { data, error } = await login(values);

        if (data) {
          const { token, username } = data;
          dispatch(setToken(token));
          dispatch(setUsername(username));
          auth.logIn();
          navigate('/');
        }
        if (error && error.status === 401) {
          setFieldError('username', t('errors.invalidData'));
          setAuthFailed(true);
          inputRef.current.select();
        }
      } catch (err) {
        setSubmitting(false);
        setAuthFailed(true);
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={loginImage}
                  className="rounded-circle"
                  alt={t('loginForm.login')}
                />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">
                  {t('loginForm.login')}
                </h1>
                <Form.Group className="form-floating mb-3">
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
                </Form.Group>
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
                    {/* {' '} */}
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
                >
                  {t('loginForm.login')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('loginForm.footerText')}</span>
                {' '}
                <NavLink to="/signup">
                  {' '}
                  {t('loginForm.signUp')}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

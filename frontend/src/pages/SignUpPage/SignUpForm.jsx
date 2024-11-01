import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { object, string, ref } from 'yup';
import { toast } from 'react-toastify';
import { useSignupMutation } from '../../api/authApi';
import { useAuth } from '../../store/hooks/hooks';
import { setUserData } from '../../store/slices/authSlice';
import { ROOT_PATH, getRoutesPath } from '../../router/routesPath';

const SignUpForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const [signup, { isLoading }] = useSignupMutation();

  const SignupSchema = object().shape({
    username: string().min(3, t('errors.minMaxLength')).max(20, t('errors.minMaxLength')).required(t('errors.required')),
    password: string().min(6, t('errors.minLength')).required(t('errors.required')),
    confirmPassword: string().oneOf([ref('password')], t('errors.passwordMatch')).required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const data = await signup(values).unwrap();
        dispatch(setUserData(data));
        auth.logIn();
        navigate(getRoutesPath(ROOT_PATH));
      } catch (err) {
        if (err.status === 409) {
          formik.setErrors({ username: t('errors.userExists') });
          inputRef.current.select();
        } else {
          toast.error(t('toasts.connectionError'));
        }
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">
        {t('signUpForm.signUp')}
      </h1>
      <Form.Floating className="mb-3">
        <Form.Control
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          autoFocus
          required
          placeholder={t('signUpForm.username')}
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.username}
          ref={inputRef}
          isInvalid={formik.touched.username && formik.errors.username}
        />
        <Form.Label htmlFor="username">{t('signUpForm.username')}</Form.Label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder={t('signUpForm.password')}
          className="form-control"
          aria-describedby="passwordHelpBlock"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={formik.touched.password && formik.errors.password}
        />
        <Form.Label htmlFor="password">{t('signUpForm.password')}</Form.Label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Floating>

      <Form.Floating className="mb-4">
        <Form.Control
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          placeholder={t('signUpForm.confirmPassword')}
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          isInvalid={formik.touched.confirmPassword
                      && formik.values.confirmPassword && formik.errors.confirmPassword}
        />
        <Form.Label htmlFor="confirmPassword">{t('signUpForm.confirmPassword')}</Form.Label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Floating>

      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 btn btn-outline-primary"
        disabled={isLoading}
      >
        {t('signUpForm.signUpBtn')}
      </Button>
    </Form>
  );
};

export default SignUpForm;

import { Button, Form } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
// import { toast } from 'react-toastify';
// import * as yup from 'yup';
import { object, string, ref } from 'yup';
import signUpImage from '../assets/images/signUp.jpg';

const SignUpPage = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { t } = useTranslation();

  const SignupSchema = object().shape({
    username: string().min(3, t('errors.minMaxLength')).max(20, t('errors.minMaxLength')).required(t('errors.required')),
    password: string()
      .min(6, t('errors.minLength'))
      .required(t('errors.required')),
    confirmPassword: string()
      .oneOf([ref('password')], t('errors.passwordMatch'))
      .required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      console.log('submit', values);
      // try {
      //   const { data, error } = await signup(values);

      //   if (data) {
      //     auth.logIn();
      //     navigate('/');
      //   }
      //   if (error) {
      //     formik.setSubmitting(false);
      //     if (error.status === 409) {
      //       notify();
      //     }
      //   }
      // } catch (err) {
      //   console.error('Login error', err);
      //   formik.setSubmitting(false);
      // }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={signUpImage}
                  className="rounded-circle"
                  alt={t('signUpForm.signUp')}
                />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">
                  {t('signUpForm.signUp')}
                </h1>
                <Form.Group className="form-floating mb-3">
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
                    isInvalid={formik.touched.username && formik.errors.username}
                  />
                  <Form.Label htmlFor="username">{t('signUpForm.username')}</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
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
                  <Form.Label htmlFor="password">
                    {' '}
                    {t('signUpForm.password')}
                  </Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
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
                  <Form.Label htmlFor="confirmPassword">
                    {' '}
                    {t('signUpForm.confirmPassword')}
                  </Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 btn btn-outline-primary"
                >
                  {t('signUpForm.signUpBtn')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

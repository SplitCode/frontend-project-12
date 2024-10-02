import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import login from '../assets/images/login.jpg';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form is validated! Submitting the form...', values);
      setSubmitting(false);
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6 ">
          <div className="card shadow-sm ">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={login}
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">
                  Войти
                </h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                </Form.Group>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary"
                >
                  Войти
                </button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <NavLink to="/register">Регистрация</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import AuthPageContainer from '../AuthPagesContainer';
import loginImage from '../../../assets/images/login.jpg';
import { SIGNUP_PATH, getRoutesPath } from '../../../router/routesPath';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <AuthPageContainer
      imgSrc={loginImage}
      imgAlt={t('loginForm.login')}
      footer
      footerText={t('loginForm.footerText')}
      footerLink={(
        <NavLink to={getRoutesPath(SIGNUP_PATH)}>
          {t('loginForm.signUp')}
        </NavLink>
)}
    >
      <LoginForm />
    </AuthPageContainer>
  );
};

export default LoginPage;

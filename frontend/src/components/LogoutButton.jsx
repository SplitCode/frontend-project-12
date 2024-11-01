import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../store/hooks/hooks';
import { LOGIN_PATH, getRoutesPath } from '../router/routesPath';

const LogoutButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    auth.loggedIn
      ? (
        <Button onClick={() => {
          auth.logOut();
          navigate(getRoutesPath(LOGIN_PATH));
        }}
        >
          {t('header.logout')}
        </Button>
      )
      : null
  );
};

export default LogoutButton;

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../store/hooks/hooks';

const LogoutButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    auth.loggedIn
      ? (
        <Button onClick={() => {
          auth.logOut();
          navigate('/login');
        }}
        >
          {t('header.logout')}
        </Button>
      )
      : null
  );
};

export default LogoutButton;

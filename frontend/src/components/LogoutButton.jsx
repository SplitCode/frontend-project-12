import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../store/hooks/useAuth';

const LogoutButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    auth.loggedIn
      ? (
        <Button onClick={() => {
          auth.logOut();
          navigate('/login');
        }}
        >
          Выйти
        </Button>
      )
      : null
  );
};

export default LogoutButton;

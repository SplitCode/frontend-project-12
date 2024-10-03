import { Button } from 'react-bootstrap';
import useAuth from '../store/hooks/useAuth';

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выход</Button>
      : null
  );
};

export default AuthButton;

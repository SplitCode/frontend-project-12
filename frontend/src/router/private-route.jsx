import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../store/slices/authSlice';
import { LOGIN_PATH, getRoutesPath } from './routesPath';

const PrivateRoute = ({ element }) => {
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();

  return (
    isAuth ? element : <Navigate to={getRoutesPath(LOGIN_PATH)} state={{ from: location }} />
  );
};

export default PrivateRoute;

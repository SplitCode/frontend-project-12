import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/slices/authSlice';
import { LOGIN_PATH, getRoutesPath } from './routesPath';

const PrivateRoute = ({ element }) => {
  const token = useSelector(selectToken);
  const location = useLocation();

  return (
    token ? element : <Navigate to={getRoutesPath(LOGIN_PATH)} state={{ from: location }} />
  );
};

export default PrivateRoute;

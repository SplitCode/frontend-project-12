import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/slices/authSlice';
import getRoutesPath from '../constants/routesPath';

const PrivateRoute = ({ element }) => {
  const token = useSelector(selectToken);
  const location = useLocation();

  return (
    token ? element : <Navigate to={getRoutesPath('LOGIN')} state={{ from: location }} />
  );
};

export default PrivateRoute;

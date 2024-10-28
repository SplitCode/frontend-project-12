import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/slices/authSlice';

const PrivateRoute = ({ element }) => {
  const token = useSelector(selectToken);
  const location = useLocation();

  return (
    token ? element : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;

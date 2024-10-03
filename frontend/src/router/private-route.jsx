import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  return (
    token ? element : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;

import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AnonymousRoute = ({ element }) => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  return token ? <Navigate to="/" state={{ from: location }} /> : element;
};

export default AnonymousRoute;

import { createBrowserRouter } from 'react-router-dom';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import App from '../App';
import PrivateRoute from './private-route';
import SignUpPage from '../pages/SignUpPage';
import getRoutesPath from '../constants/routesPath';

const router = createBrowserRouter([
  {
    path: getRoutesPath('ROOT'),
    element: <App />,
    children: [
      {
        index: true,
        element: <PrivateRoute element={<ChatPage />} />,
      },
      {
        path: getRoutesPath('LOGIN'),
        element: <LoginPage />,
      },
      {
        path: getRoutesPath('SIGNUP'),
        element: <SignUpPage />,
      },
      {
        path: getRoutesPath('NOT_FOUND'),
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;

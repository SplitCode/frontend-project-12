import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PrivateRoute from './private-route';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
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

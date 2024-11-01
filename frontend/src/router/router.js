import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PrivateRoute from './private-route';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import {
  ROOT_PATH, LOGIN_PATH, SIGNUP_PATH, NOT_FOUND_PATH, getRoutesPath,
} from './routesPath';

const router = createBrowserRouter([
  {
    path: getRoutesPath(ROOT_PATH),
    element: <App />,
    children: [
      {
        index: true,
        element: <PrivateRoute element={<ChatPage />} />,
      },
      {
        path: getRoutesPath(LOGIN_PATH),
        element: <LoginPage />,
      },
      {
        path: getRoutesPath(SIGNUP_PATH),
        element: <SignUpPage />,
      },
      {
        path: getRoutesPath(NOT_FOUND_PATH),
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import App from '../App';
import PrivateRoute from './private-route';
import SignUpPage from '../pages/SignUpPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <PrivateRoute element={<ChatPage />} />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;

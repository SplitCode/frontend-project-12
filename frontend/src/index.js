import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import { SocketProvider } from './contexts/SocketContext';
import router from './router/router';
import store from './store/store';
import init from './init';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'testenv',
  // environment: 'production',
};

const root = ReactDOM.createRoot(document.getElementById('root'));

init().then(({ socket }) => {
  root.render(
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <ReduxProvider store={store}>
            <SocketProvider socket={socket}>
              <RouterProvider router={router} />
            </SocketProvider>
          </ReduxProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>,
  );
});

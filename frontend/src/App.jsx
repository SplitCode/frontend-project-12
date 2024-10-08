import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import socket from './socket';

const App = () => {
  useEffect(() => {
    socket.on('newMessage', (payload) => {
      console.log('connected');
      console.log(payload);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  return (
    <>
      <ToastContainer
        autoClose={2000}
        draggable
      />
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>
    </>
  );
};

export default App;

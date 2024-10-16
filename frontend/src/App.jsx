import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import { useSocket } from './contexts/SocketContext';

const App = () => {
  const socket = useSocket();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      console.log('connected');
      console.log(payload);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket]);

  return (
    <>
      <ToastContainer
        autoClose={2000}
        draggable
      />
      <AuthProvider>
        <div className="d-flex flex-column h-100">
          <Header />
          <Outlet />
        </div>
      </AuthProvider>
    </>
  );
};

export default App;

import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';

const App = () => (
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

export default App;

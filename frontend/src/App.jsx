import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';

const App = () => (
  <AuthProvider>
    <Header />
    <Outlet />
  </AuthProvider>
);

export default App;

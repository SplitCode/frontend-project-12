import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

// const AuthProvider = ({ children }) => {
//   const [loggedIn, setLoggedIn] = useState(false);

//   const logIn = () => setLoggedIn(true);
//   const logOut = () => {
//     localStorage.removeItem('userId');
//     setLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

const App = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default App;

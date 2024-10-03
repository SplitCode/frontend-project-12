import { createContext, useState, useMemo } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('chat-token'));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('chat-token');
    setLoggedIn(false);
  };

  const authContextValue = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

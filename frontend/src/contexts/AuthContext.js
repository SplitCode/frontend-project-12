import { createContext, useState, useMemo } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('chat-token'));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  const context = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

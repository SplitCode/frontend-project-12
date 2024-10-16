import { createContext } from 'react';

const SocketContext = createContext(null);

const SocketProvider = ({ socket, children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export { SocketProvider, SocketContext };

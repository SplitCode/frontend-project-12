import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

const socket = io(SOCKET_URL);

socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
});

export default socket;

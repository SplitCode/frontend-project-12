import { channelsApi } from '../../api/channelsApi';
import { messagesApi } from '../../api/messagesApi';

const socketMiddleware = (socket) => (store) => {
  socket.on('newChannel', () => {
    store.dispatch(channelsApi.util.invalidateTags([{ type: 'Channels', id: 'LIST' }]));
  });

  socket.on('removeChannel', () => {
    store.dispatch(channelsApi.util.invalidateTags([{ type: 'Channels', id: 'LIST' }]));
  });

  socket.on('renameChannel', ({ id }) => {
    store.dispatch(channelsApi.util.invalidateTags([{ type: 'Channels', id }]));
  });

  socket.on('newMessage', () => {
    store.dispatch(messagesApi.util.invalidateTags([{ type: 'Messages', id: 'LIST' }]));
  });

  return (next) => (action) => next(action);
};

export default socketMiddleware;

import { channelsApi } from '../../api/channelsApi';
import { messagesApi } from '../../api/messagesApi';

const socketMiddleware = (socket) => (store) => {
  socket.on('newChannel', (newChannel) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      draft.push(newChannel);
    }));
  });

  socket.on('removeChannel', () => {
    store.dispatch(channelsApi.util.invalidateTags([{ type: 'Channels', id: 'LIST' }]));
  });

  socket.on('renameChannel', ({ id }) => {
    store.dispatch(channelsApi.util.invalidateTags([{ type: 'Channels', id }]));
  });

  socket.on('newMessage', (message) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
      draft.push(message);
    }));
  });

  return (next) => (action) => next(action);
};

export default socketMiddleware;

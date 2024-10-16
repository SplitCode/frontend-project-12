import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import io from 'socket.io-client';
import resources from './locales';

const SOCKET_URL = 'http://localhost:3000';

const init = async () => {
  const i18nInstance = i18n.createInstance();
  await i18nInstance.use(initReactI18next).init({
    lng: 'ru',
    resources,
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });

  const socket = io(SOCKET_URL);

  socket.on('connect', () => {
    console.log('Connected to socket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });

  return { i18nInstance, socket };
};

export default init;

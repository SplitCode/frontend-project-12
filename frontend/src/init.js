import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import io from 'socket.io-client';
import filter from 'leo-profanity';
import resources from './locales';

const init = async () => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };

  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  const i18nInstance = i18n.createInstance();
  await i18nInstance.use(initReactI18next).init({
    lng: 'ru',
    resources,
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

  const socket = io();

  return { i18nInstance, socket, rollbarConfig };
};

export default init;

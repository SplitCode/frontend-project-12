import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
import resources from './locales/ru.js';
// import io from 'socket.io-client';

export default async () => {
  const defaultLanguage = 'ru';

  const i18nInstance = i18n.createInstance();
  await i18nInstance.init({
    lng: defaultLanguage,
    resources,
  });
};

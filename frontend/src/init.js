import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';
// import io from 'socket.io-client';

const init = async () => {
  const defaultLanguage = 'ru';

  const i18nInstance = i18n.createInstance();
  await i18nInstance.use(initReactI18next).init({
    lng: defaultLanguage,
    resources,
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });
};

export default init;

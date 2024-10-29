import PATHS from './paths';

export const API_PREFIX = 'api';
export const API_VERSION = 'v1';
export const BASE_API_PATH = `/${API_PREFIX}/${API_VERSION}`;

export const API_PATHS = {
  LOGIN: () => PATHS.LOGIN_PATH,
  SIGNUP: () => PATHS.SIGNUP_PATH,
  CHANNELS: () => `${BASE_API_PATH}${PATHS.CHANNELS_PATH}`,
  MESSAGES: () => `${BASE_API_PATH}${PATHS.MESSAGES_PATH}`,
  BASE: () => BASE_API_PATH,
};

const getApiPath = (path) => API_PATHS[path]();

export default getApiPath;

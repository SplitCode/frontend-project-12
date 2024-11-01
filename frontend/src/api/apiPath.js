const API_V1 = 'api/v1';

export const LOGIN_PATH = 'LOGIN';
export const SIGNUP_PATH = 'SIGNUP';
export const CHANNELS_PATH = 'CHANNELS';
export const MESSAGES_PATH = 'MESSAGES';
export const BASE_PATH = 'BASE';

const API_PATHS = {
  [LOGIN_PATH]: `${API_V1}/login`,
  [SIGNUP_PATH]: `${API_V1}/signup`,
  [CHANNELS_PATH]: `${API_V1}/channels`,
  [MESSAGES_PATH]: `${API_V1}/messages`,
  [BASE_PATH]: '.',
  EMPTY_PATH: '',
};

export const getApiPath = (path) => API_PATHS[path] || API_PATHS.EMPTY_PATH;

import PATHS from './paths';

const API_V1 = 'api/v1';

export const API_PATHS = {
  LOGIN: PATHS.LOGIN_PATH,
  SIGNUP: PATHS.SIGNUP_PATH,
  CHANNELS: `${API_V1}${PATHS.CHANNELS_PATH}`,
  MESSAGES: `${API_V1}${PATHS.MESSAGES_PATH}`,
  BASE: API_V1,
};

const getApiPath = (path) => API_PATHS[path] || '';

export default getApiPath;

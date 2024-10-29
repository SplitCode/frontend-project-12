export const API_PREFIX = 'api';
export const API_VERSION = 'v1';
export const BASE_API_PATH = `/${API_PREFIX}/${API_VERSION}`;

export const PATHS = {
  BASE: () => BASE_API_PATH,
  LOGIN: () => '/login',
  SIGNUP: () => '/signup',
  CHANNELS: () => '/channels',
  MESSAGES: () => '/messages',
  NOT_FOUND: () => '*',
};

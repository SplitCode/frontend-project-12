export const LOGIN_PATH = 'LOGIN';
export const SIGNUP_PATH = 'SIGNUP';
export const ROOT_PATH = 'ROOT';
export const NOT_FOUND_PATH = 'NOT_FOUND';

const ROUTES_PATHS = {
  [LOGIN_PATH]: '/login',
  [SIGNUP_PATH]: '/signup',
  [ROOT_PATH]: '/',
  [NOT_FOUND_PATH]: '*',
  EMPTY_PATH: '',
};

export const getRoutesPath = (path) => ROUTES_PATHS[path] || ROUTES_PATHS.EMPTY_PATH;

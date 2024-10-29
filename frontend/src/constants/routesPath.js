import PATHS from './paths';

export const ROUTES_PATHS = {
  LOGIN: () => PATHS.LOGIN_PATH,
  SIGNUP: () => PATHS.SIGNUP_PATH,
  ROOT: () => PATHS.ROOT_PATH,
  NOT_FOUND: () => PATHS.PATH_404,
};

const getRoutesPath = (path) => ROUTES_PATHS[path]();

export default getRoutesPath;

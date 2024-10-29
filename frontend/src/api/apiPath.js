import { PATHS } from '../constants/paths';

export const getApiPath = (path) => PATHS[path]();

export default getApiPath;

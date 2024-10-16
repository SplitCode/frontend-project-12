const apiPath = '/api/v1';

export default {
  default: () => apiPath,
  login: () => [apiPath, 'login'].join('/'),
  signup: () => [apiPath, 'signup'.join('/')],
  channels: () => [apiPath, 'channels'].join('/'),
  messages: () => [apiPath, 'messages'].join('/'),
};

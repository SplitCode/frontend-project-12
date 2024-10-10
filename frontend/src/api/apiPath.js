const apiPath = '/api/v1';

export default {
  default: () => [apiPath],
  login: () => [apiPath, 'login'].join('/'),
  channels: () => [apiPath, 'channels'].join('/'),
  messages: () => [apiPath, 'messages'].join('/'),
};

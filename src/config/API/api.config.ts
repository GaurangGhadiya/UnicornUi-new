import API_DEV from './api-dev';
import API_PROD from './api-prod';

const hostname = window.location.hostname;
const port = Number(window.location.port);
const isLocalApi = port >= 3000;

export const API =
  hostname === 'localhost' && isLocalApi
    ? API_PROD
    : hostname === 'localhost'
    ? API_DEV
    : API_PROD;

// export const API = API_LOCAL

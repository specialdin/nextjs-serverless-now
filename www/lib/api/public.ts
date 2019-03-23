import sendRequest from './sendRequest';

const BASE_PATH = '/api';

export const helloRequest = () => sendRequest(`${BASE_PATH}/hello`, { method: 'GET' });

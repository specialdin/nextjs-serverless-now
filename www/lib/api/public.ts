import sendRequest from './sendRequest';

const BASE_PATH = '/api';

export const helloRequest = (req) => sendRequest(req, `${BASE_PATH}/hello`, { method: 'GET' });

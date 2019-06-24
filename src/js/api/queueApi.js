import Http from './Http';

const app = 'westworld';

const http = Http('https://queue.kassellabs.io/api');

export const requestDownload = (code, emails) => http.post('/request', {
  code,
  emails,
  app,
});

export const fetchStatus = code => http.get(`/status/${app}/${code}`);

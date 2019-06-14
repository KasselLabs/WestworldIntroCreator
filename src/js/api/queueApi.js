import Http from './Http';
import { queueApiUrl } from './config';

const app = 'westworld';

const http = Http(`${queueApiUrl}/api`);

export const fetchStatus = code => Promise.resolve({ data: { status: 'not_queued', queueSize: 20 } });// http.get(`/status/${app}/${code}`);

export const requestDownload = (code, emails) => http.post('/request', {
  code,
  emails,
  app,
});

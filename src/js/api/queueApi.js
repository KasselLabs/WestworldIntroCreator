import Http from './Http';

const APP = 'westworld';

export const requestDownload = (code, emails) => {
  const http = Http('https://queue.kassellabs.io/api');

  return http.post('/request', {
    code,
    emails,
    app: APP,
  });
};

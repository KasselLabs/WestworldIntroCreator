import Http from './Http';
import { queueApiUrl } from './config';

const app = 'westworld';

const http = Http(`${queueApiUrl}/api`);

const State = {
  status: null,
  email: null,
};

const _saveStatusFromResponse = (response) => {
  const status = response.data;
  State.status = status;
  return status;
};

const _getRequestStatus = code => http.get(`/status/${app}/${code}`);

const _postDownloadRequest = (code, emails) => http.post('/request', {
  code,
  emails,
  app,
});

export const fetchStatus = async code =>
  _saveStatusFromResponse(await _getRequestStatus(code));

export const requestDownload = async (code, email) => {
  State.email = email;
  return _saveStatusFromResponse(await _postDownloadRequest(code, email));
};

export const getLastStatus = (code) => {
  if (State.status) {
    return State.status;
  }

  return fetchStatus(code);
};

export const getLastEmail = () => State.email;

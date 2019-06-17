import Http from './Http';
import { queueApiUrl } from './config';

const app = 'westworld';

const http = Http(`${queueApiUrl}/api`);

const statusState = {
  state: null,
};

const _saveStatusFromResponse = (response) => {
  const status = response.data;
  statusState.state = status;
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

export const requestDownload = async (code, emails) =>
  _saveStatusFromResponse(await _postDownloadRequest(code, emails));


export const getLastStatus = (code) => {
  if (statusState.state) {
    return statusState.state;
  }

  return fetchStatus(code);
};


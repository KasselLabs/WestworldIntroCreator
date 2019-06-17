import React, { Component } from 'react';
import Loader from './Loader';
import DownloadPageContainer from './download/DownloadPageContainer';

// eslint-disable-next-line react/prefer-stateless-function
class RequestDownloadPage extends Component {
  render() {
    return (
      <DownloadPageContainer title="REQUEST DOWNLOAD">
        <Loader />
      </DownloadPageContainer>
    );
  }
}

export default RequestDownloadPage;

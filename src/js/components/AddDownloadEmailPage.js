import React from 'react';

import DownloadPageContainer from './download/DownloadPageContainer';
import EmailRequestField from './download/EmailRequestField';

const AddDownloadEmailPage = () => (
  <DownloadPageContainer title="REQUEST DOWNLOAD">
    <p>
      You can add more emails to receive the video in the form below.
    </p>

    <EmailRequestField buttonLabel="ADD EMAIL" />
  </DownloadPageContainer>
);

export default AddDownloadEmailPage;

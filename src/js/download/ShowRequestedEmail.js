import React, { Fragment } from 'react';
import { getLastEmail } from '../api/queueApi';

const ShowRequestedEmail = () => {
  const email = getLastEmail();
  if (!email) {
    return null;
  }

  return (
    <Fragment>
      <p>The link to download the video will be sent to the email:</p>
      <p className="bold" style={{ textAlign: 'center' }}>{email}</p>
    </Fragment>
  );
};

export default ShowRequestedEmail;

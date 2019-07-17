import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ContactButton from '../common/ContactButton';
import EmailRequestField from './EmailRequestField';

const RenderingOrBumpedStatus = ({ status: { status } }) => {
  const isBumped = 'bumped' === status;
  const initialText = isBumped
    ? 'Your donation has been verified, your video will be rendered soon. You will receive your video by email in a few hours. '
    : 'Your video is being rendered right now! You will receive your video by email in less than two hours. ';

  return (
    <Fragment>
      <p>
        {initialText}
        This page will be updated when the video is ready.
      </p>
      <ContactButton />
      <p>
        If you want, you can add more emails to receive the video in the form below.
      </p>

      <EmailRequestField buttonLabel="ADD EMAIL" />
    </Fragment>
  );
};

RenderingOrBumpedStatus.propTypes = {
  status: PropTypes.object,
};

export default RenderingOrBumpedStatus;

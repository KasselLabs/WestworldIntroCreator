import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ContactButton from '../ContactButton';

const RenderedStatus = ({ status: { downloadUrl } }) => (
  <Fragment>
    <p>
      Your video is ready to download! Click on the button below to download it!
    </p>
    <div className="center-content">
      <a href={downloadUrl} style={{ display: 'inline-block' }} download>
        <button className="button medium">
          DOWNLOAD
        </button>
      </a>
    </div>
    <ContactButton customText="If you have any problem while trying to download the video, please contact us:" />
  </Fragment>
);

RenderedStatus.propTypes = {
  status: PropTypes.object,
};

export default RenderedStatus;

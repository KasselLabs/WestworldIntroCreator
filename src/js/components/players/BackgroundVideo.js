import React from 'react';
import PropTypes from 'prop-types';

import { APPLICATION_MODE, MODES } from '../../api/config';
import EmbeddedVideo from './EmbeddedVideo';
import YoutubePlayer from './YoutubePlayer';

const BackgroundVideo = (props) => {
  if (MODES.LOCAL === APPLICATION_MODE) {
    return (
      <EmbeddedVideo
        {...props}
      />
    );
  }

  return (
    <YoutubePlayer
      {...props}
      ref={props.videoPlayerRef}
    />
  );
};

BackgroundVideo.propTypes = {
  videoPlayerRef: PropTypes.object,
};

export default BackgroundVideo;

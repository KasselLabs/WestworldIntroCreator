import React from 'react';
import PropTypes from 'prop-types';

import { IS_LOCAL_MODE, IS_RENDERER_MODE } from '../../api/config';
import FakeVideo from './FakeVideo';
import EmbeddedVideo from './EmbeddedVideo';
import YoutubePlayer from './YoutubePlayer';

const BackgroundVideo = ({ hasPlayerError, videoPlayerRef, ...props }) => {
  if (IS_RENDERER_MODE) {
    return (
      <FakeVideo
        {...props}
        ref={videoPlayerRef}
      />
    );
  }

  if (IS_LOCAL_MODE || hasPlayerError) {
    return (
      <EmbeddedVideo
        {...props}
        ref={videoPlayerRef}
        hasPlayerError={!!hasPlayerError}
      />
    );
  }

  return (
    <YoutubePlayer
      {...props}
      ref={videoPlayerRef}
    />
  );
};

BackgroundVideo.propTypes = {
  videoPlayerRef: PropTypes.object,
  hasPlayerError: PropTypes.any,
};

export default BackgroundVideo;

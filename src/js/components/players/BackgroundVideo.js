import React from 'react';
import PropTypes from 'prop-types';

import { IS_LOCAL_MODE, IS_RENDERER_MODE } from '../../api/config';
import FakeVideo from './FakeVideo';
import EmbeddedVideo from './EmbeddedVideo';
import YoutubePlayer from './YoutubePlayer';

const BackgroundVideo = (props) => {
  if (IS_RENDERER_MODE) {
    return (
      <FakeVideo
        {...props}
        ref={props.videoPlayerRef}
      />
    );
  }

  if (IS_LOCAL_MODE) {
    return (
      <EmbeddedVideo
        {...props}
        ref={props.videoPlayerRef}
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

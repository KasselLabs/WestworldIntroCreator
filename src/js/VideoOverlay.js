import React from 'react';
import PropTypes from 'prop-types';

const VideoOverlay = ({ configurations, play }) => {
  const classnames = `video-overlay ${play ? 'animate' : ''}`;

  return (
    <div
      className={classnames}
      style={configurations.overlay}
    >
      <div
        className="video-overlay__content"
        style={configurations.overlay_content}
      >
        <div
          id="text0"
          style={configurations.texts[0]}
        >EVAN RACHEL WOOD
        </div>
        <div
          id="text1"
          style={configurations.texts[1]}
        >THANDIE NEWTOW
        </div>
        <div
          id="text2"
          style={configurations.texts[2]}
        >JEFFREY WRIGHT
        </div>
      </div>
    </div>
  );
};

VideoOverlay.propTypes = {
  configurations: PropTypes.object,
  play: PropTypes.bool,
};

export default VideoOverlay;

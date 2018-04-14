import React from 'react';
import PropTypes from 'prop-types';

const VideoOverlay = ({ configurations }) => (
  <div
    className="video-overlay"
    style={configurations.overlay}
  >
    <div
      className="video-overlay__content"
      style={configurations.overlay_content}
    >
      <div
        style={configurations.text[0]}
      >EVAN RACHEL WOOD
      </div>
      <div
        style={configurations.text[1]}
      >THANDIE NEWTOW
      </div>
      <div
        style={configurations.text[2]}
      >JEFFREY WRIGHT
      </div>
    </div>
  </div>
);

VideoOverlay.propTypes = {
  configurations: PropTypes.object,
};

export default VideoOverlay;

import React from 'react';

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
        className="red-box"
        style={configurations.text[0]}
      >EVAN RACHEL WOOD
      </div>
      <div
        className="red-box"
        style={configurations.text[1]}
      >THANDIE NEWTOW
      </div>
      <div
        className="red-box"
        style={configurations.text[2]}
      >JEFFREY WRIGHT
      </div>
      <div className="blue-box">BLUE BOX</div>
    </div>
  </div>
);

export default VideoOverlay;

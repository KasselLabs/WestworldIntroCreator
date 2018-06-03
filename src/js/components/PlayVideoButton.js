import React from 'react';
import PropTypes from 'prop-types';

const PlayVideoButton = ({ onClick }) => (
  <div className="play-video-button">
    <button onClick={onClick}>Play</button>
  </div>
);

PlayVideoButton.propTypes = {
  onClick: PropTypes.func,
};

export default PlayVideoButton;

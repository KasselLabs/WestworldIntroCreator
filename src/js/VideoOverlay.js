import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { season1 } from '../json/defaultTexts.json';

class VideoOverlay extends Component {
  static propTypes = {
    configurations: PropTypes.object,
    play: PropTypes.bool,
  };

  _renderTexts() {
    const { configurations } = this.props;
    const texts = [];
    for (let i = 0; i < 34; i += 1) {
      const key = `text${i}`;
      texts.push((
        <div key={key} id={key} style={configurations.texts[i]}>{ season1[i] }</div>
      ));
    }
    return texts;
  }

  render() {
    const { configurations, play } = this.props;
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
          {this._renderTexts()}
        </div>
      </div>
    );
  }
}

export default VideoOverlay;

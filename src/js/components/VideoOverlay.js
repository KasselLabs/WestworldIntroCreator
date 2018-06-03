import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OpeningProvider from './OpeningProvider';
import connectContext from './connectContext';

class VideoOverlay extends Component {
  static propTypes = {
    configurations: PropTypes.object,
    opening: PropTypes.object,
    playing: PropTypes.bool,
  };

  _renderTexts() {
    const { configurations, opening } = this.props;
    const textsDiv = [];
    for (let i = 0; i < 34; i += 1) {
      const key = `text${i}`;
      textsDiv.push((
        <div key={key} id={key} style={configurations.texts[i]}>{ opening.texts[`text${i}`] }</div>
      ));
    }
    return textsDiv;
  }

  render() {
    const { configurations, playing } = this.props;
    const classnames = `video-overlay ${playing ? 'animate' : ''}`;

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

const mapContextToProps = context => ({
  opening: context.opening,
});


export default connectContext(OpeningProvider, mapContextToProps)(VideoOverlay);

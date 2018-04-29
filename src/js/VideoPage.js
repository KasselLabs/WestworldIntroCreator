import React from 'react';
import PropTypes from 'prop-types';

import VideoContainer from './VideoContainer';

export default class VideoPage extends React.Component {
  static propTypes = {
    configurations: PropTypes.object,
  };

  static defaultProps = {
    configurations: {
      texts: [],
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isFullscreenEnabled: false,
    };
  }

  _setFullscreen = () => {
    this.setState({ isFullscreenEnabled: true });
  }

  handleChangeFullscreen = (isFullscreenEnabled) => {
    this.setState({ isFullscreenEnabled });
  }

  render() {
    const { configurations } = this.props;

    return (
      <div id="videoPage">
        <VideoContainer
          fullscreen={this.state.isFullscreenEnabled}
          onChangeFullscreen={this.handleChangeFullscreen}
          configurations={configurations}
        />
        <div className="buttons-container">
          <button onClick={this._setFullscreen}>
            Go Fullscreen
          </button>
        </div>
      </div>
    );
  }
}

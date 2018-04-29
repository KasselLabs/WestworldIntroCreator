import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import Fullscreen from 'react-fullscreen-crossbrowser';

import VideoOverlay from './VideoOverlay';
import renderApp from './renderApp';


class VideoContainer extends Component {
  static propTypes = {
    fullscreen: PropTypes.bool,
    onChangeFullscreen: PropTypes.func,
    configurations: PropTypes.object,
  }

  static defaultProps = {
    fullscreen: false,
  }

  constructor() {
    super();

    this.state = {
      play: false,
    };
  }

  componentDidMount() {
    if (!this.props.configurations.overlay) {
      renderApp();
    }
  }

  _onPlay = () => {
    this.setState({
      play: true,
    });
  }

  render() {
    const opts = {
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        controls: 0,
        enablejsapi: 1,
        fs: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
    };

    const { configurations } = this.props;
    const { play } = this.state;

    return (
      <div className="video-container">
        <Fullscreen
          enabled={this.props.fullscreen}
          onChange={this.props.onChangeFullscreen}
        >
          <YouTube
            className="youtube-player"
            videoId="XQhl3Hgu_TU"
            // videoId="elkHuRROPfk"
            onPlay={this._onPlay}
            opts={opts}
          />
          <VideoOverlay configurations={configurations} play={play} />
        </Fullscreen>
      </div>
    );
  }
}

export default VideoContainer;

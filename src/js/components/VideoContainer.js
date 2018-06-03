import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import Fullscreen from 'react-fullscreen-crossbrowser';

import VideoOverlay from './VideoOverlay';
import renderApp from './renderApp';
import OpeningProvider from './OpeningProvider';
import connectContext from './connectContext';
import ConfigurationsContext from './ConfigurationsContext';

class VideoContainer extends Component {
  static propTypes = {
    fullscreen: PropTypes.bool,
    onChangeFullscreen: PropTypes.func,
    configurations: PropTypes.object,
    opening: PropTypes.object,
  }

  static defaultProps = {
    fullscreen: false,
    configurations: {
      texts: [],
    },
  }

  constructor() {
    super();

    this.state = {
      play: false,
    };

    this.youtubePlayer = React.createRef();
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

    // this.youtubePlayer.current.internalPlayer.setPlaybackRate(0.25);
  }

  render() {
    const opts = {
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 0,
        controls: 0,
        enablejsapi: 1,
        fs: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
    };

    const { configurations, opening } = this.props;
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
            ref={this.youtubePlayer}
          />

          {!!opening &&
            <VideoOverlay
              configurations={configurations}
              play={play}
            />
          }
        </Fullscreen>
      </div>
    );
  }
}

const mapConfigurationsToProps = context => ({
  configurations: context,
});

const mapOpeningProviderToProps = context => ({
  opening: context.opening,
});


const connectConfigurations = connectContext(ConfigurationsContext, mapConfigurationsToProps);
const connectOpeningProvider = connectContext(OpeningProvider, mapOpeningProviderToProps);

export default connectConfigurations(connectOpeningProvider(VideoContainer));

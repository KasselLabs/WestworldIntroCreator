import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import Fullscreen from 'react-fullscreen-crossbrowser';

import VideoOverlay from './VideoOverlay';
import renderApp from './renderApp';
import OpeningProvider from './OpeningProvider';
import connectContext from './connectContext';
import LoadingLayer from './LoadingLayer';
import ConfigurationsContext from './ConfigurationsContext';
// import PlayVideoButton from './PlayVideoButton';

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
      videoPlaying: false,
      // startPlay: false,
    };

    this.youtubePlayer = React.createRef();
  }

  componentDidMount() {
    if (!this.props.configurations.overlay) {
      renderApp();
    }
  }

  _onStartPlay = () => {
    this.setState({
      videoPlaying: true,
    });

    // this.youtubePlayer.current.internalPlayer.setPlaybackRate(0.25);
  }

  _handleClickPlay = () => {
    this.youtubePlayer.current.internalPlayer.playVideo();
    this.setState({
      startPlay: true,
    });
  };

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

    const { configurations, opening } = this.props;
    const {
      videoPlaying,
      // startPlay,
    } = this.state;

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
            onPlay={this._onStartPlay}
            opts={opts}
            ref={this.youtubePlayer}
          />

          {!!opening &&
            <VideoOverlay
              configurations={configurations}
              playing={videoPlaying}
            />
          }
          {/* <LoadingLayer isLoading={!opening} /> */}
          <LoadingLayer isLoading={!videoPlaying} />
          {/* {!!opening && !startPlay &&
            <PlayVideoButton onClick={this._handleClickPlay} />
          } */}
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

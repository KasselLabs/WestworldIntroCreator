import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Fullscreen from 'react-fullscreen-crossbrowser';
import connectContext from 'react-context-connector';
import fscreen from 'fscreen';

import VideoOverlay from './VideoOverlay';
import renderApp from '../renderApp';
import OpeningProvider from '../common/OpeningProvider';
import LoadingLayer from '../common/LoadingLayer';
import AnimationConfigContext from '../common/AnimationConfigContext';
import PlayVideoButton from './PlayVideoButton';
import BackgroundVideo from '../players/BackgroundVideo';
import { BUFFERING, PAUSED } from '../players/constants';

import { ANIMATION_START_DELAY, IS_DEFAULT_MODE } from '../api/config';

class VideoContainer extends Component {
  static propTypes = {
    fullscreen: PropTypes.bool,
    onChangeFullscreen: PropTypes.func,
    configurations: PropTypes.object,
    opening: PropTypes.object,
    onVideoEnd: PropTypes.func,
    playAgain: PropTypes.bool,
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
      videoReady: false,
      openingLoaded: false,
      videoPlaying: false,
      videoStarted: false,
      videoEnded: false,
      videoError: null,
      showPlayButton: false,
    };

    this.videoPlayer = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { openingLoaded } = prevState;
    const { opening, playAgain } = nextProps;

    if (!openingLoaded && opening) {
      const nextState = {
        openingLoaded: true,
      };
      return nextState;
    }

    if (playAgain) {
      const nextState = {
        videoEnded: false,
      };
      return nextState;
    }

    return null;
  }

  componentDidMount() {
    if (!this.props.configurations.overlay) {
      renderApp();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      videoStarted,
      videoReady,
      openingLoaded,
    } = this.state;

    const wasVideoReady = prevState.videoReady && prevState.openingLoaded;
    const isVideoReady = videoReady && openingLoaded;
    const isNowVideoReady = !wasVideoReady && isVideoReady;

    const { playAgain } = this.props;

    // Start video if wasn't ready before and is ready to play now
    // or if the user hit play again.
    if ((!videoStarted && (isNowVideoReady || playAgain))) {
      this.videoPlayer.current.play();
    }
  }

  onVideoStartPlay = () => {
    Raven.captureBreadcrumb({
      message: 'Video start play',
      category: 'videoPlayer',
    });
    setTimeout(() => {
      this.setState({
        videoPlaying: true,
        videoStarted: true,
        showPlayButton: false,
      });
    }, ANIMATION_START_DELAY);
  }

  onVideoStateChange = (event) => {
    Raven.captureBreadcrumb({
      message: 'Video state change',
      category: 'videoPlayer',
      data: { event },
    });

    const {
      videoReady,
      videoStarted,
      openingLoaded,
    } = this.state;

    const { playAgain } = this.props;

    const isBuffering = BUFFERING === event;
    const isPaused = PAUSED === event;
    const isVideoReadyToPlay = videoReady && openingLoaded;

    if (isBuffering || isPaused) {
      this.setState({
        videoPlaying: false,
      });
    }

    // If autoplay fail should show the play button
    // for the user interact with the page and play the video
    if (isVideoReadyToPlay && !videoStarted && !isBuffering && !playAgain) {
      this.setState({
        showPlayButton: true,
      });
    }

    // prevent Play button to show when still buffering the video.
    if (isBuffering) {
      this.setState({
        showPlayButton: false,
      });
    }
  }

  onVideoReady = () => {
    Raven.captureBreadcrumb({
      message: 'Video ready',
      category: 'videoPlayer',
    });
    this.setState({
      videoReady: true,
    });
  }

  onVideoEnd = () => {
    Raven.captureBreadcrumb({
      message: 'Video ended',
      category: 'videoPlayer',
    });
    this.props.onVideoEnd();
    this.setState({
      videoPlaying: false,
      videoStarted: false,
      videoEnded: true,
    });
  }

  onVideoPause = () => {
    Raven.captureBreadcrumb({
      message: 'Video paused',
      category: 'videoPlayer',
    });
  }

  onVideoError = (event) => {
    Raven.captureBreadcrumb({
      message: 'Video error',
      category: 'videoPlayer',
      level: 'error',
      data: {
        data: event.data,
      },
    });

    this.setState({
      videoError: event.data,
      videoReady: false,
    });
  }

  onVideoPlaybackRateChange = (event) => {
    Raven.captureBreadcrumb({
      message: 'Video playback rate change',
      category: 'videoPlayer',
      data: {
        data: event.data,
      },
    });
  }

  onVideoPlaybackQualityChange = (event) => {
    Raven.captureBreadcrumb({
      message: 'Video playback quality change',
      category: 'videoPlayer',
      data: {
        data: event.data,
      },
    });
  }

  _handleClickPlay = () => {
    this.videoPlayer.current.play();
  };

  render() {
    const { configurations, opening } = this.props;

    const {
      videoPlaying,
      videoReady,
      videoStarted,
      openingLoaded,
      videoEnded,
      videoError,
      showPlayButton,
    } = this.state;

    const isLoading = IS_DEFAULT_MODE
                        && !videoEnded
                        && (!openingLoaded || !videoReady || !videoStarted);

    return (
      <Fragment>
        <div className="video-container">
          <Fullscreen
            enabled={fscreen.fullscreenEnabled && this.props.fullscreen}
            onChange={this.props.onChangeFullscreen}
          >

            <BackgroundVideo
              onPlay={this.onVideoStartPlay}
              onReady={this.onVideoReady}
              onEnd={this.onVideoEnd}
              onStateChange={this.onVideoStateChange}
              onPause={this.onVideoPause}
              onError={this.onVideoError}
              onPlaybackRateChange={this.onVideoPlaybackRateChange}
              onPlaybackQualityChange={this.onVideoPlaybackQualityChange}
              videoPlayerRef={this.videoPlayer}
              hasPlayerError={videoError}
            />

            {!!opening &&
              <VideoOverlay
                configurations={configurations}
                playing={videoPlaying}
                playStart={videoStarted}
              />
            }
          </Fullscreen>
        </div>

        {showPlayButton &&
          <PlayVideoButton onClick={this._handleClickPlay} />
        }
        <LoadingLayer isLoading={!showPlayButton && isLoading} />
      </Fragment>
    );
  }
}

const mapConfigurationsToProps = context => ({
  configurations: context,
});

const mapOpeningProviderToProps = context => ({
  opening: context.opening,
});


const connectConfigurations = connectContext(AnimationConfigContext, mapConfigurationsToProps);
const connectOpeningProvider = connectContext(OpeningProvider, mapOpeningProviderToProps);

export default connectConfigurations(connectOpeningProvider(VideoContainer));

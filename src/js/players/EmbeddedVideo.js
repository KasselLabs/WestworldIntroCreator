/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clappr from 'clappr';

import { TIME_FACTOR, START_AT, IS_DEFAULT_MODE } from '../api/config';
import { BUFFERING, PAUSED } from './constants';

// import videoSource from '../../../../../RecorderAssets/westworld-1080p.mp4';

const videoSource = 'https://kassellabs.us-east-1.linodeobjects.com/renderer-assets/westworld/westworld-1080p.mp4';

class EmbeddedVideo extends Component {
  static propTypes = {
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onReady: PropTypes.func,
    onEnd: PropTypes.func,
    onStateChange: PropTypes.func,
    hasPlayerError: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.playerRef = React.createRef();
  }

  componentDidMount() {
    this._setupPlayer();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.destroyPlayer();
  }

  _playCallback = () => {
    this.props.onPlay();
    this._removeMediaControls();
    if (window.introStartCallback) {
      window.introStartCallback();
    }
  }

  _endCallback = () => {
    this.props.onEnd();
    if (window.introEndedCallback) {
      window.introEndedCallback();
    }
  }

  _removeMediaControls = () => {
    // this.player.core.$el.find('.media-control').remove();
    this.player.core.activeContainer.disableMediaControl();
  }

  _setupPlayer() {
    const { onStateChange, onPause } = this.props;

    if (this.player) {
      this.destroyPlayer();
    }

    this.player = new Clappr.Player({
      parent: this.playerRef.current,
      source: videoSource,
      exitFullscreenOnEnd: true,
      width: '100%',
      height: '100%',
      // mute: true,
      hlsjsConfig: {
        enableWorker: true,
      },
      playback: {
        playInline: true,
      },
      autoPlay: this.props.hasPlayerError,
    });

    if (!IS_DEFAULT_MODE) {
      window.playApp = () => {
        this.player.play();
      };
      console.warn('Use window.playApp() to run the video.');
    }

    this.player.once(Clappr.Events.PLAYER_ENDED, this._endCallback);

    this.player.listenTo(
      this.player.core.activeContainer,
      Clappr.Events.CONTAINER_STATE_BUFFERING, () => {
        onStateChange(BUFFERING);
      },
    );

    this.player.core.activePlayback.on(Clappr.Events.PLAYBACK_PAUSE, () => {
      onStateChange(PAUSED);
      onPause();
    });

    this.player.core.activePlayback.on(Clappr.Events.PLAYBACK_PLAY, this._playCallback);

    // set Time factor
    this.player.core.$el.find('video,audio').get(0).playbackRate = 1 / TIME_FACTOR;

    if (START_AT) {
      this.player.seek(START_AT);
    }

    this.props.onReady();
    onStateChange(null);
    this._removeMediaControls();
  }

  play() {
    this.props.onStateChange(null);
    this.player.play();
  }

  destroyPlayer() {
    if (this.player) {
      this.player.destroy();
    }
    this.player = null;
  }

  render() {
    return (
      <div className="embedded-video" ref={this.playerRef} />
    );
  }
}

export default EmbeddedVideo;

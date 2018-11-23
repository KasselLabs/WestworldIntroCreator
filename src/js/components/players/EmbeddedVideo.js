import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clappr from 'clappr';

import { TIME_FACTOR, START_AT } from '../../api/config';

import videoSource from '../../../../../RecorderAssets/westworld-1080p.mp4';

class EmbeddedVideo extends Component {
  static propTypes = {
    onPlay: PropTypes.func,
    onReady: PropTypes.func,
    onEnd: PropTypes.func,
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

  _setupPlayer() {
    if (this.player) {
      this.destroyPlayer();
    }

    this.player = new Clappr.Player({
      parent: this.playerRef.current,
      source: videoSource,
      width: '100%',
      height: '100%',
      // mute: true,
      hlsjsConfig: {
        enableWorker: true,
      },
    });

    window.player = this.player;
    console.warn('Use window.player.play() to run the video.');
    this.player.core.$el.find('.media-control').remove();

    this.player.once(Clappr.Events.PLAYER_PLAY, this._playCallback);

    this.player.once(Clappr.Events.PLAYER_ENDED, this._endCallback);

    // set Time factor
    this.player.core.$el.find('video,audio').get(0).playbackRate = 1 / TIME_FACTOR;

    if (START_AT) {
      this.player.seek(START_AT);
    }
    this.props.onReady();
  }

  play() {
    // just to not call undefined function.
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

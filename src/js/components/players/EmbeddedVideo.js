import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clappr from 'clappr';

import { TIME_FACTOR, START_AT } from '../../api/config';

// import videoSource from '../../../assets/intro.mp4';

const VIDEO_DURATION = 104.587817;

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
    // this._setupPlayer();
    this._setupFakePlayer();
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

  _setupFakePlayer() {
    const fakePlayer = {
      play: () => {
        this._playCallback();
        setTimeout(() => {
          this._endCallback();
        }, (VIDEO_DURATION - START_AT) * TIME_FACTOR * 1000);
      },
    };

    window.player = fakePlayer;

    this.props.onReady();
  }

  _setupPlayer() {
    if (this.player) {
      this.destroyPlayer();
    }

    this.player = new Clappr.Player({
      parent: this.playerRef.current,
      // source: videoSource,
      width: '100%',
      height: '100%',
      mute: true,
      hlsjsConfig: {
        enableWorker: true,
      },
    });

    window.player = this.player;
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

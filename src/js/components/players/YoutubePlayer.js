import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

class YoutubePlayer extends Component {
  constructor() {
    super();

    this.youtubePlayer = React.createRef();
  }

  play = () => {
    this.youtubePlayer.current.internalPlayer.playVideo();
  }

  render() {
    const opts = {
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
    };

    return (
      <YouTube
        className="youtube-player"
        videoId="WxpsxjKxuww"
        opts={opts}
        {...this.props}
        ref={this.youtubePlayer}
      />
    );
  }
}

YoutubePlayer.propTypes = {
};

export default YoutubePlayer;

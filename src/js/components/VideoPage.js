import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import connectContext from 'react-context-connector';

import OpeningProvider from './OpeningProvider';
import VideoContainer from './VideoContainer';
import AfterVideoCard from './AfterVideoCard';

class VideoPage extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    loadOpening: PropTypes.func,
    // eslint-disable-next-line
    openingKey: PropTypes.string,
  };

  state = {
    isFullscreenEnabled: false,
    isLoading: true,
    videoEnded: false,
    playAgain: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { match } = nextProps;
    const { openingKey } = match.params;
    const openingKeyLoaded = nextProps.openingKey;

    if (openingKey === openingKeyLoaded) {
      return {
        ...prevState,
        isLoading: false,
      };
    }

    return prevState;
  }

  componentDidMount() {
    const { match, loadOpening } = this.props;
    const { openingKey } = match.params;

    loadOpening(openingKey);
  }

  _setFullscreen = () => {
    this.setState({ isFullscreenEnabled: true });
  }

  handleChangeFullscreen = (isFullscreenEnabled) => {
    this.setState({ isFullscreenEnabled });
  }

  handleVideoEnd = () => {
    this.setState({ isFullscreenEnabled: false, videoEnded: true, playAgain: false });
  }

  _playAgain = () => {
    this.setState({ playAgain: true, videoEnded: false });
  }

  render() {
    const { videoEnded } = this.state;
    return (
      <div id="videoPage">
        <VideoContainer
          fullscreen={this.state.isFullscreenEnabled}
          onChangeFullscreen={this.handleChangeFullscreen}
          onVideoEnd={this.handleVideoEnd}
          playAgain={this.state.playAgain}
        />
        { videoEnded &&
          <AfterVideoCard />
        }
        <div className="buttons-container">
          {!videoEnded &&
            <button onClick={this._setFullscreen} className="button">
              GO FULLSCREEN
            </button>
          }
          {videoEnded &&
            <Fragment>
              <button onClick={this._playAgain} className="button">
                PLAY AGAIN
              </button>
            </Fragment>
          }
        </div>
      </div>
    );
  }
}

const mapOpeningProviderToProps = context => ({
  loadOpening: context.loadOpening,
  openingKey: context.key,
});

const connectOpeningProvider = connectContext(OpeningProvider, mapOpeningProviderToProps);

export default withRouter(connectOpeningProvider(VideoPage));

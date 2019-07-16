import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import connectContext from 'react-context-connector';
import fscreen from 'fscreen';

import OpeningProvider from '../common/OpeningProvider';
import VideoContainer from '../video/VideoContainer';
import AfterVideoCard from '../video/AfterVideoCard';
import ButtonLink from '../common/ButtonLink';

import { IS_DEFAULT_MODE } from '../api/config';

class VideoPage extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    loadOpening: PropTypes.func,
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
    const { match } = this.props;
    const { openingKey } = match.params;

    const { videoEnded } = this.state;
    return (
      <div id="videoPage">
        <VideoContainer
          fullscreen={this.state.isFullscreenEnabled}
          onChangeFullscreen={this.handleChangeFullscreen}
          onVideoEnd={this.handleVideoEnd}
          playAgain={this.state.playAgain}
        />
        {IS_DEFAULT_MODE && (
          <Fragment>
            { videoEnded &&
              <AfterVideoCard />
            }
            <div className="buttons-container">
              {fscreen.fullscreenEnabled && !videoEnded &&
              <Fragment>
                <ButtonLink to={`/${openingKey}/download`} className="button">DOWNLOAD</ButtonLink>
                <button onClick={this._setFullscreen} className="button">
                GO FULLSCREEN
                </button>
              </Fragment>
              }
              {videoEnded &&
              <button onClick={this._playAgain} className="button">
                PLAY AGAIN
              </button>
            }
            </div>
          </Fragment>
         )}
      </div>
    );
  }
}

const mapOpeningProviderToProps = context => ({
  loadOpening: context.loadOpening,
});

const connectOpeningProvider = connectContext(OpeningProvider, mapOpeningProviderToProps);

export default withRouter(connectOpeningProvider(VideoPage));

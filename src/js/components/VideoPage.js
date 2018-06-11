import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import OpeningProvider from './OpeningProvider';
import VideoContainer from './VideoContainer';
import connectContext from './connectContext';

class VideoPage extends React.Component {
  static propTypes = {
    // history: PropTypes.object,
    match: PropTypes.object,
    loadOpening: PropTypes.func,
    // eslint-disable-next-line
    openingKey: PropTypes.string,
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

  state = {
    isFullscreenEnabled: false,
    isLoading: true,
  };

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

  render() {
    return (
      <div id="videoPage">
        <VideoContainer
          fullscreen={this.state.isFullscreenEnabled}
          onChangeFullscreen={this.handleChangeFullscreen}
        />
        <div className="buttons-container">
          <button onClick={this._setFullscreen} className="button">
            GO FULLSCREEN
          </button>
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

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import OpeningProvider from './OpeningProvider';
import VideoContainer from './VideoContainer';
import ConfigurationsContext from './ConfigurationsContext';
import connectContext from './connectContext';

class VideoPage extends React.Component {
  static propTypes = {
    configurations: PropTypes.object,
    // history: PropTypes.object,
    match: PropTypes.object,
    loadOpening: PropTypes.func,
    // eslint-disable-next-line
    openingKey: PropTypes.string,
  };

  static defaultProps = {
    configurations: {
      texts: [],
    },
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
    const { configurations } = this.props;
    return (
      <div id="videoPage">
        <VideoContainer
          fullscreen={this.state.isFullscreenEnabled}
          onChangeFullscreen={this.handleChangeFullscreen}
          configurations={configurations}
        />
        <div className="buttons-container">
          <button onClick={this._setFullscreen}>
            Go Fullscreen
          </button>
          {this.state.isLoading && <span style={{ color: 'red' }}>LOADING</span>}
          {!this.state.isLoading && <span style={{ color: 'green' }}>LOADED</span>}
        </div>
      </div>
    );
  }
}

const mapConfigurationsToProps = context => ({
  configurations: context,
});

const mapOpeningProviderToProps = context => ({
  loadOpening: context.loadOpening,
  openingKey: context.key,
});

const connectConfigurations = connectContext(ConfigurationsContext, mapConfigurationsToProps);
const connectOpeningProvider = connectContext(OpeningProvider, mapOpeningProviderToProps);

export default withRouter(connectConfigurations(connectOpeningProvider(VideoPage)));

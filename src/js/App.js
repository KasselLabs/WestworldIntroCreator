import React from 'react';
import PropTypes from 'prop-types';

import VideoContainer from './VideoContainer';
import resizeCalc from './resizeCalc';

export default class App extends React.Component {
  static propTypes = {
    configurations: PropTypes.object,
  };

  static defaultProps = {
    configurations: {
      text: [],
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      isFullscreenEnabled: false,
    };
  }

  componentDidMount() {
    if (!this.props.configurations.set) {
      resizeCalc();
    }
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
      <div id="application">
        <VideoContainer
          fullscreen={this.state.isFullscreenEnabled}
          onChangeFullscreen={this.handleChangeFullscreen}
          configurations={configurations}
        />
        <div className="buttons-container">
          <button onClick={this._setFullscreen}>
            Go Fullscreen
          </button>
        </div>
      </div>
    );
  }
}

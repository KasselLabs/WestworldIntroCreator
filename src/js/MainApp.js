import React, { Component } from 'react';
import VideoPage from './VideoPage';
import ConfigurationsContext from './ConfigurationsContext';

class MainApp extends Component {
  render() {
    const ConfigurationsConsumer = ConfigurationsContext.Consumer;
    return (
      <div>
        <ConfigurationsConsumer>
          {configurations => <VideoPage configurations={configurations} />}
        </ConfigurationsConsumer>
      </div>
    );
  }
}

export default MainApp;

import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';

import resizeCalc from './resizeCalc';
import MainApp from './MainApp';
import ConfigurationsContext from './ConfigurationsContext';
import OpeningProvider from './OpeningProvider';

const renderWithConfigurations = (configurations) => {
  const ConfigurationsProvider = ConfigurationsContext.Provider;

  const mountNode = document.getElementById('app');
  ReactDOM.render(
    (
      <ConfigurationsProvider value={configurations}>
        <OpeningProvider>
          <MainApp />
        </OpeningProvider>
      </ConfigurationsProvider>
    ),
    mountNode,
  );
};

const renderApp = throttle(() => {
  const configurations = resizeCalc();
  renderWithConfigurations(configurations);
}, 200);

export default renderApp;

import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';

import resizeCalc from '../extras/resizeCalc';
import Routes from './Routes';
import ConfigurationsContext from './ConfigurationsContext';
import OpeningProvider from './OpeningProvider';

const renderWithConfigurations = (configurations) => {
  const ConfigurationsProvider = ConfigurationsContext.Provider;

  const mountNode = document.getElementById('app');
  ReactDOM.render(
    (
      <ConfigurationsProvider value={configurations}>
        <OpeningProvider>
          <Routes />
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

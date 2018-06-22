import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';

import resizeCalc from '../extras/resizeCalc';
import Routes from './Routes';
import ConfigurationsContext from './ConfigurationsContext';
import OpeningProvider from './OpeningProvider';
import ErrorBoundary from './ErrorBoundary';

const renderWithConfigurations = (configurations) => {
  const ConfigurationsProvider = ConfigurationsContext.Provider;

  const mountNode = document.getElementById('app');
  ReactDOM.render(
    (
      <ErrorBoundary>
        <ConfigurationsProvider value={configurations}>
          <OpeningProvider>
            <Routes />
          </OpeningProvider>
        </ConfigurationsProvider>
      </ErrorBoundary>
    ),
    mountNode,
  );
};

const renderApp = throttle(() => {
  const configurations = resizeCalc();
  renderWithConfigurations(configurations);
}, 200);

export default renderApp;

import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';

import resizeCalc from './extras/resizeCalc';
import Routes from './Routes';
import ConfigurationsContext from './common/ConfigurationsContext';
import OpeningProvider from './common/OpeningProvider';
import ErrorBoundary from './ErrorBoundary';

import { IS_DEFAULT_MODE } from './api/config';

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

  if (!IS_DEFAULT_MODE) {
    document.querySelector('body').classList.remove('default-background');
  }
};

const renderApp = throttle(() => {
  const configurations = resizeCalc();
  renderWithConfigurations(configurations);
}, 200);

export default renderApp;

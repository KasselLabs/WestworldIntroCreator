import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';

import getAnimationConfiguration from './extras/getAnimationConfiguration';
import Routes from './Routes';
import AnimationConfigContext from './common/AnimationConfigContext';
import OpeningProvider from './common/OpeningProvider';
import ErrorBoundary from './ErrorBoundary';

import { IS_DEFAULT_MODE } from './api/config';

const renderWithAnimationConfig = (animationConfig) => {
  const AnimationConfigProvider = AnimationConfigContext.Provider;

  const mountNode = document.getElementById('app');
  ReactDOM.render(
    (
      <ErrorBoundary>
        <AnimationConfigProvider value={animationConfig}>
          <OpeningProvider>
            <Routes />
          </OpeningProvider>
        </AnimationConfigProvider>
      </ErrorBoundary>
    ),
    mountNode,
  );

  if (!IS_DEFAULT_MODE) {
    document.querySelector('body').classList.remove('default-background');
  }
};

const renderApp = throttle(() => {
  const animationConfig = getAnimationConfiguration();
  renderWithAnimationConfig(animationConfig);
}, 200);

export default renderApp;


import '../styles/index.styl';
import { documentReady } from './extras/utils';
import renderApp from './components/renderApp';
import './extras/googleanalytics';

(function _() {
  if ('production' !== process.env.NODE_ENV) {
    _startApplication();
    return;
  }

  Raven.config(process.env.RAVEN).install();
  Raven.context(() => {
    _startApplication();
  });
}());

function _startApplication() {
  documentReady(() => {
    renderApp();
  });

  window.onresize = () => {
    renderApp();
  };
}


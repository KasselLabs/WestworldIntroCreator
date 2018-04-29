
import '../styles/index.styl';
import { documentReady } from './utils';
import renderApp from './renderApp';

documentReady(() => {
  renderApp();
});

window.onresize = () => {
  renderApp();
};


import '../styles/index.styl';
import { documentReady } from './extras/utils';
import renderApp from './renderApp';
import './extras/googleanalytics';
import Swal from './extras/swal';

(function _() {
  if ('development' === process.env.NODE_ENV) {
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

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const westworldIOS = 'WestworldIOSModal';
const alreadyShow = localStorage.getItem(westworldIOS);

if (iOS && !alreadyShow) {
  Swal('IOS DEVICE', `This Website may not work properly on iOS devices, the texts on the video may not be shown.
    For better experience try it on a desktop computer or another device.
    Sorry for the inconvenience. We are trying to fix it soon.
  `);
  localStorage.setItem(westworldIOS, 'showed');
}

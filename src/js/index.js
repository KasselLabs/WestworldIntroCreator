import React from 'react';
import ReactDOM from 'react-dom';

import resizeCalc from './resizeCalc';
import '../styles/index.styl';
import App from './App';


const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);

window.onresize = () => {
  resizeCalc();
};

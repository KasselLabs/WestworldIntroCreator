import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';

import App from './App';

const mountNode = document.getElementById('app');

const MAGIC_NUMBER = 923;

const px = value => `${value}px`;

const calcRelativeValue = (value, videoWidth) => px((value / MAGIC_NUMBER) * videoWidth);

const resizeCalc = () => {
  const configurations = {
    set: true,
    overlay: {},
    overlay_content: {
      fontSize: 13,
    },
    text: [{
      top: 97,
      left: 3,
    }, {
      top: 152,
      left: 3,
    }, {
      top: 255,
      left: -215,
    }],
  };

  const videoContainer = document.querySelector('.video-container');
  // const videoOverlay = document.querySelector('.video-overlay');

  if (videoContainer) {
    console.log(videoContainer);
    const viewportHeight = videoContainer.offsetHeight;
    const viewportWidth = videoContainer.offsetWidth;

    const ratio = viewportWidth / viewportHeight;

    const videoRatio = 16 / 9;

    let videoHeight = 0;
    let videoWidth = 0;

    console.log(ratio.toFixed(2), videoRatio.toFixed(2));
    if (viewportHeight > viewportWidth) {
      if (ratio > videoRatio) {
        videoHeight = viewportHeight;
      } else {
        videoWidth = viewportWidth;
      }
    } else {
      if (ratio > videoRatio) {
        videoHeight = viewportHeight;
      } else {
        videoWidth = viewportWidth;
      }
    }

    videoWidth = videoWidth || (videoHeight * videoRatio).toFixed(0);
    videoHeight = videoHeight || (videoWidth / videoRatio).toFixed(0);

    configurations.overlay = {
      width: px(videoWidth),
      height: px(videoHeight),
      top: px((viewportHeight - videoHeight) / 2),
      left: px((viewportWidth - videoWidth) / 2),
    };

    configurations.overlay_content.fontSize = calcRelativeValue(configurations.overlay_content.fontSize, videoWidth);

    configurations.text.forEach((text) => {
      const top = calcRelativeValue(text.top, videoWidth);
      const left = calcRelativeValue(text.left, videoWidth);

      text = Object.assign(text, { top, left });
    });

    console.log('configurations:');
    console.log(configurations);
  }

  ReactDOM.render(<App configurations={configurations} />, mountNode);
};

const resizeCalcThrottle = throttle(() => {
  resizeCalc();
}, 200);


export default resizeCalcThrottle;

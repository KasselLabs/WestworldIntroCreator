import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';

import App from './App';

const mountNode = document.getElementById('app');

const MAGIC_NUMBER = 923;

const VIDEO_RATIO = 16 / 9;

const px = value => `${value}px`;

const isFullscreen = () => (
  window.innerWidth === window.screen.width && window.innerHeight === window.screen.height
);

const calcRelativeValue = (value, videoWidth) => px((value / MAGIC_NUMBER) * videoWidth);

const calcVideoSize = (viewportHeight, viewportWidth) => {
  const viewportRatio = viewportWidth / viewportHeight;

  const videoSize = {
    height: 0,
    width: 0,
  };

  if (viewportHeight > viewportWidth) {
    if (viewportRatio > VIDEO_RATIO) {
      videoSize.height = viewportHeight;
      return videoSize;
    }
    videoSize.width = viewportWidth;
    return videoSize;
  }

  if (viewportRatio > VIDEO_RATIO) {
    videoSize.height = viewportHeight;
    return videoSize;
  }

  videoSize.width = viewportWidth;
  return videoSize;
};

const calcViewportSize = (videoContainer) => {
  if (isFullscreen()) {
    return {
      height: window.screen.height,
      width: window.screen.width,
    };
  }

  return {
    height: videoContainer.offsetHeight,
    width: videoContainer.offsetWidth,
  };
};

const resizeCalc = () => {
  const configurations = {
    set: true,
    overlay: {},
    overlay_content: {
      fontSize: 13,
    },
    texts: [{
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

  if (videoContainer) {
    const viewportSize = calcViewportSize(videoContainer);

    const video = calcVideoSize(viewportSize.height, viewportSize.width);

    video.width = video.width || (video.height * VIDEO_RATIO).toFixed(0);
    video.height = video.height || (video.width / VIDEO_RATIO).toFixed(0);

    configurations.overlay = {
      width: px(video.width),
      height: px(video.height),
      top: px((viewportSize.height - video.height) / 2),
      left: px((viewportSize.width - video.width) / 2),
    };

    const defaultFontSize = configurations.overlay_content.fontSize;
    const relativeFontSize = calcRelativeValue(defaultFontSize, video.width);
    configurations.overlay_content.fontSize = relativeFontSize;

    configurations.texts = configurations.texts.map((text) => {
      const top = calcRelativeValue(text.top, video.width);
      const left = calcRelativeValue(text.left, video.width);

      return {
        ...text,
        top,
        left,
      };
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

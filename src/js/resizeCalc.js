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
    texts: [
      { top: 97, left: 0},
      { top: 152, left: 0 },
      { top: 255, left: 100, width: 292 },
      { top: 160, left: 400, width: 296 },
      { top: 361, left: 194, width: 540 },
      { top: 86, left: 194, width: 540 },
      { top: 399, left: 26, width: 540 },
      { top: 254, left: 11, width: 540 },
      { top: 438, left: 14 },
      { top: 294, left: 120, width: 292 },
      { top: 294, left: 528, width: 292 },
      { top: 111, left: 0 },
      { top: 92, left: 0 },
      { top: 153, left: 0 },
      { top: 230, left: 0 },
      { top: 240, left: 114, width: 400 },
      { top: 400, left: 204, width: 350 },
      { top: 139, left: 155, width: 350 },
      { top: 83, left: 188, width: 550 },
      { top: 438, left: 0 },
      { top: 338, left: 503, width: 350 },
      { top: 177, left: 559, width: 346 },
      { top: 241, left: 438, width: 460 },
      { top: 62, left: 318, width: 280 },
      { top: 283, left: 0 },
      { top: 100, left: 0 },
      { top: 373, left: 0 },
      { top: 115, left: 0 },
      { top: 334, left: 352, width: 220 },
      { top: 245, left: 0 },
      { top: 245, left: 0 },
      { top: 245, left: 0 },
      { top: 222, left: 0 },
      { top: 245, left: 0 },
    ],
  };

  const videoContainer = document.querySelector('.video-container');

  if (videoContainer) {
    const viewportSize = calcViewportSize(videoContainer);

    const video = calcVideoSize(viewportSize.height, viewportSize.width);
    video.width = video.width || (video.height * VIDEO_RATIO).toFixed(0);
    video.height = video.height || (video.width / VIDEO_RATIO).toFixed(0);
    console.log(video);

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
      // const top = calcRelativeValue(text.top + 13, video.width);
      const left = calcRelativeValue(text.left, video.width);
      const width = text.width ? calcRelativeValue(text.width, video.width) : '';

      return {
        ...text,
        top,
        left,
        width,
      };
    });
  }

  ReactDOM.render(<App configurations={configurations} />, mountNode);
};

const resizeCalcThrottle = throttle(() => {
  resizeCalc();
}, 200);


export default resizeCalcThrottle;

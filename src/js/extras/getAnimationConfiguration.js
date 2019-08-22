import bowser from 'bowser';
import { getDefaultAnimationConfig, baseWidthReference } from '../animationData/animationConfig';

const browser = bowser.getParser(window.navigator.userAgent);

const VIDEO_RATIO = 16 / 9;

const px = value => `${value}px`;

const isFullscreen = () => {
  const fullscreenContainer = document.querySelector('.FullScreen');
  if (browser.is('mobile')) {
    return window.innerWidth === fullscreenContainer.offsetWidth
    && window.innerHeight === fullscreenContainer.offsetHeight;
  }

  return window.innerWidth === window.screen.width
  && window.innerHeight === window.screen.height;
};

const calcRelativeValue = (value, videoWidth) => px((value / baseWidthReference) * videoWidth);

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
    if (browser.is('mobile')) {
      return {
        height: window.innerHeight,
        width: window.innerWidth,
      };
    }

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

const getAnimationConfiguration = () => {
  const configurations = getDefaultAnimationConfig();

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
      const width = text.width ? calcRelativeValue(text.width, video.width) : '';

      return {
        ...text,
        top,
        left,
        width,
      };
    });
  }

  return configurations;
};

export default getAnimationConfiguration;

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
    overlay_content: {
      fontSize: 13,
    },
    texts: [
      { top: 93, left: 0 },
      { top: 148, left: 0 },
      { top: 251, left: 100, width: 292 },
      { top: 156, left: 400, width: 296 },
      { top: 357, left: 194, width: 540 },
      { top: 82, left: 194, width: 540 },
      { top: 395, left: 26, width: 540 },
      { top: 250, left: 11, width: 540 },
      { top: 434, left: 14 },
      { top: 290, left: 120, width: 292 },
      { top: 290, left: 528, width: 292 },
      { top: 107, left: 0 },
      { top: 88, left: 0 },
      { top: 149, left: 0 },
      { top: 226, left: 0 },
      { top: 236, left: 114, width: 400 },
      { top: 396, left: 204, width: 350 },
      { top: 135, left: 155, width: 350 },
      { top: 79, left: 188, width: 550 },
      { top: 434, left: 0 },
      { top: 334, left: 503, width: 350 },
      { top: 173, left: 559, width: 346 },
      { top: 237, left: 438, width: 460 },
      { top: 58, left: 318, width: 280 },
      { top: 279, left: 0 },
      { top: 96, left: 0 },
      { top: 369, left: 0 },
      { top: 111, left: 0 },
      { top: 332, left: 354, width: 220 },
      { top: 241, left: 0 },
      { top: 241, left: 0 },
      { top: 241, left: 0 },
      { top: 218, left: 0 },
      { top: 241, left: 0 },
    ],
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

  return configurations;
};

export default resizeCalc;

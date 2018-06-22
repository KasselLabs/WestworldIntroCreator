export const documentReady = (handler) => {
  if (document.attachEvent ? 'complete' === document.readyState : 'loading' !== document.readyState) {
    handler();
  } else {
    document.addEventListener('DOMContentLoaded', handler);
  }
};

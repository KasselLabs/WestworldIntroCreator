export const defaultKey = 'Season1';

export const firebases = {
  W: process.env.FIREBASE_INITIAL,
};

export const defaultFirebase = firebases.W;
export const defaultFirebasePrefix = 'W';

// export const serverApi = process.env.SERVER_API;

if (!defaultFirebase) {
  throw new Error('Firebase URL can\'t be empty');
}

// if (!serverApi) {
//   throw new Error('Server API URL can\'t be empty');
// }

// MOCK Api
// export const serverApi = 'https://5mitidksxm7xfn4g4-mock.stoplight-proxy.io/';

export const TIME_FACTOR = 1;
export const START_AT = 0;
export const ANIMATION_START_DELAY = 0;

export const { APPLICATION_MODE } = process.env;

export const MODES = {
  DEFAULT: 'default', // youtube video
  LOCAL: 'local', // local video file with clappr player
  RENDERER: 'renderer', // no video, use fake player to play animation
};

export const IS_DEFAULT_MODE = MODES.DEFAULT === APPLICATION_MODE;
export const IS_LOCAL_MODE = MODES.LOCAL === APPLICATION_MODE;
export const IS_RENDERER_MODE = MODES.RENDERER === APPLICATION_MODE;

if (!IS_DEFAULT_MODE) {
  console.log('Application mode loaded: ', APPLICATION_MODE);
}

export const queueApiUrl = process.env.QUEUE_API;

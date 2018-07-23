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

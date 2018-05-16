export const defaultKey = 'Season1';

export const firebases = {
  initial: process.env.FIREBASE_INITIAL,
};

export const defaultFirebase = firebases.initial;
export const defaultFirebasePrefix = '';

// export const serverApi = process.env.SERVER_API;

if (!defaultFirebase) {
  throw new Error('Firebase URL can\'t be empty');
}

// if (!serverApi) {
//   throw new Error('Server API URL can\'t be empty');
// }

// MOCK Api
// export const serverApi = 'https://5mitidksxm7xfn4g4-mock.stoplight-proxy.io/';

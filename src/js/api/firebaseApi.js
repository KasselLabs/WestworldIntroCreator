import { firebases, defaultFirebase, defaultFirebasePrefix } from './config';
import Http from './Http';

const SERVER_TIMESTAMP = { '.sv': 'timestamp' };

export const _parseFirebasekey = (key) => {
  const result = {
    baseURL: defaultFirebase,
  };

  // is creating a new opening
  if (!key) {
    return result;
  }

  const prefix = key[0];
  const firebaseUrl = firebases[prefix];

  if (!firebaseUrl) {
    throw new Error(`Firebase url for prefix not set: ${prefix}`);
  }

  result.baseURL = firebaseUrl;
  result.key = key.substr(1);

  return result;
};

export const _parseSpecialKeys = (key) => {
  switch (key) {
    case 'Season1':
      return 'WLDoWtZ4-d3ytwMembH4';
    // TODO other season
    default:
      return key;
  }
};

const openingsCache = {};

export const _generateUrlWithKey = (key) => {
  const openingPrefix = '/openings/';
  return `${openingPrefix}-${key}.json`;
};


export const fetchKey = async (initialKey) => {
  const openingFromCache = openingsCache[initialKey];
  if (openingFromCache) {
    // Raven.captureBreadcrumb({
    //   message: 'Getting intro from cache.',
    //   category: 'info',
    //   data: openingFromCache,
    // });
    return openingFromCache;
  }

  const rawkey = _parseSpecialKeys(initialKey);
  const { baseURL, key } = _parseFirebasekey(rawkey);
  const http = Http(baseURL);

  const url = _generateUrlWithKey(key);

  Raven.captureBreadcrumb({
    message: 'Loading intro from Firebase.',
    category: 'info',
    data: { initialKey },
  });
  const response = await http.get(url);
  const opening = response.data;
  // const opening = {"created":1528165309973,"texts":{"text0":"EVAN RACHEL WOOD","text1":"THANDIE NEWTOW","text10":"SHANNON WOODWARD","text11":"WITH\nED HARRIS","text12":"AND\nANTHONY HOPKINS","text13":"MUSIC BY\nRAMIN DJAWADI","text14":"EDITED BY\nSTEPHEN SMEL, ACE\nMARC JOZEFOMICZ","text15":"PRODUCTION DESIGNER\nNATHAN CROWLEY","text16":"DIRECTOR OF PHOTOGRAPHY\nPAUL CAMERON, ASC","text17":"CO-PRODUCER\nBRUCE DUNN","text18":"CO-PRODUCER\nSUSAN EKINS","text19":"CO-PRODUCER\nSTEPHEN SEMEL","text2":"JEFFREY WRIGHT","text20":"CO-EXECUTIVE PRODUCER\nDAVID COATSWORTH","text21":"CO-EXECUTIVE PRODUCER\nKATHY LINGG","text22":"CO-EXECUTIVE PRODUCER\nATHENA WICKHAM","text23":"EXECUTIVE PRODUCER\nBRYAN BURK","text24":"EXECUTIVE PRODUCER\nJERRY WEINTRAUB","text25":"EXECUTIVE PRODUCER\nLISA JOY","text26":"EXECUTIVE PRODUCER\nJONATHAN NOLAN","text27":"EXECUTIVE PRODUCER\nJ.J. ABRAMS","text28":"WESTWORLD","text29":"CREATED FOR TELEVISION BY\nJONATHAN NOLAN & LISA JOY","text3":"JAMES MARSDEN","text30":"BASED ON THE FILM WRITTEN BY\nMICHAEL CRICHTON","text31":"TELEPLAY BY\nJONATHAN NOLAN & LISA JOY","text32":"STORY BY\nJONATHAN NOLAN & LISA JOY\nAND\nMICHAEL CRICHTON","text33":"DIRECTED BY\nJONATHAN NOLAN","text4":"INGRID BOLSØ BERDAL","text5":"LUKE HEMSWORTH","text6":"SIDSE BABETT KNUDSEN","text7":"SIMON QUARTERMAN","text8":"RODRIGO SANTORO","text9":"ANGELA SARAFYAN"}};

  if (!opening) {
    const error = new Error(`Opening not found: ${initialKey}`);
    Raven.captureException(error);
    return opening;
  }
  // Remove created for when the opening is compared to the form it should ignore this property.
  delete opening.created;
  openingsCache[initialKey] = opening;
  return opening;
};


export const saveOpening = async (opening) => {
  const http = Http(defaultFirebase);

  opening.created = SERVER_TIMESTAMP;

  const response = await http.post('/openings.json', opening);
  const key = `${defaultFirebasePrefix}${response.data.name.substr(1)}`;
  return key;
};

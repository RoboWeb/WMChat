export const envs = {
  fb: {
    apiKey: process.env.VUE_APP_FB_API_KEY,
    authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FB_DATABASE_URL,
    projectId: process.env.VUE_APP_FB_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FB_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FB_APP_ID,
    measurementId: process.env.VUE_APP_FB_MEASUREMENT_ID
  }
};

export const VERSION = '0.1.5-alpha';
export const NAME = 'wmChat';

export default {
  envs,
  VERSION,
  NAME
};

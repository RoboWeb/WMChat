import envs from '../app.conf';
import app from 'firebase/app';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: envs.fb.apiKey,
  authDomain: envs.fb.authDomain,
  databaseURL: envs.fb.databaseURL,
  projectId: envs.fb.projectId,
  storageBucket: envs.fb.storageBucket,
  messagingSenderId: envs.fb.messagingSenderId,
  appId: envs.fb.appId,
  measurementId: envs.fb.measurementId
};
// Initialize Firebase
const fbApp = app.initializeApp(firebaseConfig);
fbApp.firestore();

export const fStore = firestore;
export default fbApp.firestore();

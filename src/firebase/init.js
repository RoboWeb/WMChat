import envs from '../app.conf';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

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
const fapp = firebase.initializeApp(firebaseConfig);
// fbApp.firestore();

export default fapp.firestore();

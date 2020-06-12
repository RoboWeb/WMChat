import app from 'firebase/app';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '[api-key]',
  authDomain: 'wmapps-81e45.firebaseapp.com',
  databaseURL: 'https://[project-id].firebaseio.com',
  projectId: '[project-id]',
  storageBucket: '[project-id].appspot.com',
  messagingSenderId: '566980532191',
  appId: '[app-id]',
  measurementId: 'G-WEHNTYPDE7'
};
// Initialize Firebase
const fbApp = app.initializeApp(firebaseConfig);
fbApp.firestore();

export const fStore = firestore;
export default fbApp.firestore();

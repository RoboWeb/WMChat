import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '[apikey]',
  authDomain: 'wmapps-81e45.firebaseapp.com',
  databaseURL: 'https://[project-id].firebaseio.com',
  projectId: '[project-id]',
  storageBucket: 'wmapps-81e45.appspot.com',
  messagingSenderId: '566980532191',
  appId: '[app-id]',
  measurementId: 'G-WEHNTYPDE7'
};
// Initialize Firebase
const fbApp = firebase.initializeApp(firebaseConfig);
fbApp.firestore();


export default fbApp.firestore();

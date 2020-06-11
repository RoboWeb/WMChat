import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA7Ds7gCbRGNOt2-iZUBZB1A4lMmTFS4jI',
  authDomain: 'wmapps-81e45.firebaseapp.com',
  databaseURL: 'https://wmapps-81e45.firebaseio.com',
  projectId: 'wmapps-81e45',
  storageBucket: 'wmapps-81e45.appspot.com',
  messagingSenderId: '566980532191',
  appId: '1:566980532191:web:1d1bddf44541e904c7166a',
  measurementId: 'G-WEHNTYPDE7'
};
// Initialize Firebase
const fbApp = firebase.initializeApp(firebaseConfig);
fbApp.firestore();


export default fbApp.firestore();

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBup3hbMoVdbmYfFZ6V9pigNRitAYzHKRE',
  authDomain: 'shibal-app.firebaseapp.com',
  databaseURL: 'https://shibal-app.firebaseio.com',
  projectId: 'shibal-app',
  storageBucket: 'shibal-app.appspot.com',
  messagingSenderId: '953241007698',
  // appId:
  //   '1:953241007698:android:e2546bc06515d69dc4518b', // android
  //   '1:953241007698:ios:be4bf722e858de54c4518b', // ios
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAn5iqSnUoX0QXTQR1MtLqiUIIOE4l7_-4",
    authDomain: "login-e72e0.firebaseapp.com",
    databaseURL: "https://login-e72e0.firebaseio.com",
    projectId: "login-e72e0",
    storageBucket: "login-e72e0.appspot.com",
    messagingSenderId: "961314994491",
    appId: "1:961314994491:web:a712e2bfdde56849d25f1e",
    measurementId: "G-VY5144JB4M"
  };

const FireBase = firebase.initializeApp(firebaseConfig);

export default FireBase;
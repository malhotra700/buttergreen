import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3mPv1VGarfc26yBty0dyOJA3oAG-nnfQ",
  authDomain: "butterhn-b80de.firebaseapp.com",
  databaseURL: "https://butterhn-b80de.firebaseio.com",
  projectId: "butterhn-b80de",
  storageBucket: "butterhn-b80de.appspot.com",
  messagingSenderId: "7354074403",
  appId: "1:7354074403:web:7fdb429886ebeee06a7896",
  measurementId: "G-WNW9GV3WD7",
};

export const Firebase = firebase.initializeApp(firebaseConfig);

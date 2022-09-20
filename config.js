import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyfE55Ap_cG1YRM6hCQvoTq5ujfspqvDc",
    authDomain: "intentoauth.firebaseapp.com",
    projectId: "intentoauth",
    storageBucket: "intentoauth.appspot.com",
    messagingSenderId: "419497875407",
    appId: "1:419497875407:web:e889171f5bc96c6ca664ba",
    measurementId: "G-EZEEG5HJDT"
  };

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase};
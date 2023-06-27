// import firebase from "firebase/app";
// import "firebase/analytics";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";

import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC0agglVYDK7Y8paw1Fp-PkR7_KIOhVt5I",
    authDomain: "disneyplus-clone-461a9.firebaseapp.com",
    projectId: "disneyplus-clone-461a9",
    storageBucket: "disneyplus-clone-461a9.appspot.com",
    messagingSenderId: "893563525550",
    appId: "1:893563525550:web:5954e541e39ee9b0a8503f",
    measurementId: "G-4CV904H0C0"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export { auth, provider, storage };
  export default db;
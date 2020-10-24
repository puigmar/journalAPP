import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYgTx5oK7KbIGonCbsedbx_hXqar776dE",
  authDomain: "react-e42c1.firebaseapp.com",
  databaseURL: "https://react-e42c1.firebaseio.com",
  projectId: "react-e42c1",
  storageBucket: "react-e42c1.appspot.com",
  messagingSenderId: "644010808839",
  appId: "1:644010808839:web:df9e749ad2db24d37b3ca2",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };

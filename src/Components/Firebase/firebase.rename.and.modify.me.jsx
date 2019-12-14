import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};


export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

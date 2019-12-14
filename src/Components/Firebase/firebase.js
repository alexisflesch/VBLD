import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDvalQagACeLMH6obWQ3mHniAoYYNFMsqA",
  authDomain: "vbld-deaae.firebaseapp.com",
  databaseURL: "https://vbld-deaae.firebaseio.com",
  projectId: "vbld-deaae",
  storageBucket: "vbld-deaae.appspot.com",
  messagingSenderId: "367442433844",
  appId: "1:367442433844:web:bd8446036b1ed769683761",
  measurementId: "G-5QEJ8L3B1Y"
};


export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

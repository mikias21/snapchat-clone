import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIvjgpppPU_HU45sUHR8Rc3WnzE0sc7Sk",
  authDomain: "slack-clone-6a428.firebaseapp.com",
  databaseURL: "https://slack-clone-6a428.firebaseio.com",
  projectId: "slack-clone-6a428",
  storageBucket: "slack-clone-6a428.appspot.com",
  messagingSenderId: "319053820511",
  appId: "1:319053820511:web:ad096fbfd2f016b24ee1ea",
  measurementId: "G-0SFY2J5M4W",
};

// firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firestore db
const db = firebaseApp.firestore();
// google auth
const auth = firebase.auth();
// storage
const storage = firebase.storage();
// provider
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };

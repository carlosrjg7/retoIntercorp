import firebase from "firebase/app";
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIN4-2d980hmtDUp1Nik7no_cGpwS5-4U",
    authDomain: "reto-intercorp-front.firebaseapp.com",
    projectId: "reto-intercorp-front",
    storageBucket: "reto-intercorp-front.appspot.com",
    messagingSenderId: "656237980101",
    appId: "1:656237980101:web:9f660f7e68bb2387e383ac"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export { firebase }
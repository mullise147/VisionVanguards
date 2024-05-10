// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { Firestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "yourAPIKey",
  authDomain: "yourAuthDomain",
  projectId: "yourProjectID",
  storageBucket: "yourStorageBucket",
  messagingSenderId: "yourID",
  appId: "yourAppID",
  measurementId: "yourMeasurementID"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'}); 


export const signInWithGoogle = () => signInWithPopup(auth, provider); 
export  { auth }; 

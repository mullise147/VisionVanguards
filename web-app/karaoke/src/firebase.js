// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { Firestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAi1M4KNRf-EyBh949zRR3CdBuuIx4BdE",
  authDomain: "karaoke-fd846.firebaseapp.com",
  projectId: "karaoke-fd846",
  storageBucket: "karaoke-fd846.appspot.com",
  messagingSenderId: "91386648390",
  appId: "1:91386648390:web:8ec442bbb55b49a154f747",
  measurementId: "G-23JBZCM5YH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'}); 


export const signInWithGoogle = () => signInWithPopup(auth, provider); 
export  { auth }; 
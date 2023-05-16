// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwgamGT47BlAGBj0jz4kTnB0tb2Fzh9hI",
  authDomain: "barua-ai.firebaseapp.com",
  projectId: "barua-ai",
  storageBucket: "barua-ai.appspot.com",
  messagingSenderId: "444183993999",
  appId: "1:444183993999:web:71ba589392440b4ccd1afa",
  measurementId: "G-STPD36BLWT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics =  isSupported().then(yes => yes ? getAnalytics(app) : null);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_mmG9uBDFLde4tnm7IpmC_z-QrDu7Auc",
  authDomain: "audio-recording-app-bb90c.firebaseapp.com",
  projectId: "audio-recording-app-bb90c",
  storageBucket: "audio-recording-app-bb90c.firebasestorage.app",
  messagingSenderId: "138936675868",
  appId: "1:138936675868:web:417b1020d4131969da39d9",
  measurementId: "G-4HZ0RN5ZCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Auth


export { app, database, auth };
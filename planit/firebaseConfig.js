// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAAhaVIEQd2QkVO8KxOUR_H-XY3PhUo6o",
  authDomain: "planit-bfa38.firebaseapp.com",
  projectId: "planit-bfa38",
  storageBucket: "planit-bfa38.firebasestorage.app",
  messagingSenderId: "1018099220762",
  appId: "1:1018099220762:web:5de7a07a0765ba08652ca3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBalXBEIKgzHo23MIzBpEYIwqTv-Neopsc",
  authDomain: "collaborativebanking.firebaseapp.com",
  projectId: "collaborativebanking",
  storageBucket: "collaborativebanking.firebasestorage.app",
  messagingSenderId: "32856308947",
  appId: "1:32856308947:web:5489604833e896d2632826",
  measurementId: "G-SX92BENWR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
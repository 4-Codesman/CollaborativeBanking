import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBalXBEIKgzHo23MlZBpEYIwqTv-Neopsc",
  authDomain: "collaborativebanking.firebaseapp.com",
  projectId: "collaborativebanking",
  storageBucket: "collaborativebanking.appspot.com",
  messagingSenderId: "32856308947",
  appId: "1:32856308947:web:5489604833e896d2632826",
  measurementId: "G-SX92BENWR9"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  standalone: true
})
export class LandingComponent {
  signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('✅ Signed in as:', result.user.displayName);
      })
      .catch((error) => {
        console.error('❌ Sign-in error:', error.message);
      });
  }
}

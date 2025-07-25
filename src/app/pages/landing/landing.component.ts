import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
  standalone: true
})
export class LandingComponent {
  private auth: Auth = inject(Auth);  // ✅ Use DI to get the already-initialized Auth

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('✅ Signed in as:', result.user.displayName);
      })
      .catch((error) => {
        console.error('❌ Sign-in error:', error.message);
      });
  }
}

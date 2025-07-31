import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
  standalone: true
})
export class LandingComponent {
  private auth: Auth = inject(Auth);
  private dataService: DataService = inject(DataService);
  private router: Router = inject(Router);

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('✅ Signed in as:', result.user.displayName);

        const user = {
          uID: result.user.uid,
          uEmail: result.user.email,
          uName: result.user.displayName
        };

        localStorage.setItem('Email', user.uEmail || '');
        localStorage.setItem('userID', user.uID || '');

        this.dataService.postUserLogin(user).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.error(error);
          }
        });
        // ✅ Always redirect after Firebase login
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('❌ Sign-in error:', error.message);
      });
  }
}

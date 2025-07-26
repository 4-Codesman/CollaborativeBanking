import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
  standalone: true
})
export class LandingComponent {
  private auth: Auth = inject(Auth);  // ✅ Use DI to get the already-initialized Auth
  private dataService: DataService = inject(DataService);

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('✅ Signed in as:', result.user.displayName);

        const user ={
          uID: result.user.uid,
          uEmail: result.user.email,
          uName: result.user.displayName
        };

        this.dataService.postUserLogin(user).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.error(error);
          }
        });
      })
      .catch((error) => {
        console.error('❌ Sign-in error:', error.message);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-join-league',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './join-league.html',
  styleUrls: ['./join-league.css']
})
export class JoinLeagueComponent implements OnInit {
  joinForm: FormGroup;
  leagues: any[] = [];
  responseMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.joinForm = this.fb.group({
      goal: [200, [Validators.required, Validators.min(200)]],
      leagueId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchOpenLeagues();
  }

  fetchOpenLeagues(): void {
    this.http.get<any[]>(`${environment.apiUrl}/saving-leagues/open`)
      .subscribe({
        next: (res) => this.leagues = res,
        error: () => this.responseMessage = 'Failed to load leagues.'
      });
  }

  joinLeague(): void {
    if (this.joinForm.invalid) {
      this.responseMessage = 'Please fill in all fields correctly.';
      return;
    }

    const uid = localStorage.getItem('userID');
    if (!uid) {
      this.responseMessage = 'You are not logged in.';
      return;
    }

    const { goal, leagueId } = this.joinForm.value;
    this.http.post(`${environment.apiUrl}/saving-leagues/${leagueId}/join`, { uid, goal })
      .subscribe({
        next: (res: any) => {
          this.responseMessage = res.message || 'Successfully joined the league!';
          this.fetchOpenLeagues();  // refresh available leagues
        },
        error: (err) => this.responseMessage = err.error?.error || 'Error joining the league.'
      });
  }
}

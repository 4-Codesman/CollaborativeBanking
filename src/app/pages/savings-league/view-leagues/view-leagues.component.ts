import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-leagues',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-leagues.html',
  styleUrls: ['./view-leagues.css']
})
export class ViewLeaguesComponent implements OnInit {
  leagues: any[] = [];
  uid: string = '';
  goal: number | null = null;
  responseMessage = '';

  private readonly baseUrl = 'https://4codesmanwebappbe-drbresg4h5cpcjdm.canadacentral-01.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const storedUid = localStorage.getItem('userID');
    if (!storedUid) {
      this.responseMessage = 'No user ID found. Please log in.';
      return;
    }

    this.uid = storedUid;

    this.http.get<any[]>(`${this.baseUrl}/saving-leagues/uID/${this.uid}`).subscribe({
      next: (data) => this.leagues = data,
      error: () => this.responseMessage = 'Error fetching your savings leagues.'
    });
  }

  joinLeague(leagueId: string): void {
    if (!this.uid || !this.goal || this.goal < 200) {
      this.responseMessage = 'Please enter a valid goal (minimum R200).';
      return;
    }

    this.http.post(`${this.baseUrl}/saving-leagues/join/${leagueId}`, {
      uid: this.uid,
      goal: this.goal
    }).subscribe({
      next: (res: any) => this.responseMessage = res.message || 'Successfully joined the league!',
      error: (err) => this.responseMessage = err.error?.error || 'Failed to join the league.'
    });
  }

  redirectToLeague(leagueId: string): void {
    console.log(`Redirecting to league with ID: ${leagueId}`);
    localStorage.setItem('svl_id', leagueId);
    window.location.href = `/savings/indiv-league`;
  }
}

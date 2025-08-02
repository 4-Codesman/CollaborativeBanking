import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Vstokvel',
  templateUrl: './Vstokvel.html',
  styleUrls: ['./Vstokvel.css'],
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class VStokvelComponent implements OnInit {
  stokvelsV: { id: string; name: string }[] = [];
  stokvelDetails: any = null;
  loading = true;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const stokvelId = this.route.snapshot.paramMap.get('id');
    const email = localStorage.getItem('Email');

    if (stokvelId) {

      this.http.get(`${environment.apiUrl}/join/details/${stokvelId}`).subscribe({
        next: (data) => {
          this.stokvelDetails = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching stokvel details:', err);
          this.loading = false;
        }
      });
    } else if (email) {

      this.http.post<{ stokvels: { id: string; name: string }[] }>(
        `${environment.apiUrl}/view/check-user`,
        { email }
      ).subscribe({
        next: (response) => {
          this.stokvelsV = response.stokvels;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching user stokvels:', err);
          this.stokvelsV = [];
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {HttpClient }from '@angular/common/http';
import { CommonModule } from '@angular/common'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Vstokvel', 
  templateUrl: './Vstokvel.html', 
  styleUrls: ['./Vstokvel.css'], 
  standalone: true,
  imports: [RouterLink, CommonModule]
})

export class VStokvelComponent implements OnInit {
  stokvelIds: string[]= [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const email = localStorage.getItem('Email');
    if (email) {
      this.http.post<{ stokvels: string[] }>(`${environment.apiUrl}/view/check-user`, { email }).subscribe({
        next: (response) => {
          this.stokvelIds = response.stokvels;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching user stokvels:', err);
          this.stokvelIds = [];
          this.loading = false;
        }
      });
    } else {
      this.stokvelIds = [];
      this.loading = false;
    }
  }
}
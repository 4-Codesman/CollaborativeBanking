import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Jstokvel', 
  templateUrl: './Jstokvel.html', 
  styleUrls: ['./Jstokvel.css'], 
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class JStokvelComponent implements OnInit {
  stokvelsJ: { id: string; name: string }[] = [];
  loading = true;

  indStokvel: any =null;
  showPopup= false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const email = localStorage.getItem('Email');
    if (email) {
      this.http.post<{ stokvels: { id: string; name: string }[] }>(
        `${environment.apiUrl}/join/confirm-user`, 
        { email }
      ).subscribe({
        next: (response) => {
          this.stokvelsJ = response.stokvels;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching user stokvels:', err);
          this.stokvelsJ = [];
          this.loading = false;
        }
      });
    } else {
      this.stokvelsJ = [];
      this.loading = false;
    }
  }

viewDetails(stokvelId: string) {
    this.http.get<any>(`${environment.apiUrl}/join/details/${stokvelId}`).subscribe({
      next: (data) => {
        this.indStokvel=data;
        this.showPopup=true;
      },
      error: (err) => {
        console.error('Error fetching details', err);
      }
    });
  }
  acceptStokvel() {
    const email=localStorage.getItem('Email');
    if (!email || !this.indStokvel) return;

    this.http.post(`${environment.apiUrl}/join/join-response`, {
      stokvelId: this.indStokvel._id,
      email,
      accepted: true
    }).subscribe({
      next: () => {
        this.stokvelsJ = this.stokvelsJ.filter(s => s.id !== this.indStokvel._id);
        this.closePopup();
      },
      error: (err) => {
        console.error('Error accepting stokvel:', err);
      }
    });
  }

  rejectStokvel() {
    const email=localStorage.getItem('Email');
    if (!email ||!this.indStokvel) return;

    this.http.post(`${environment.apiUrl}/join/join-response`, {
      stokvelId: this.indStokvel._id,
      email,
      accepted: false
    }).subscribe({
      next: () => {
        this.stokvelsJ = this.stokvelsJ.filter(s => s.id !== this.indStokvel._id);
        this.closePopup();
      },
      error: (err) => {
        console.error('Error rejecting stokvel:', err);
      }
    });
  }

closePopup() {
  this.showPopup = false;
  this.indStokvel= null;
}

}

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
      this.http.get(`${environment.apiUrl}/view/details/${stokvelId}?email=${encodeURIComponent(email!)}`).subscribe({
        next: (data:any) => {
          // Calculate progress for each member
          const startDate = new Date(data.startDate);
          const now = new Date();

          const periodToDays: any = {
            weekly: 7,
            biweekly: 14,
            monthly: 30,
            quarterly: 90,
            annually: 365
          };

          const periodDays = periodToDays[data.period.toLowerCase()] || 30;

          data.members.forEach((member: any) => {
            const payoutDate = new Date(startDate);
            payoutDate.setDate(payoutDate.getDate() + periodDays * member.position);

            const totalDays = (payoutDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
            const passedDays = Math.max(0, (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

            let percent = Math.min(100, Math.round((passedDays / totalDays) * 100));
            if (isNaN(percent)) percent = 0;

            member.progress = percent;
          });

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

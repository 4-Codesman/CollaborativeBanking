import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common'; 



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'], 
})


export class HomeComponent implements OnInit {
  private dataService: DataService = inject(DataService);

  userID: string = '';
  userData: any = null;

  ngOnInit(): void {
    const storedUID = localStorage.getItem('ID');

    if (storedUID) {
      this.userID = storedUID;

      this.dataService.getUserByUID(this.userID).subscribe({
        next: (data) => {
          console.log('User data loaded:', data);
          this.userData = data;
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        }
      });
    }
  }
}


import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  animations: [
    trigger('expandCard', [
      state('collapsed', style({
        height: '80px',
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: 'auto',
        minHeight: '200px'
      })),
      transition('collapsed <=> expanded', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  private dataService: DataService = inject(DataService);

  userID: string = '';
  userData: any = null;
  cardStates = {
    account: 'collapsed',
    stokvel: 'collapsed',
    savings: 'collapsed'
  };

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

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  toggleCard(card: 'account' | 'stokvel' | 'savings') {
    // Close other cards when opening a new one
    if (this.cardStates[card] === 'collapsed') {
      this.cardStates.account = 'collapsed';
      this.cardStates.stokvel = 'collapsed';
      this.cardStates.savings = 'collapsed';
    }
    this.cardStates[card] = this.cardStates[card] === 'collapsed' ? 'expanded' : 'collapsed';
  }

  isCardExpanded(card: 'account' | 'stokvel' | 'savings'): boolean {
    return this.cardStates[card] === 'expanded';
  }
}

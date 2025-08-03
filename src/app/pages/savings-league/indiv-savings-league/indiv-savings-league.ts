import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from '../pipes/order-by-pipe';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-indiv-savings-league',
  standalone: true,
  imports: [CommonModule, OrderByPipe],
  templateUrl: './indiv-savings-league.html',
  styleUrl: './indiv-savings-league.css'
})
export class IndivSavingsLeague {
  users: any[] = [];
  loading = true;
  svl_id: string = '';
  SL: any = [];
  SL_user: any[] = [];
  user_goal: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.svl_id = localStorage.getItem('svl_id') || '';
    console.log('Savings League ID from localStorage:', this.svl_id);

    if (this.svl_id) {
      this.dataService.getUsersInSavingLeague(this.svl_id).subscribe({
        next: (response: any[]) => {
          this.users = response;
          this.user_goal = this.users.map(user => ({
            user_id: user.user_id,
            goal: user.goal
          }));
          console.log('Users in Savings League:', this.users);
          console.log('User goals:', this.user_goal);

          const userDetailsRequests = this.users.map(user =>
            this.dataService.getUserByUID(user.user_id)
          );

          forkJoin(userDetailsRequests).subscribe({
            next: (userDetails: any[]) => {
              this.SL_user = userDetails;
              // After assigning this.SL_user = userDetails;
              this.SL_user = userDetails.map(user => {
                const userGoal = this.user_goal.find(ug => ug.user_id === user.userID)?.goal || 0;
                const balance = user.SavingsLeague_Balance || 0;
                const progress = userGoal > 0 ? Math.min(Math.round((balance / userGoal) * 100), 100) : 0;

                return {
                  ...user,
                  progress
                };
              });

              console.log('Detailed user info:', this.SL_user);
              this.loading = false;
            },
            error: (err: any) => {
              console.error('Error fetching user details:', err);
              this.loading = false;
            }
          });
        },
        error: (err: any) => {
          console.error('Error fetching users in savings league:', err);
          this.users = [];
          this.loading = false;
        }
      });

      this.dataService.getSavingLeagueById(this.svl_id).subscribe({
        next: (response: any) => {
          this.SL = response;
          console.log('Savings League Details:', this.SL);
        },
        error: (err: any) => {
          console.error('Error fetching savings league details:', err);
        }
      });

    } else {
      console.warn('No Savings League ID found in localStorage');
      this.loading = false;
    }
  }

  // 🚀 NEW METHOD to calculate user progress percentage
  getUserProgress(userId: string, balance: number): number | null {
    const entry = this.user_goal.find(ug => ug.user_id === userId);
    console.log('User Goal Entry:', entry);
    if (entry && entry.goal && entry.goal > 0) {
      const percent = (balance / entry.goal) * 100;
      return Math.min(Math.round(percent), 100); // Cap at 100%
    }
    return null;
  }

  paymentProcessing = false;

onPayClick(): void {
  // Disable the button while processing
  this.paymentProcessing = true;
  const userId = localStorage.getItem('userID') || '';
  this.dataService.payIntoSavingLeague(userId, 200, 'SavingsLeague').subscribe({
    next: (response) => {
      console.log('Payment successful:', response);
      alert('Payment successful!'); // Notify user of success
      this.paymentProcessing = false; // Re-enable button
    },
    error: (error) => {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.'); // Notify user of failure
      this.paymentProcessing = false; // Re-enable button
    }
  });
  setTimeout(() => {
    // Simulate success
    alert('Payment flow would be triggered here.'); 
    this.paymentProcessing = false;
  }, 1500);
}

}

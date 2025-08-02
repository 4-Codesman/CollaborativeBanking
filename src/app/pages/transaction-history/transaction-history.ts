import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.html',
  styleUrls: ['./transaction-history.css'],
  standalone: true, // Ensure standalone is enabled
  imports: [CommonModule] // Import CommonModule for Angular directives like *ngIf and *ngFor
})
export class TransactionHistory {
  transactions: any[] = [];
  accBalance: number = 0; // Initialize account balance
  Saving_L: number = 0; // Initialize saving balance
  Available : number = this.accBalance - this.Saving_L; // Initialize available balance
  loading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const uID = localStorage.getItem('userID');
    console.log('User ID from localStorage:', uID);
    if (uID) {
      this.dataService.getTransactionsByUserId(uID).subscribe({
        next: (response) => {
          this.transactions = response.map(transaction => ({
            ...transaction,
            date: new Date(transaction.date) // Ensure date is properly formatted
          }));
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching transactions:', err);
          this.transactions = [];
          this.loading = false;
        }
      });

       // fetch user account information and store it here to be displayed on account summary
      this.dataService.getUserByUID(uID).subscribe({
        next: (user) => {
          this.accBalance = user.accBalance || 0; // Set account balance
          this.Saving_L = user.SavingsLeague_Balance || 0; // Set saving balance
          this.Available = this.accBalance - this.Saving_L; // Calculate available balance
          console.log('User account information:', user.accountBalance, user.savingBalance);
        },
        error: (err) => {
          console.error('Error fetching user information:', err);
        }
      });

    } else {
      this.transactions = [];
      this.loading = false;
    }
  }
}

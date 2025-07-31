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
    } else {
      this.transactions = [];
      this.loading = false;
    }
  }
}

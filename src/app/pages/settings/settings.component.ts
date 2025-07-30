import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  constructor(private router: Router) {}

  manageAccount() {
    console.log('Manage Account clicked');

    //this.router.navigate(['/account']);
  }

  editPaymentInfo() {
    console.log('Edit Payment Info clicked'); 
    
    //this.router.navigate(['/payment-info']);
  }

  viewTermsAndConditions() {
    console.log('View Terms and Conditions clicked');

    //this.router.navigate(['/terms-and-conditions']);
  } 

}

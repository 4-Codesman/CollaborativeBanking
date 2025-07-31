import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { DataService } from '@services/data.service';

// Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipInputEvent } from '@angular/material/chips';

import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-cstokvel',
  standalone: true,
  templateUrl: './Cstokvel.html',
  styleUrls: ['./Cstokvel.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule
  ]
})
export class CStokvelComponent implements OnInit {
  createForm!: FormGroup;
  memberCtrl = new FormControl('');
  emails: string[] = [];
  filteredEmails!: Observable<string[]>;
  selectedMembers: string[] = [];
  todayString = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeEmailAutocomplete();
  }

  private initializeForm(): void {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      stokvelType: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      payoutPeriod: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  private initializeEmailAutocomplete(): void {
    this.dataService.getEmails().subscribe(emails => {
      this.emails = emails;
      this.filteredEmails = this.memberCtrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.emails.filter(email => email.toLowerCase().includes(filterValue));
  }

  addMember(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    
    if (value && !this.selectedMembers.includes(value)) {
      this.selectedMembers.push(value);
    }

    if (event.input) {
      event.input.value = '';
    }
    this.memberCtrl.setValue(null);
  }

  selectMember(email: string): void {
    if (email && !this.selectedMembers.includes(email)) {
      this.selectedMembers.push(email);
    }
    this.memberCtrl.setValue('');
  }

  removeMember(member: string): void {
    const index = this.selectedMembers.indexOf(member);
    if (index >= 0) {
      this.selectedMembers.splice(index, 1);
    }
  }
  onSubmit(): void {
    if (this.createForm.valid && this.selectedMembers.length > 0) {
      const typeMapping: { [key: string]: number } = {
        'no-interest': 0,
        'interest': 1
      };
  
      const selectedTypeString: string = this.createForm.value.stokvelType;
      const typeNumber = typeMapping[selectedTypeString];
  
      if (typeNumber === undefined) {
        console.error(`Invalid stokvel type: ${selectedTypeString}`);
        return; // or show user error
      }
      if(localStorage.getItem('Email'))
      {
        this.selectedMembers.push(localStorage.getItem('Email') || '');
      }
  
      const stokvelData = {
        name: this.createForm.value.title,
        type: typeNumber,
        amount: this.createForm.value.amount,
        period: this.createForm.value.payoutPeriod,
        date: this.createForm.value.startDate,
        members: this.selectedMembers
      };
  
      this.dataService.createStokvel(stokvelData).subscribe({
        next: res => {console.log('Stokvel created:', res);
          this.router.navigate(['/home']);
          window.alert("Stokvel created successfully! Awaiting members' acceptance");

        },
        error: err => console.error('Error creating stokvel', err)
      });
    }
  }
  
}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-savings-league',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './create-savings-league.html',
})
export class CreateSavingsLeagueComponent {
  createForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      maxMembers: [2, [Validators.required, Validators.min(2)]],
      goal: [200, [Validators.required, Validators.min(200)]],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.createForm.invalid) return;

    const { name, description, maxMembers, goal, startDate, startTime } = this.createForm.value;

    const fullStart = new Date(`${startDate}T${startTime}`);
    const fullDue = new Date(fullStart);
    fullDue.setMonth(fullDue.getMonth() + 1); // Set due date 1 month later

    const leagueData = {
      name,
      description,
      maxMembers,
      creatorGoal: goal,
      status: 'open',
      startDate: fullStart,
      dueDate: fullDue,
      creatorUid: 'mock-uid' // replace with actual UID from auth service
    };

    console.log('Creating savings league:', leagueData);

    this.http.post(`${environment.apiUrl}/saving-leagues/create`, leagueData).subscribe({
      next: (res) => console.log('✅ Created:', res),
      error: (err) => console.error('❌ Error:', err)
    });
  }
}

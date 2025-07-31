import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-savings-league',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <form [formGroup]="createForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>League Name</mat-label>
        <input matInput formControlName="name" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Max Members</mat-label>
        <input matInput type="number" formControlName="maxMembers" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Goal Amount</mat-label>
        <input matInput type="number" formControlName="goal" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Start Date</mat-label>
        <input matInput type="date" formControlName="startDate" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Start Time</mat-label>
        <input matInput type="time" formControlName="startTime" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="createForm.invalid">Create League</button>
    </form>
  `,
  // styleUrls: ['./create-savings-league.component.css']
})
export class CreateSavingsLeagueComponent {
  createForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      maxMembers: [2, [Validators.required, Validators.min(2)]],
      goal: [200, [Validators.required, Validators.min(200)]],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.createForm.invalid) return;

    const { name, maxMembers, goal, startDate, startTime } = this.createForm.value;
    const startDateTime = `${startDate}T${startTime}`;

    const leagueData = {
      name,
      maxMembers,
      creatorGoal: goal,
      startDateTime
    };

    console.log('Submit savings league:', leagueData);

    // TODO: Replace this with actual POST request to backend
    // this.http.post('/api/savings-league/create', leagueData).subscribe(...)
  }
}

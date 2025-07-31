import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ Import RouterModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-savings-league',
  standalone: true, // ✅ ensure it's standalone
  imports: [RouterModule, CommonModule], // ✅ Add RouterModule here
  templateUrl: './savings-league.html',
  styleUrl: './savings-league.css'
})
export class SavingsLeagueComponent {}

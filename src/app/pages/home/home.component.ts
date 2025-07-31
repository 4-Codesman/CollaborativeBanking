import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],  // ✅ fixed here
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  verifybtn: boolean;

  constructor(private router: Router) {
    this.verifybtn = localStorage.getItem('isLoggedIn') === 'true';
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.verifybtn = true;
    this.router.navigate(['/list']);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.verifybtn = false;
    this.router.navigate(['/']);
  }
}

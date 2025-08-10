import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'uteq-app',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'weather-forecast-client';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role === 'Admin';
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
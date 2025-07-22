import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  email = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  role = 'User'; // Default role
  
  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.username || !this.password || !this.confirmPassword || !this.email) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.authService.register({
      username: this.username,
      password: this.password,
      email: this.email,
      role: this.role
    }).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error || 'Registration failed. Please try again.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}

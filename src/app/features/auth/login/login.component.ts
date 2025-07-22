import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/shared/models/auth-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;
  isLoggedIn = false;
  isLoginFailed = false;


  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isLoading = true;
    if(!(this.username.length > 0) || !(this.password.length > 0)) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      this.isLoading = false;
      this.isLoginFailed = true;
      return;
    }
    this.authService.login({ username: this.username, password: this.password } as LoginRequest)
    .subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        this.isLoading = false;
        this.isLoggedIn = true;
        this.router.navigate(['/forecast']);
      },
      error: (err) => {
        if (err.status === 404) {
          this.errorMessage = 'Credenciales inválidas o usuario no existente.';
        } else {
          this.errorMessage = 'Ocurrió un error al iniciar sesión. Intenta de nuevo.';
        }
      }
    });
  }
}

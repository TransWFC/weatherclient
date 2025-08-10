import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role === 'Admin') {
          return true;
        }
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
    
    this.snackBar.open('No tiene permisos para acceder a esta sección', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
    
    this.router.navigate(['/forecast']);
    return false;
  }
}
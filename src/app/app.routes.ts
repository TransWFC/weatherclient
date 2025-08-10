import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'forecast',
    loadChildren: () => import('./features/weather/weather.module').then(m => m.WeatherModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'logs',
    loadChildren: () => import('./features/logs/log.module').then(m => m.LogModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];
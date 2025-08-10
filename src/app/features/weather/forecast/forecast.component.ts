import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeatherService } from 'src/app/core/services/weather.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { WeatherForecast } from 'src/app/shared/models/weather-forecast.model';
import { ForecastDialogComponent } from '../forecast-dialog/forecast-dialog.component';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  forecast: WeatherForecast[] = [];
  displayedColumns: string[] = ['date', 'temperatureC', 'temperatureF', 'summary', 'actions'];
  isAdmin: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadForecasts();
  }

  loadForecasts(): void {
    this.weatherService.getForecast().subscribe({
      next: (data) => {
        this.forecast = data;
      },
      error: (error) => {
        this.showMessage('Error al cargar los pronósticos');
      }
    });
  }


  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ForecastDialogComponent, {
      width: '500px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createForecast(result);
      }
    });
  }

  openEditDialog(forecast: WeatherForecast): void {
    const dialogRef = this.dialog.open(ForecastDialogComponent, {
      width: '500px',
      data: { forecast, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && forecast.id) {
        this.updateForecast(forecast.id, result);
      }
    });
  }

  openViewDialog(forecast: WeatherForecast): void {
    this.dialog.open(ForecastDialogComponent, {
      width: '500px',
      data: { forecast, mode: 'view' }
    });
  }

  createForecast(forecast: WeatherForecast): void {
    this.weatherService.createForecast(forecast).subscribe({
      next: () => {
        this.showMessage('Pronóstico creado exitosamente');
        this.loadForecasts();
      },
      error: (error) => {
        this.showMessage('Error al crear el pronóstico');
      }
    });
  }

  updateForecast(id: number, forecast: WeatherForecast): void {
    this.weatherService.updateForecast(id, forecast).subscribe({
      next: () => {
        this.showMessage('Pronóstico actualizado exitosamente');
        this.loadForecasts();
      },
      error: (error) => {
        this.showMessage('Error al actualizar el pronóstico');
      }
    });
  }

  deleteForecast(forecast: WeatherForecast): void {
    if (!this.isAdmin) {
      this.showMessage('No cuenta con los permisos adecuados para eliminar pronósticos');
      return;
    }

    if (confirm(`¿Está seguro de eliminar el pronóstico del ${new Date(forecast.date).toLocaleDateString()}?`)) {
      if (forecast.id) {
        this.weatherService.deleteForecast(forecast.id).subscribe({
          next: () => {
            this.showMessage('Pronóstico eliminado exitosamente');
            this.loadForecasts();
          },
          error: (error) => {
            if (error.status === 403) {
              this.showMessage('No cuenta con los permisos adecuados para eliminar pronósticos');
            } else {
              this.showMessage('Error al eliminar el pronóstico');
            }
          }
        });
      }
    }
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
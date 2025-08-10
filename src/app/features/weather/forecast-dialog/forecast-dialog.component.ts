import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WeatherForecast } from 'src/app/shared/models/weather-forecast.model';

export interface DialogData {
  forecast: WeatherForecast;
  mode: 'create' | 'edit' | 'view';
}

@Component({
  selector: 'app-forecast-dialog',
  templateUrl: './forecast-dialog.component.html',
  styleUrls: ['./forecast-dialog.component.scss']
})
export class ForecastDialogComponent {
  forecast: WeatherForecast;
  mode: 'create' | 'edit' | 'view';
  isReadOnly: boolean;

  constructor(
    public dialogRef: MatDialogRef<ForecastDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.mode = data.mode;
    this.isReadOnly = data.mode === 'view';
    
    if (data.mode === 'create') {
      this.forecast = {
        date: new Date(),
        temperatureC: 0,
        temperatureF: 32,
        summary: ''
      };
    } else {
      this.forecast = { ...data.forecast };
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Calculate Fahrenheit from Celsius
    this.forecast.temperatureF = Math.round((this.forecast.temperatureC * 9/5) + 32);
    this.dialogRef.close(this.forecast);
  }

  updateTemperatureF(): void {
    this.forecast.temperatureF = Math.round((this.forecast.temperatureC * 9/5) + 32);
  }

  getTitle(): string {
    switch (this.mode) {
      case 'create':
        return 'Crear Pronóstico';
      case 'edit':
        return 'Editar Pronóstico';
      case 'view':
        return 'Ver Pronóstico';
      default:
        return '';
    }
  }
}
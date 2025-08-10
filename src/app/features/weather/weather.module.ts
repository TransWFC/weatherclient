import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForecastComponent } from './forecast/forecast.component';
import { ForecastDialogComponent } from './forecast-dialog/forecast-dialog.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [
    ForecastComponent,
    ForecastDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WeatherRoutingModule,
    MaterialModule
  ],
})
export class WeatherModule {}
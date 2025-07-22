import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForecastComponent } from './forecast/forecast.component';
import { WeatherRoutingModule } from './weather-routing.module';

@NgModule({
  declarations: [ForecastComponent],
  imports: [CommonModule, FormsModule, WeatherRoutingModule],
})
export class WeatherModule {}
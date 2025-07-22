import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnInit {
  forecast: any[] = [];

  constructor(private apiService: WeatherService) {}

  ngOnInit(): void {
    this.apiService.getForecast().subscribe(data => this.forecast = data);
  }
}

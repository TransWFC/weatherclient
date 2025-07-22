import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../../shared/constant/shared-constants';
import { WeatherForecast } from '../../shared/models/weather-forecast.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getForecast(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(
      API_URLS.WEATHER.FORECAST);
  }

  getForeCastById(id: number): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(
      API_URLS.WEATHER.FORECAST + "/GetWeatherForecastById/" + id);
  }

  deleteForecast(id: number): Observable<void> {
    return this.http.delete<void>(
      API_URLS.WEATHER.FORECAST + "/" + id);
  }

}
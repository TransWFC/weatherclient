export interface WeatherForecast {
    id?: number; // Optional for create operations
    date: Date;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
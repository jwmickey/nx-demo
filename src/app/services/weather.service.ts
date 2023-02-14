import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WeatherData {
  current: number;
  unit: 'F' | 'C';
  low?: number;
  lowTime?: string | Date;
  high?: number;
  highTime?: string | Date;
  weatherCode?: string;
  weatherDescription?: string;
  windDir: string;
  windDegree: string;
  windSpeedMph: string;
}

export interface WttrConditionResponse {
  current_condition: [
    {
      temp_F: string;
      weatherCode: string;
      weatherDesc: [
        {
          value: string;
        }
      ];
      winddir16Point: string;
      windspeedMiles: string;
      winddirDegree: string;
    }
  ];
  weather: [
    {
      avgtempC: string;
      avgtempF: string;
      date: string;
      maxtempC: string;
      maxtempF: string;
      mintempC: string;
      mintempF: string;
      sunHour: string;
      totalSnow_cm: string;
      uvIndex: string;
    }
  ];
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private client: HttpClient) {}

  getCurrentData(): Observable<WeatherData> {
    return this.client
      .get<WttrConditionResponse>('https://wttr.in/Raleigh+NC?format=j1')
      .pipe(
        map((raw) => {
          const data = raw.current_condition[0];
          return {
            current: parseFloat(data.temp_F),
            unit: 'F',
            weatherCode: data.weatherCode,
            weatherDescription: data.weatherDesc[0].value,
            windSpeedMph: data.windspeedMiles,
            windDir: data.winddir16Point,
            windDegree: data.winddirDegree,
            low: Number(raw.weather[0].mintempF),
            high: Number(raw.weather[0].maxtempF),
          };
        })
      );
  }
}

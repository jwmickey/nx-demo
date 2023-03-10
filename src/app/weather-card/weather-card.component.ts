import { Component } from '@angular/core';
import { WeatherData, WeatherService } from '../services/weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'nx-demo-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  tempData: Observable<WeatherData> = this.service.getCurrentData();

  constructor(private service: WeatherService) {}

  get theme(): string {
    const dateTheme = new Date().toISOString().substring(5, 10);
    let theme = `bg-theme-${dateTheme} `;

    const hour = new Date().getHours();
    if (hour >= 20 || hour < 7) {
      theme += 'bg-theme-night';
    } else if (hour >= 7 && hour < 10) {
      theme += 'bg-theme-morning';
    } else if (hour >= 10 && hour < 18) {
      theme += 'bg-theme-day';
    } else {
      theme += 'bg-theme-evening';
    }

    return theme;
  }

  toggleSettings() {
    console.log('TODO');
  }
}
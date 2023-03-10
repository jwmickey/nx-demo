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
    const hour = new Date().getHours();
    if (hour >= 20 || hour < 7) {
      return 'bg-theme-night';
    } else if (hour >= 7 && hour < 10) {
      return 'bg-theme-morning';
    } else if (hour >= 10 && hour < 18) {
      return 'bg-theme-day';
    } else {
      return 'bg-theme-evening';
    }
  }

  toggleSettings() {
    console.log('TODO');
  }
}

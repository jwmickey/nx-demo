import { Component } from '@angular/core';
import { WeatherData, WeatherService } from '../services/weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'nx-demo-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {
  tempData: Observable<WeatherData> = this.service.getCurrentData();

  constructor(private service: WeatherService) {}
}

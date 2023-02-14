import { Component, Input } from '@angular/core';
import { ICON_MAP, WWO_CODE, WEATHER_SYMBOL } from './weather-icon.constants';

enum IconType {
  emoji,
  icon,
}

@Component({
  selector: 'nx-demo-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss'],
})
export class WeatherIconComponent {
  @Input() weatherCode = '';
  @Input() iconType = IconType.icon;

  get weatherSymbol(): string {
    const index =
      this.weatherCode in WWO_CODE ? WWO_CODE[this.weatherCode] : 'Unknown';
    return WEATHER_SYMBOL[index];
  }

  get weatherIcon(): string {
    const index =
      this.weatherCode in WWO_CODE ? WWO_CODE[this.weatherCode] : 'Unknown';
    return ICON_MAP[index];
  }
}

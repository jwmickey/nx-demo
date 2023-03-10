import { WeatherCardComponent } from './weather-card.component';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';
import { WeatherService, WeatherData } from '../services/weather.service';
import { WeatherCardPO } from './weather-card.po';
import { Subject, Observable } from 'rxjs';

describe(WeatherCardComponent.name, () => {
  const mockCurrentData$: Subject<WeatherData> = new Subject();
  const { el: po } = new WeatherCardPO();

  beforeEach(() => {
    cy.mount(WeatherCardComponent, {
      declarations: [WeatherIconComponent],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getCurrentData: (): Observable<WeatherData> => mockCurrentData$,
          },
        },
      ],
      autoDetectChanges: true,
    });
  });

  it('renders', () => {
    mockCurrentData$.next({
      unit: 'F',
      current: 75,
      high: 80,
      low: 65,
      highTime: new Date().toLocaleString(),
      lowTime: new Date(Date.now() - 3600 * 4).toLocaleString(),
      weatherDescription: 'Rainy',
      weatherCode: '266',
      windDegree: '60',
      windSpeedMph: '4',
      windDir: 'n',
    });
    cy.detectChanges();
    po.currentTempNumber().should('contain.text', '75');
    po.currentTempUnit().should('contain.text', 'F');
    po.highTemp().should('contain.text', '80');
    po.lowTemp().should('contain.text', '65');
    po.root().matchImage();
  });

  it('renders without showing high/low info', () => {
    mockCurrentData$.next({
      unit: 'C',
      current: 20,
      highTime: new Date().toLocaleString(),
      lowTime: new Date(Date.now() - 3600 * 4).toLocaleString(),
      weatherCode: '266',
      windDegree: '60',
      windSpeedMph: '4',
      windDir: 'n',
    });
    cy.detectChanges();
    po.currentTempNumber().should('contain.text', '20');
    po.currentTempUnit().should('contain.text', 'C');
    po.highTemp().should('not.exist');
    po.lowTemp().should('not.exist');
    po.root().matchImage();
  });

  it('shows background theme based on time of day', () => {
    mockCurrentData$.next({
      unit: 'C',
      current: 20,
      highTime: new Date().toLocaleString(),
      lowTime: new Date(Date.now() - 3600 * 4).toLocaleString(),
      weatherCode: '266',
      windDegree: '60',
      windSpeedMph: '4',
      windDir: 'n',
    });

    [
      ['morning', 8],
      ['day', 12],
      ['evening', 19],
      ['night', 0]
    ].forEach(([ theme, hour ]) => {
      cy.clock().then(clock => {
        clock.setSystemTime(new Date().setHours(Number(hour)))
      });
      cy.detectChanges();
      po.root().should('have.class', `bg-theme-${theme}`);
    })
  });

  it('renders special themes', () => {
    mockCurrentData$.next({
      unit: 'F',
      current: 75,
      high: 80,
      low: 65,
      highTime: new Date().toLocaleString(),
      lowTime: new Date(Date.now() - 3600 * 4).toLocaleString(),
      weatherDescription: 'Rainy',
      weatherCode: '266',
      windDegree: '60',
      windSpeedMph: '4',
      windDir: 'n',
    });
    cy.clock().then(clock => {
      const mockDate = new Date();
      mockDate.setUTCMonth(2);
      mockDate.setUTCDate(17);
      clock.setSystemTime(mockDate);
    });
    cy.detectChanges();
    po.root().should('have.class', 'bg-theme-03-17');
    po.root().matchImage();
  });
});

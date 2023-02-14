export class WeatherCardPO {
    el = {
        currentTempNumber: () => cy.get('.current-temp .temp-number'),
        currentTempUnit: () => cy.get('.current-temp .temp-unit'),
        highTemp: () => cy.byData('high'),
        lowTemp: () => cy.byData('low'),
    }
}
import { selectors } from './selectors';
import { REQUEST_TIMEOUT } from './variables';

export function registerCommands() {
  Cypress.Commands.add('drawCards', () => {
    cy.get(selectors.drawButton).click();
    cy.get(selectors.card, { timeout: REQUEST_TIMEOUT }).should(
      'have.length',
      2
    );
  });

  Cypress.Commands.add('getCardTitles', () => {
    return cy.get(selectors.card).then(($cards) => {
      return $cards
        .map((_index, card) =>
          Cypress.$(card).find('mat-card-title').text().trim()
        )
        .get();
    });
  });
}

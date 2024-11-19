import { parseStrategicProperty } from '../support/helpers';
import { selectors } from '../support/selectors';
import { REQUEST_TIMEOUT, API_PATH } from '../support/variables';

describe('Board game test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Star Wars Game');
  });

  it('Displays empty game board with initial state and card placeholders', () => {
    cy.get(selectors.counter).contains('0 : 0');
    cy.get(selectors.cardPlaceholder).should('have.length', 2);
    cy.get(selectors.drawButton).should('exist');
  });

  it('Draws people by default and displays their properties, eg. mass property', () => {
    cy.drawCards();
    cy.get(selectors.card).each(($card) => {
      cy.wrap($card).find(selectors.mass).should('exist');
      cy.wrap($card).find(selectors.crew).should('not.exist');
    });
  });

  it('Switches resource type to draw starships and displays their properties, eg. crew property', () => {
    cy.get(selectors.starshipsSwitchButton).click();
    cy.drawCards();
    cy.get(selectors.card).each(($card) => {
      cy.wrap($card).find(selectors.crew).should('exist');
      cy.wrap($card).find(selectors.mass).should('not.exist');
    });
  });

  it('Draws cards and updates the score', () => {
    cy.drawCards();
    cy.get(selectors.counter).should('not.contain', '0 : 0');
    cy.get(selectors.card)
      .filter('.card--winner')
      .should('have.length.at.least', 1);
  });

  it('Updates the score after each draw', () => {
    cy.drawCards();
    cy.get(selectors.counter, { timeout: REQUEST_TIMEOUT })
      .eq(0)
      .invoke('text')
      .as('counterBefore');

    cy.get(selectors.drawButton).click();

    cy.get('@counterBefore').then((beforeCounter) => {
      cy.get(selectors.counter)
        .eq(0)
        .invoke('text')
        .should('not.equal', beforeCounter);
    });
  });

  it('Draws cards twice and verifies requests', () => {
    cy.intercept('GET', API_PATH).as('getCardData');

    cy.drawCards();
    cy.getCardTitles().as('firstDraw');

    cy.wait('@getCardData').its('response.statusCode').should('eq', 200);

    cy.drawCards();
    cy.getCardTitles().as('secondDraw');

    cy.wait('@getCardData').its('response.statusCode').should('eq', 200);

    cy.get('@getCardData.all').should('have.length', 4);

    cy.get('@firstDraw').then((firstDraw) => {
      cy.get('@secondDraw').then((secondDraw) => {
        if (firstDraw.toString() === secondDraw.toString()) {
          cy.log('The draw drew the same cards - correct behavior.');
        } else {
          cy.log('The draw drew different cards - correct behavior.');
        }
      });
    });
  });

  it('Assigns the proper class to the winning card', () => {
    cy.drawCards();
    cy.get(selectors.card).then(($cards) => {
      const masses = $cards
        .map((_index, card) => {
          const massText = Cypress.$(card)
            .find(selectors.massValue)
            .text()
            .trim();
          return parseStrategicProperty(massText);
        })
        .get();

      if (masses[0] > masses[1]) {
        cy.wrap($cards[0]).should('have.class', 'card--winner');
        cy.wrap($cards[1]).should('not.have.class', 'card--winner');
      } else if (masses[0] < masses[1]) {
        cy.wrap($cards[0]).should('not.have.class', 'card--winner');
        cy.wrap($cards[1]).should('have.class', 'card--winner');
      } else {
        cy.wrap($cards[0]).should('have.class', 'card--winner');
        cy.wrap($cards[1]).should('have.class', 'card--winner');
      }
    });
  });
});

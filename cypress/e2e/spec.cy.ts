describe('Board game test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Star Wars Game');
  });

  it('Sees empty game board with initial state and card placeholders', () => {
    cy.get('[data-test=counter]').contains('0 : 0');
    cy.get('[data-test=card-placeholder]').should('have.length', 2);
    cy.get('[data-test=draw-cards-button]').should('exist');
  });

  it('Starts the game by drawing cards and sees the result', () => {
    cy.wait(2000); // wait till init service
    cy.get('[data-test=draw-cards-button]').click();
    cy.get('[data-test=card]', { timeout: 2000 }).should('have.length', 2);
  });

  it('Starts the game, then draws cards again and again', () => {
    cy.wait(2000);
    cy.get('[data-test=draw-cards-button]').click();

    cy.get('[data-test=card]', { timeout: 2000 })
      .eq(0)
      .invoke('text')
      .as('cardLeftBefore');

    cy.get('[data-test=card]').eq(1).invoke('text').as('cardRightBefore');

    cy.get('[data-test=draw-cards-button]').click();
    cy.wait(2000);

    cy.get('@cardLeftBefore').then((beforeLeft) => {
      cy.get('[data-test=card]')
        .eq(0)
        .invoke('text')
        .should('not.equal', beforeLeft);
    });

    cy.get('@cardRightBefore').then((beforeRight) => {
      cy.get('[data-test=card]')
        .eq(1)
        .invoke('text')
        .should('not.equal', beforeRight);
    });
  });
});

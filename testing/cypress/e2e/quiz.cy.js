describe('Tech Quiz E2E Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should start the quiz when clicking the start button', () => {
    cy.contains('Start Quiz').click();

    cy.wait('@getQuestions');
    cy.get('h2').should('be.visible');
  });

  it('should allow answering all questions and completing the quiz', () => {
    cy.contains('Start Quiz').click();

    for (let i = 0; i < 4; i++) {
      cy.get('.btn-primary').first().click();
    }

    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Your score:').should('be.visible');
  });

  it('should allow restarting the quiz after completion', () => {
    cy.contains('Start Quiz').click();

    cy.intercept('GET', '/api/questions', {
      fixture: 'questions.json',
    }).as('getQuestions');

    cy.wait('@getQuestions');

    for (let i = 0; i < 4; i++) {
      cy.get('.btn-primary').first().click();
    }

    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Take New Quiz').click();
    cy.contains('Start Quiz').should('be.visible');
  });
});

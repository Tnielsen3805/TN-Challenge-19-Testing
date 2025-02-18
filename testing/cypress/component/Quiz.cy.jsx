import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  it('should render the start quiz button', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz when the start button is clicked', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();
  });

  it('should display a question once quiz starts', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();

    cy.get('h2').should('exist');
  });
});

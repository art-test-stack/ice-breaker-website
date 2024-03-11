describe('Game Page', () => {
    it('Tests if everything is in the game pages', () => {
      //access the homepage - have to run cypress and client for it to acess it
      cy.visit('http://localhost:5173/')

      //go to game page
      cy.get('[data-cy="game-card"]').should('exist').click()
      //check if game descripton exist
      cy.get('[data-cy="gameDescriptionBox"]').should('exist')

        //check if descriptionBox exisr
      cy.get('[data-cy="descriptionBox"]').should('exist')

      cy.get('[data-cy="gameTitle"]').should('exist')

      cy.get('[data-cy="greviewScoresSpan"]').should('exist')

      cy.get('[data-cy="everyReview"]').should('exist')

      cy.get('[data-cy="infoBox"]').should('exist')

      cy.get('[data-cy="Timer-box"]').should('exist')

      cy.get('[data-cy="saveButton"]').should('exist').click()

      cy.get('[data-cy="shareButton"]').should('exist')

      cy.get('[data-cy="reviewButton"]').should('exist').click()

      cy.get('[data-cy="reviewModal"]').should('exist')


      cy.get('[data-cy="closeModal"]').should('exist').click()

    })
  })
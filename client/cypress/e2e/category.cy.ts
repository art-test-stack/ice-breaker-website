describe('Category', () => {
    it('tests the function of the categories dropdown, the filtering function of it and that the elements shows up in game grid', () => {
      //access the homepage - have to run cypress and client for it to acess it
      cy.visit('http://localhost:5173/')

      //access the category dropdown
      cy.get('[data-cy="category"]').should('exist').click()

      //clicks on the category chill
      cy.get('[data-cy="Chill"]').click();

      //checks if the correct label appears
      cy.get('[data-cy="categoryLabel"]').contains('Chill');
      
      //checks the categories of the gamecard to be the same as the one chosen above
      cy.get('[data-cy="gameCardCategory"]').contains('Chill');
    })
  })
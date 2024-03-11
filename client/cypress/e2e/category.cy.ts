describe('Home page', () => {
    it('tests the function of the categories dropdown, the filtering function of it and that the elements shows up in game grid', () => {
      //access the homepage - have to run cypress and client for it to acess it
      cy.visit('http://localhost:5173/')

      //access the category dropdown
      cy.get('[data-cy="category"]').should('exist').click()

      cy.get('[data-cy="Chill"]').click();

      cy.get('[data-cy="categoryLabel"]').contains('Chill');

      cy.get('[data-cy="gameCardCategory"]').contains('Chill');
    })
  })
describe('Home page', () => {
    it('The webpage has home page elements: title, search bar, log-in, categories, create new game and a game grid', () => {
      //access the homepage - have to run cypress and client for it to acess it
      cy.visit('http://localhost:5173/')
  
      //access the title and see if it renders correctly
      cy.get('[data-cy="title"]').should('exist').should('have.length', 11)
  
      //access the homepage-title, see if it renders and contains the correct title
      cy.get('[data-cy="search"]').should('exist')

      //access the login button
      cy.get('[data-cy="login"]').should('exist')

      //access the category dropdown
      cy.get('[data-cy="category"]').should('exist')

      //access the the create game button
      cy.get('[data-cy="createNewGameButton"]').should('exist')

      // Wait for the game section to be visible
      cy.get('.gameSection').should('be.visible');

      // Check if at least one game item is rendered
      cy.get('[data-cy="game-grid"]').should('exist');
    })
  })
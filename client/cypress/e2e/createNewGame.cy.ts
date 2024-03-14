describe('create new game', () => {
    it('shows the line of functions for creating a new game,but will not be able to post one because it is not logged in', () => {
      //access the homepage - have to run cypress and client for it to acess it
      cy.visit('http://localhost:5173/')

      cy.get('[data-cy="createNewGameButton"]').should('exist').click()
          
        // Type in game name
        cy.get('[data-cy="GameNameField"]').type('Cypress Testing Game');

        // Type in game description
        cy.get('[data-cy="descriptionPrompt"]').type('A game to check if cypress does its proper testing');

        // Select equipment
        cy.get('[data-cy="inputBoxEquipment"]').click().type('Deck of cards{enter}');

        // Set player number slider
        cy.get('[data-cy="playerNumberSlider"]').click().trigger('change');

        // Set duration selector
        cy.get('[data-cy="Medium"]').click();

        // Add category
        cy.get('[data-cy="addCategoriesButton"]').click();

        cy.get('[data-cy="Chill"]').click();

        // Click publish button
        cy.get('[data-cy="publishButton"]').click();

        // Check if game creation is successful
        cy.on('window:alert', (str) => {
            expect(str).to.equal('You must be logged in to create a game!');
            });
        });
    });
    
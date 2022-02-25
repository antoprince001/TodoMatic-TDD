describe('Todolist tasks', () => {
  
    
    

    it('Create a new task', () => {
      cy.visit('http://localhost:3000');


      cy.get('[data-testid="messageText"]')
           .type('Test Todo');

      cy.get('[data-testid="addButton"]')
           .click();

      cy.get('[data-testid="todoTask"]')
            .should('have.value', '');
      
      cy.contains('Test Todo');
    })

    it('Toggle Task completed', () => {
      
      cy.contains('Test Todo')
        .parent()
        .find('input[type=checkbox]')
        .check()
      
    })

    it('Toggle Task not completed', () => {
      
      cy.contains('Test Todo')
        .parent()
        .find('input[type=checkbox]')
        .uncheck()
      
    })

    it('can filter for active tasks', () => {
      
      cy.contains('Active').click()

      cy.get('.todo-list li')
        .should('have.length', 3)

      cy.contains('Eat').should('not.exist')
      cy.contains('Sleep').should('exist')
      cy.contains('Repeat').should('exist')
      cy.contains('Test Todo').should('exist')



    })

    it('can filter for completed tasks', () => {
      
      cy.contains('Completed').click()

      cy.get('.todo-list li')
        .should('have.length', 1)

      cy.contains('Eat').should('exist')
      cy.contains('Sleep').should('not.exist')
      cy.contains('Repeat').should('not.exist')
      cy.contains('Test Todo').should('not.exist')

    })

    it('Edit a task', () => {
      
      cy.contains('All').click()

      cy.contains('Test Todo')
        .parent()
        .get('.edit')
        .contains('Edit Test Todo')
        .click()

      cy.get('[data-testid="editText"]')
        .type('Testing Todo');

      cy.get('[data-testid="editButton"]')
        .click();

      cy.contains('Testing Todo').should('exist')

    })
    it('Delete a task', () => {
      
      cy.contains('All').click()

      cy.contains('Testing Todo')
        .parent()
        .get('.btn__danger')
        .contains('Delete Testing Todo')
        .click()

      cy.get('.todo-list li')
        .should('have.length', 3)

      cy.contains('Testing Todo').should('not.exist')

    })


  });
Cypress.Commands.add('loginUsuarioValido' , () => {
    cy.get('input[type=name]').type('nepomucenoraiane@gmail.com',{force: true});
    cy.get('input[type=password]').type({force: true},123);
    cy.get('.otUnI').click({force: true});
   
})

Cypress.Commands.add('validaLoginSucesso' , () => {
    cy.get('.cCGrzy').should('contain','Sair');
})  

Cypress.Commands.add('loginUsuarioInvalido' , () => {
    cy.get('input[type=name]').type('teste@gmail.com',{force: true});
    cy.get('input[type=password]').type({force: true},123);
    cy.get('.otUnI').click({force: true});
   
})
Cypress.Commands.add('validaLoginInvalido' , () => {
    cy.get('#modalText').should('contain','Usuário ou senha inválido. Tente novamente ou verifique suas informações!');
})
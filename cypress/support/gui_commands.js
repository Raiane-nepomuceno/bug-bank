const { faker } = require('@faker-js/faker');
var listaUsuarios = [];
var listaUsuariosTeste = [];

Cypress.Commands.add('novoUsuario', (saldo) => {

    const email = faker.internet.email();
    const nome = faker.name.fullName(); 
    const senha = faker.random.word(3) + faker.random.numeric(4);

    cy.contains('button', 'Registrar').click();   
    cy.get('input[type="email"]').eq(1).type(email, {force: true});
    cy.get('input[type="name"]').eq(0).type(nome, {force: true});
    cy.get('input[type="password"]').eq(1).type(senha, {force: true,log:false});
    cy.get('input[type="password"]').eq(2).type(senha, {force: true,log:false});
    
    if(saldo == false)
    {   
        cy.get('button[type="submit"]').last().click({force: true});
        cy.get('#modalText').should('be.visible');
        cy.salvarUsuarioCadastrado(email, nome, senha, saldo);
        cy.get('#btnCloseModal').click();
    }
    else{
        cy.get('#toggleAddBalance').click({force: true});
        cy.get('button[type="submit"]').last().click({force: true});
        cy.get('#modalText').should('be.visible');
        cy.salvarUsuarioCadastrado(email, nome, senha, saldo);
        cy.get('#btnCloseModal').click(); 
         
      }
})
Cypress.Commands.add('verificacaoNomeCampos', () => {
    cy.contains('button', 'Registrar').first().click(); 
    
    cy.get('#btnBackButton').should('contain', 'Voltar ao login');
    cy.get('label[for=email]').should('contain','E-mail');
    cy.get('label[for=name]').should('contain','Nome');
    cy.get('label[for=password]').should('contain','Senha');
    cy.get('label[for=passwordConfirmation]').should('contain','Confirmação senha');
    cy.get('.eZmSOs').should('contain','Criar conta com saldo ?');
    cy.get('#toggleAddBalance').click({force: true});
    cy.get('button[type="submit"]').should('contain', 'Cadastrar');

})
Cypress.Commands.add('vericacaoBannerCadastro', () => {
        cy.contains('button', 'Registrar').first().click(); 
        cy.get('[src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbugbank.ede6fc83.png&w=640&q=75"]').should('be.visible');
        cy.get('.pages__Title-sc-1ee1f2s-4').should('contain', 'O banco com bugs e falhas do seu jeito');
        cy.get('.pages__Text-sc-1ee1f2s-5').should('contain','Faça transferências e pagamentos com bugs e pratique testes com sucesso em um cenário quase real!');   
    })
    
Cypress.Commands.add('validacaoCamposVazios', () => {
    cy.contains('button', 'Registrar').first().click();        
    cy.get('button[type="submit"]').last().click({force: true});
    console.log(cy.get('.input__warging'))

    //CAMPO EMAIL
    cy.get('.input__warging').eq(2).contains("É campo obrigatório");
    
    //CAMPO SENHA
    cy.get('.input__warging').eq(4).contains("É campo obrigatório");
    
    //CAMPO CONFIRMAÇÃO SENHA
    cy.get('.input__warging').eq(5).contains("É campo obrigatório");
    
    //CAMPO NOME não aparece
    cy.get('.input__warging').eq(3).contains("É campo obrigatório");

})

Cypress.Commands.add('verificacaoDoPlaceholder', () => {
    cy.contains('button', 'Registrar').first().click();        

    cy.get('input[type=email]').invoke('attr','placeholder').should('contain','Informe seu e-mail');
    cy.get('input[type=name]').invoke('attr','placeholder').should('contain','Informe seu Nome');
    cy.get('input[type=password]').invoke('attr','placeholder').should('contain','Informe sua senha');
    cy.get('input[name=passwordConfirmation]').invoke('attr','placeholder').should('contain','Informe a confirmação da senha');

})
Cypress.Commands.add('' , () => {

})
    Cypress.Commands.add('salvarUsuarioCadastrado', (email, nome, senha, saldo) => {
    var json = {};
    cy
    .fixture('usuariosCadastrados')
    .then(user =>{
        user.forEach( u => listaUsuarios.push(u));
     })

    json.email = email;
    json.nome = nome;
    json.senha = senha;
    json.saldo = saldo;
    
   if(json != null)
    listaUsuarios.push({...json});
    cy.writeFile('cypress/fixtures/usuariosCadastrados.json', JSON.stringify(listaUsuarios));
    
})

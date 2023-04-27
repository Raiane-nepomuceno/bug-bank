const { faker } = require('@faker-js/faker');

class CadastroPage{
    constructor(){
        this.listaUsuarios = []
    }
    elements = {
        emailInput: () => cy.get("input[type=email]"),
        nameInput: () => cy.get("input[type=name]"),
        passwordInput: () => cy.get("input[type=password]"),
        registerBtn: () => cy.get('.otUnI'),
        loginBtn: () =>  cy.contains('button', 'Registrar'),
        submitBtn: () => cy.get('button[type="submit"]'),
        modalSucessRegister: () =>  cy.get('#modalText'),
        modalBtnCloseModal: () => cy.get('#btnCloseModal'),
        toggleAddBalance: () => cy.get('#toggleAddBalance'),

    };
    enterURL(){
        cy.visit('/');
     }

     saveUser(email, nome, password, saldo){
        var json = {};
            cy
             .fixture('usuariosCadastrados')
             .then(user =>{
                user.forEach( u => this.listaUsuarios.push(u));
             })
        
            json.email = email;
            json.nome = nome;
            json.senha = password;
            json.saldo = saldo;
            
           if(json != null)
            this.listaUsuarios.push({...json});
            cy.writeFile('cypress/fixtures/usuariosCadastrados.json', JSON.stringify(this.listaUsuarios));
           
        
    }
    registerUserValidNoBalance(){
        this.elements.submitBtn().last().click({force: true} );
        this.elements.modalSucessRegister().should('be.visible');
        this.elements.modalBtnCloseModal().click();

    }
    registerUserValidWithBalance(){
        this.elements.toggleAddBalance().click({force: true});
        this.elements.submitBtn().last().click({force: true});
        this.elements.modalSucessRegister().should('be.visible');
        this.elements.modalBtnCloseModal().click();
    }


    registerUser(saldo){
        const email = faker.internet.email();
        const nome = faker.name.fullName(); 
        const senha = faker.random.word(3) + faker.random.numeric(4);
        var json = {};

        this.elements.registerBtn().click({force: true});

        this.elements.emailInput().eq(1).type(email, {force:true});
        this.elements.nameInput().eq(0).type(nome, {force: true});
        this.elements.passwordInput().eq(1).type(senha, {force: true,log:false});
        this.elements.passwordInput().eq(2).type(senha, {force: true,log:false});

        if(saldo == false){
            this.registerUserValidNoBalance();
            this.saveUser(email, nome, senha, saldo);
            json.email = email;
            json.senha = senha;
            return JSON.stringify(json);
        }
        else{
            this.registerUserValidWithBalance();
            this.saveUser(email, nome, senha, saldo);
            json.email = email;
            json.senha = senha;
            return JSON.stringify(json);

        }

    }
    registerUser(saldo,nome,email,senha){
        this.elements.registerBtn().click({force: true});

        this.elements.emailInput().eq(1).type(email, {force:true});
        this.elements.nameInput().eq(0).type(nome, {force: true});
        this.elements.passwordInput().eq(1).type(senha, {force: true,log:false});
        this.elements.passwordInput().eq(2).type(senha, {force: true,log:false});

        if(saldo == false){
            this.registerUserValidNoBalance();
            //this.saveUser(email, nome, senha, saldo);
            //json.email = email;
            //json.senha = senha;
            //return JSON.stringify(json);
        }
        else{
            this.registerUserValidWithBalance();
            //this.saveUser(email, nome, senha, saldo);
            /*json.email = email;
            json.senha = senha;
            return JSON.stringify(json);*/

        }
    }
    clearInputs(){
        this.elements.emailInput().eq(1).clear({force: true});
        this.elements.nameInput().eq(0).clear({force: true});
        this.elements.passwordInput().eq(1).clear({force: true});
        this.elements.passwordInput().eq(2).clear({force: true});
        this.elements.toggleAddBalance().click({force: true});
    }
    
    }
    export const cadastroPage = new CadastroPage();

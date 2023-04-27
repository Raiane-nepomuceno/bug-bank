import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor"
import {loginPage} from "../pages/LoginPage"
import {cadastroPage} from "../pages/CadastroPage"
import { homePage } from "../pages/HomePage";
const { faker } = require('@faker-js/faker');
import { extratoPage } from "../pages/ExtratoPage";
var user,user2 = {};

/*Given(/^que o usuário faça o cadastro$/, () => {
    cadastroPage.enterURL();
	user = JSON.parse(cadastroPage.registerUser(true));

	cadastroPage.clearInputs();
	
	user2 = JSON.parse(cadastroPage.registerUser(true));
});

Then(/^o usuário será logado ao sistema$/, () => {
	
	//Primeiro cadastro
	loginPage.returnRegister();
	loginPage.loginUsuarioValido(user.email, user.senha);
	homePage.getAccountNumber();

	homePage.logoutUser();

	//Segundo cadastro
	loginPage.returnRegister();

	loginPage.loginUsuarioValido(user2.email, user2.senha);
	homePage.getAccountNumber();

});

Then(/^o usuário com saldo preencher os campos válidos <num_conta,digito,descr>$/, () => {
	homePage.clickBtnTransferencia();
	transferenciaPage.transferenciaValida();  
});
*/

Given("que o usuário está na tela de transferência", () => {
  cy.visit("https://bugbank.netlify.app/transfer");
  cadastroPage.registerUser(true,"teste","teste@gmail.com",123);
  loginPage.loginUsuarioValido("teste@gmail.com",123);
});
When("o usuário informar {string},{string}",(valorTransf, descr) => {
	switch (valorTransf) {
		case '0':
			homePage.clickBtnTransferencia();
			cy.get('input[type=accountNumber]').type(faker.random.numeric(3));
			cy.get('input[type=digit]').type(faker.random.numeric(1));
			break;

		case '0,01':
			homePage.getAccountNumber();
			break;
       case '1':
			homePage.getAccountNumber();
			break;
	   //case '10':
	//break;
	
	}
	cy.wait(500);
    cy.get('input[type=transferValue]').type(valorTransf);
    cy.get('input[type=description]').type(descr);
    cy.contains('button', 'Transferir agora').click();
});

Then("o usuário deverá ver a {string}", (mensagem) => {
	cy.wait(1000);
	cy.get('#modalText').should("have.text", mensagem);
});
 
Then(
  "o saldo da conta de origem deve ser atualizado para {string}",
  (saldo) => {
    cy.get("#balance_display").should("have.text", saldo);
  }
);

Then(
  "o saldo da conta de destino deve ser atualizado para {string}",
  (saldo) => {
    cy.get("#destination_balance_display").should("have.text", saldo);
  }
);


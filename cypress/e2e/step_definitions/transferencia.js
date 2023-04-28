import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor"
import {loginPage} from "../pages/LoginPage"
import {cadastroPage} from "../pages/CadastroPage"
import { homePage } from "../pages/HomePage";
import { extratoPage } from "../pages/ExtratoPage";
import {transferenciaPage} from "../pages/TransferenciaPage";
const { faker } = require('@faker-js/faker');

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
			cy.log("Validação de usuário inválido e valor inválido igual a 0");
			homePage.clickBtnTransferencia();
			cy.get('input[type=accountNumber]').type(faker.random.numeric(3));
			cy.get('input[type=digit]').type(faker.random.numeric(1));
			break;

		case '-1':
				cy.log("Validação de usuário e valor inválido igual a -1");
				homePage.clickBtnTransferencia();
				cy.get('input[type=accountNumber]').type(faker.random.numeric(3));
				cy.get('input[type=digit]').type(faker.random.numeric(1));
				break;

		case '11':
				cy.log("Validação de usuário inválido e valor válido");
				homePage.clickBtnTransferencia();
				cy.get('input[type=accountNumber]').type(faker.random.numeric(3));
				cy.get('input[type=digit]').type(faker.random.numeric(1));
				break;

	    case '1.000,01':
				cy.log("Validação de usuário inválido e valor válido");
				homePage.clickBtnTransferencia();
				cy.get('input[type=accountNumber]').type(" ");
				cy.get('input[type=digit]').type(" ");
				break;

		case '0.01':
		    cy.log("Validação de envio para o próprio usuário (o mesmo titular da conta)");
			cy.log("Validação de usuário inválido");
			homePage.getAccountNumber();
			break;

       case '1':
		    cy.log("Validação de envio para o próprio usuário (o mesmo titular da conta)");
			homePage.getAccountNumber();
			break;

	   case '10':
		    cy.log("Validação de envio para outro usuário diferente do titular da conta");
			cy.log("Acessando a conta do primeiro usuário");
		    homePage.getAccount();
			loginPage.logout();

			cy.log("Registrando o segundo usuário");
			cadastroPage.registerUser(true,"teste","teste2@gmail.com",123);
			loginPage.loginUsuarioValido("teste2@gmail.com",123);

			cy.log("Acessando o extrato antes da transferência");
			extratoPage.getBalanceAvailable();
		
			homePage.clickBtnTransferencia();

			cy.log("Inserindo os dados bancários do primeiro usuario");
			var dadosBancarios = {};
			transferenciaPage.tranferOtherUser().then((jsonString) => {
			  dadosBancarios = JSON.parse(jsonString);	
			  cy.get('input[type=accountNumber]').type(dadosBancarios.numConta);
			  cy.get('input[type=digit]').type(dadosBancarios.digito);
			});
			break;	
		case '1.05':
			cy.log("Validação de envio para outro usuário diferente do titular da conta");
			cy.log("Acessando a conta do primeiro usuário");
		    homePage.getAccount();
			loginPage.logout();

			cy.log("Registrando o segundo usuário");
			cadastroPage.registerUser(true,"teste","teste2@gmail.com",123);
			loginPage.loginUsuarioValido("teste2@gmail.com",123);

			cy.log("Acessando o extrato antes da transferência");
			extratoPage.getBalanceAvailable();
		
			homePage.clickBtnTransferencia();

			cy.log("Inserindo os dados bancários do primeiro usuario");
			var dadosBancarios = {};
			transferenciaPage.tranferOtherUser().then((jsonString) => {
			  dadosBancarios = JSON.parse(jsonString);	
			  cy.get('input[type=accountNumber]').type(dadosBancarios.numConta);
			  cy.get('input[type=digit]').type(dadosBancarios.digito);
			});
			break;	 	
	}
	cy.wait(500);
    cy.get('input[type=transferValue]').type(valorTransf);
    cy.get('input[type=description]').type(descr);
    cy.contains('button', 'Transferir agora').click();

});

Then("o usuário deverá ver a {string}", (mensagem) => {
	cy.wait(1000);
	cy.get('#modalText').should("have.text", mensagem);
	switch (mensagem) {
		case 'Transferencia realizada com sucesso':
			extratoPage.compararSaldoAtualInicialValorEnviado();
			loginPage.logout();
			loginPage.loginUsuarioValido("teste@gmail.com",123);
			extratoPage.compararSaldoAtualInicialValorRecebido();
			break;
	};
});
 
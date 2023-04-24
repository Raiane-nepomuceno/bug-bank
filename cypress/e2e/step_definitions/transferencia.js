import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor"
import {loginPage} from "../pages/LoginPage"
import {cadastroPage} from "../pages/CadastroPage"
import { homePage } from "../pages/HomePage";
import { transferenciaPage } from "../pages/TransferenciaPage";
var user,user2 = {};

Given(/^que o usuário faça o cadastro$/, () => {
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

When(/^o usuário informar o valor_transf <0,01; 100 mil reais; um milhão de reais$/, () => {
	return true;
});

Then(/^o usuário deverá conseguir transferir com sucesso$/, () => {
	return true;
});



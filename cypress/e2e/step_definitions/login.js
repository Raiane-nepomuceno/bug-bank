import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor"
import {loginPage} from "../pages/LoginPage"

Given(/^Que o usuario esteja na tela Login$/, () => {
	loginPage.enterURL();
});

When(/^O usuario preencher corretamente os campos email e senha$/, () => {
	loginPage.loginUsuarioValido();
});

Then(/^O usuario será logado com sucesso$/, () => {
	loginPage.validaLoginSucesso();
});






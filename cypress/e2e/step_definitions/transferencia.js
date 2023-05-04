import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor"
import { homePage } from "../pages/HomePage";
import {transferenciaPage} from "../pages/TransferenciaPage";

Given("que o usuário está na tela de transferência", () => {
  homePage.acessPageTransfer();
  transferenciaPage.cadastroLoginUser1();

});
When("o usuário informar {string},{string}",(valorTransf, descr) => {
	transferenciaPage.verificacaoValorTransf(valorTransf, descr);
});

Then("o usuário deverá ver a {string}", (mensagem) => {
	transferenciaPage.verificacaoMensa(mensagem);
});
 
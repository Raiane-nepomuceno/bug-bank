import { transferenciaPage } from "../pages/TransferenciaPage";
import {extratoPage} from "../pages/ExtratoPage";
import 'cypress-wait-until';
class HomePage{
    constructor(){
        this.listaContas = [];
    }
    elements = {
        btnLogout:() => cy.get('.home__ContainerLink-sc-1auj767-2'),
        btnTransferencia:() => cy.get('#btn-TRANSFERÊNCIA'), 
        btnExtrato:() => cy.get('#btn-EXTRATO'),

    };
     acessPageTransfer(){
        cy.visit("https://bugbank.netlify.app/transfer");
     }
     logoutUser(){
        this.elements.btnLogout().click({force: true});
       }   
    getAccountNumber() {
      cy.waitUntil(() =>cy.get('#textAccountNumber > span').should('be.visible'))
            .invoke("text")
            .then((text) => {
                cy.log("Text", text);
                this.inputDataAccount(text);
          });
    }
    getAccount() {
      cy.waitUntil(() =>cy.get('#textAccountNumber > span').should('be.visible'))
                .invoke("text")
                .then((text) => {
                cy.log("Text", text);
                this.saveLastAccountNumber(text);
        //return text;
        });

}
saveLastAccountNumber(conta){
    var json = {};

    if(conta != null)
        json.numeroConta = conta.split('-', 2)[0];
        json.digito = conta.split('-', 2)[1];
        if(json != null)
            this.listaContas.push({...json});
            cy.writeFile('cypress/fixtures/ultimaContaAcessada.json', JSON.stringify(this.listaContas));
}

    saveAccountNumber(conta){
        
        var json = {};
            cy
             .fixture('contasCadastradas')
             .then(conta =>{
                conta.forEach( u => this.listaContas.push(u));
             })
        
            if(conta != null)
                json.numeroConta = conta.split('-', 2)[0];
                json.digito = conta.split('-', 2)[1];
                if(json != null)
                    this.listaContas.push({...json});
                    cy.writeFile('cypress/fixtures/contasCadastradas.json', JSON.stringify(this.listaContas));
    }
    clickBtnExtrato(){
        this.elements.btnExtrato().click({force:true});
        extratoPage.getBalanceAvailable();

    }
    clickBtnTransferencia(){
        this.elements.btnTransferencia().click({force: true});
    }
    inputDataAccount(textoCaptado){
        this.clickBtnTransferencia();
        transferenciaPage.inputDataAccount(textoCaptado);
    }

 }
 export const homePage = new HomePage();
 
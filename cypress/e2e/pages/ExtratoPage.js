import { homePage } from "./HomePage";
import { transferenciaPage } from "./TransferenciaPage";
import 'cypress-wait-until';

class ExtratoPage{

  constructor(){
    this.saldoInicial;
    this.saldoAtual;
}

    elements = {
        textBalanceAvailable:() => cy.get('#textBalanceAvailable'),
    }
    getBalanceAvailable() {
      cy.waitUntil(() =>cy.get('#textBalance > span').should('be.visible'))
         .invoke("text")
            .then((text) => {
              cy.log("Saldo Inicial", text.slice(2));
              this.setSaldoInicial(text.slice(2));
            });
          }
          
      getBalanceAvailableCurrent() {
        
        cy.waitUntil(() =>cy.get('.bank-statement__ContainerTransaction-sc-7n8vh8-12 > :nth-child(1)').should('be.visible'))
          .get('#textBalanceAvailable')
          .should('be.visible')
          .invoke('text')
          .then((text) => {
            cy.log('Saldo Atual', text.slice(2));
            this.setSaldoAtual(text.slice(2));
          });
      }
           compararSaldoAtualInicialValorRecebido(){
        this.clickBtnExtrato();
        
        this.getBalanceAvailableCurrent();
        this.obtainedCalculation().then((saldo) => {
          console.log("saldo:"+saldo);
          expect(saldo).to.equal(1010);
        });


      }
      compararSaldoAtualInicialValorEnviado(){
        this.clickBtnBack();
        this.clickBtnExtrato();
        
        this.getBalanceAvailableCurrent();
        this.verification();

      }
      stringToFloat(str) {
        return parseFloat(str.replace(/\./g, '').replace(',', '.'));
      }
      
      verification() {
        this.obtainedCalculation().then((saldo) => {
          expect(saldo).to.equal(990);
        });
      }
            
      obtainedCalculation() {
        //saldo obtido
        return cy.waitUntil(() => cy.get('#textBalanceAvailable').should('be.visible'))
        .then(() => {
    
          const saldoStr = this.getSaldoAtual().replace(/\s/g, '');
          console.log("saldo atual:", saldoStr);
                
          const saldoFloat = this.stringToFloat(saldoStr);
          console.log("saldo atual convertido:", saldoFloat);
          return saldoFloat;
        });
      }
                  
    setSaldoInicial(saldo){
      this.saldoInicial = saldo;
    } 
    setSaldoAtual(saldo){
      this.saldoAtual = saldo;
    } 

    getSaldoInicial()
    {
      //console.log("saldo inicial:"+this.saldoAtual);
      return this.saldoInicial;
    }

    getSaldoAtual() {
      return this.saldoAtual.replace(/\s/g, "");
    }
    
    clickBtnBack(){
      cy.get('#btnBack').click({force:true});     

    }
    clickBtnExtrato(){
      cy.get('#btn-EXTRATO').click();
    }

}
export const extratoPage = new ExtratoPage();
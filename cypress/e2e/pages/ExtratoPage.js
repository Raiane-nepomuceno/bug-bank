import { transferenciaPage } from "../pages/TransferenciaPage";

class ExtratoPage{

  constructor(){
    this.saldoInicial;
    this.saldoAtual;
}

    elements = {
        textBalanceAvailable:() => cy.get('#textBalanceAvailable'),
    }
    getBalanceAvailable() {
        cy.wait(1000);
        cy.get('#textBalance > span')
          .invoke("text")
          .then((text) => {
            cy.log("Saldo Inicial", text);
            this.setSaldoInicial(text.slice(2));
          });
      }
    getBalanceAvailableCurrent(){
      cy.wait(1000);
      cy.get('#textBalanceAvailable')
        .invoke("text")
        .then((text) => {
            cy.log("Saldo Atual", text);
            this.setSaldoAtual(text.slice(2));
        })

      }
      updateSaldoAtual(){
        this.clickBtnBack();
        this.clickBtnExtrato();
        
        this.getBalanceAvailableCurrent();
        this.verification();

      }
      verification() {
        this.obtainedCalculation().then((saldo) => {
          expect(saldo).to.equal(990);
        });
      }
            
      obtainedCalculation() {
        //saldo obtido
        return cy.wait(1000).then(() => {
          //console.log("saldo atual:" + this.getSaldoAtual());
          const saldoStr = this.getSaldoAtual().replace(',', '.'); // substitui ',' por '.'
          return parseFloat(saldoStr);
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

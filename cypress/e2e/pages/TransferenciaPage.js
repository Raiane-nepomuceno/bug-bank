import { size } from "cypress/types/lodash";

class TranferenciaPage{
    constructor(){
        this.listaContas = []
    }

    elements = {
       
        numberAccountlInput: () => cy.get("input[type=accountNumber]"),
        digitAccountInput: () => cy.get("input[type=digit]"),
        valueTransferInput:() => cy.get("input[type=transferValue]"),
        description:() => cy.get("input[type=description]"),
        transferBtn: () =>  cy.contains('button', 'Transferir agora'),

    };
   transferenciaValida(){
    this.resultJSONAccount(); // listagens dos dois ultimos
     
   }
   resultJSONAccount(){
    var lastAccountsArray = [];
    var sizeArray = 0;
    cy
     .fixture('contasCadastradas')
     .then(user =>{
        user.forEach( u => this.listaContas.push(u));
     })
    
     sizeArray = this.listaContas.length;

     console.log("nova versão");
     console.log("lista contas"+this.listaContas);
     console.log(this.listaContas.indexOf([sizeArray - 1]));
     
   }
 }
 export const transferenciaPage = new TranferenciaPage();
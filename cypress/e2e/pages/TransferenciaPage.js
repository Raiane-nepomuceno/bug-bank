const { faker } = require('@faker-js/faker');

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
    preencherDadosTransferencia(numConta, digito, valorTransf, descr){
        this.elements.numberAccountlInput().type(numConta);
        this.elements.digitAccountInput().type(digito);
        this.elements.valueTransferInput().type(valorTransf);
        this.elements.description().type(descr);
        this.elements.transferBtn().click();
    }
   transferenciaValida(){
    var json = {};
    json =  JSON.parse(this.resultJSONAccount()); // listagens do ultimo ultimos
    console.log("transfer"+json);
    //this.inputDataAccount(json);
    //console.log(json) 
   }
   inputDataAccount(account){
    var json = {};

    json.numeroConta = account.split('-', 2)[0];
    json.digito = account.split('-', 2)[1];

    //console.log("funcao inputDataAccpunt");
    
    this.elements.numberAccountlInput().type(json.numeroConta,{force:true});
    this.elements.digitAccountInput().type(json.digito, {force:true});
   }
   resultJSONAccount(){
    let index = 0;
    let json = {};
        cy
          .fixture('contasCadastradas')
          .then(account =>{

            index = account.length;     
            json.numeroConta = account[index - 1].numeroConta;
            json.digito =  account[index - 1].digito;  
        })
        //console.log(array)
        return JSON.stringify(json);
     
   }
 }
 export const transferenciaPage = new TranferenciaPage();
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
   transferenciaValida(){
    var json = {};
    json =  JSON.parse(this.resultJSONAccount()); // listagens do ultimo ultimos
    console.log("transfer"+json);
    //this.inputDataAccount(json);
    //console.log(json) 
   }
   inputDataAccount(account){
    const numeroConta = account.numeroConta;
    const digito = account.digito;

    const valueTranfer = faker.finance.amount;
    const description = faker.finance.accountName;

    console.log(numeroConta);
    console.log(digito);
    //this.elements.numberAccountlInput().type(account.numeroConta,{force:true});
    /*this.elements.digitAccountInput().type(account.digito, {force:true});
    this.elements.valueTransferInput().type(valueTranfer, {force:true})
    this.elements.description().type(description, {force:true});
    this.elements.transferBtn().click({force:true});*/
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
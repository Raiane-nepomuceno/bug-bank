const { faker } = require('@faker-js/faker');
import {homePage} from "../pages/HomePage";
import {cadastroPage} from "../pages/CadastroPage";
import {loginPage} from "../pages/LoginPage";
import {extratoPage } from "./ExtratoPage";

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
        closeBtnModal:() => cy.get('#btnCloseModal'),
    };
    verificacaoMensa(mensagem){
      cy.get('#modalText')
      .should('be.visible')
      .should("have.text", mensagem);
     switch (mensagem) {
       case 'Transferencia realizada com sucesso':
         extratoPage.compararSaldoAtualInicialValorEnviado();
         loginPage.logout();
         loginPage.loginUsuarioValidoUser1();
         extratoPage.compararSaldoAtualInicialValorRecebido();
         break;
     };
   
    }
    verificacaoValorTransf(valorTransf, descr){

      switch (valorTransf) {
        case '0':
          cy.log("Validação de usuário inválido e valor inválido igual a 0");
          homePage.clickBtnTransferencia();
          this.inputDataAccountRandom();
          break;
    
        case '-1':
            cy.log("Validação de usuário e valor inválido igual a -1");
            homePage.clickBtnTransferencia();
            this.inputDataAccountRandom();
            break;
    
        case '11':
            cy.log("Validação de usuário inválido e valor válido");
            homePage.clickBtnTransferencia();
            this.inputDataAccountRandom();
            break;
    
          case '1.000,01':
            cy.log("Validação de usuário inválido e valor válido");
            homePage.clickBtnTransferencia();
            this.inputDataAccountNull();
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
            this.cadastroLoginUser2();

      
            cy.log("Acessando o extrato antes da transferência");
            extratoPage.getBalanceAvailable();
          
            homePage.clickBtnTransferencia();
      
            cy.log("Inserindo os dados bancários do primeiro usuario");
            this.inputDataAccountSecondAccount();
            break;	

        case '1.05':
          cy.log("Validação de envio para outro usuário diferente do titular da conta");
          cy.log("Acessando a conta do primeiro usuário");
          homePage.getAccount();
          loginPage.logout();
    
          cy.log("Registrando o segundo usuário");
          this.cadastroLoginUser2();
    
          cy.log("Acessando o extrato antes da transferência");
          extratoPage.getBalanceAvailable();
          homePage.clickBtnTransferencia();
    
          cy.log("Inserindo os dados bancários do primeiro usuario");
          this.inputDataAccountSecondAccount();
          break;	 	
      }
        this.inputTransferValue(valorTransf);
        this.inputDescription(descr);
        this.clickTransferBtnNow();

    }
    cadastroLoginUser1(){
      var json = {};
        cy
      .fixture('usuariosCadastrados')
      .then( usuario => {
        json.nome = usuario[0].nome;
        json.saldo = usuario[0].saldo;
        json.email = usuario[0].email;
        json.senha = usuario[0].senha;
              
        cadastroPage.registerUser(json.saldo,json.nome,json.email,json.senha);
        loginPage.loginUsuarioValido(json.email,json.senha);
  
    })
  }
  
  
    cadastroLoginUser2(){
    var json = {};
      cy
    .fixture('usuariosCadastrados')
    .then( usuario => {
      json.nome = usuario[1].nome;
      json.saldo = usuario[1].saldo;
      json.email = usuario[1].email;
      json.senha = usuario[1].senha;
            
      cadastroPage.registerUser(json.saldo,json.nome,json.email,json.senha);
      loginPage.loginUsuarioValido(json.email,json.senha);

  })

    }
    clickTransferBtnNow(){
      cy.contains('button', 'Transferir agora').click();

    }
    inputTransferValue(valorTransf){
       this.elements.valueTransferInput().type(valorTransf);
    }
    inputDescription(descr){
      this.elements.description().type(descr);
    }
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

   }
   inputDataAccount(account){
    var json = {};
    json.numeroConta = account.split('-', 2)[0];
    json.digito = account.split('-', 2)[1];

    
    this.elements.numberAccountlInput().type(json.numeroConta,{force:true});
    this.elements.digitAccountInput().type(json.digito, {force:true});
   }
   inputDataAccountSecondAccount() {
    transferenciaPage.tranferOtherUser().then((dadosBancarios) => {
      // Dados bancários já estão no formato correto (json com numConta e digito)
  
      cy.get('input[type=accountNumber]')
        .type(dadosBancarios.numConta)  // Digita o número da conta
        .should('have.value', dadosBancarios.numConta); // Verifica se o valor foi inserido
  
      cy.get('input[type=digit]')
        .type(dadosBancarios.digito)  // Digita o dígito
        .should('have.value', dadosBancarios.digito); // Verifica se o valor foi inserido
  
      cy.log('type=accountNumber', dadosBancarios.numConta);
      cy.log('type=digit', dadosBancarios.digito);
    });
  }
      
        inputDataAccountNull(){
    this.elements.numberAccountlInput().type(" ");
    this.elements.digitAccountInput().type(" ");

   }
   inputDataAccountRandom(){
    this.elements.numberAccountlInput().type(faker.random.numeric(3));
    this.elements.digitAccountInput().type(faker.random.numeric(1));
   }
   resultJSONAccount(){
    let index = 0;
    let json = {};
        cy
          .fixture('contasCadastradas')
          .then(account =>{

            index = account.length;     
            json.numeroConta = account[index - 1].numeroConta;
            json.digito = account[index - 1].digito;  
        })
        return JSON.stringify(json);
     
   }
   tranferOtherUser() {
    return cy.fixture('ultimaContaAcessada').then((account) => {
      // Extraindo os dados da fixture
      const json = {
        numConta: account[0].numeroConta,
        digito: account[0].digito
      };
  
      // Retorna o objeto com os dados
      return json;
    });
  }
    
    closeModalTransfer(){
        this.elements.closeBtnModal().click();
    }
       }
 export const transferenciaPage = new TranferenciaPage();
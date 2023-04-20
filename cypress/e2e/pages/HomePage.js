class HomePage{
    constructor(){
        this.listaContas = []
    }
    elements = {
        btnLogout:() => cy.get('.home__ContainerLink-sc-1auj767-2'),
        btnTransferencia:() => cy.get('#btn-TRANSFERÊNCIA'), 
    };

     logoutUser(){
        this.elements.btnLogout().click({force: true});
       }
      
     getAccountNumber() {
        cy.wait(1000);
        cy.get("#textAccountNumber > span")
              .invoke("text")
                 .then((text) => {
                    cy.log("Text",text).then(() =>{
                        this.saveAccountNumber(text)
                    })
        })
    }
    saveAccountNumber(conta){
        
        var json = {};
            cy
             .fixture('contasCadastradas')
             .then(conta =>{
                conta.forEach( u => this.listaContas.push(u));
             })
        
             
            json.numeroConta = conta.split('-', 2)[0];
            json.digito = conta.split('-', 2)[1];
            
           if(json != null)
           this.listaContas.push({...json});
            cy.writeFile('cypress/fixtures/contasCadastradas.json', JSON.stringify(this.listaContas));
           
        
    }
    clickBtnTransferencia(){
        this.elements.btnTransferencia();
    }

 }
 export const homePage = new HomePage();
 
class ExtratoPage{

    elements = {
        textBalanceAvailable:() => cy.get('#textBalanceAvailable'),
    }
    getBalanceAvailabe() {
        cy.wait(1000);
        cy.get('#textBalanceAvailable')
          .invoke("text")
          .then((text) => {
            cy.log("Text", text);
            //this.inputDataAccount(text);
          });
      }

}
export const extratoPage = new ExtratoPage();

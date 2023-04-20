class LoginPage{
  constructor(){
    this.listaContas = []
}
   elements = {
      emailInput: () => cy.get("input[type=email]"),
      passwordInput: () => cy.get("input[type=password]"),
      loginBtn: () => cy.get('.otUnI'),
      returnBtnRegister: () => cy.get('#btnBackButton'),
      logoutBtn: () => cy.get('#btnExit'),
      errorMessage: () => cy.get('#modalText'),
    };
  
 enterURL(){
    cy.visit('/');
 }

 returnRegister(){
  this.elements.returnBtnRegister().click({force: true});
 }
 loginUsuarioValido(email, senha){
    this.elements.emailInput().eq(0).type(email,{force: true});
    this.elements.passwordInput().eq(0).type(senha,{force: true});
    this.elements.loginBtn().click({force: true});
    this.validaLoginSucesso();
 }
 validaLoginSucesso(){
   this.elements.logoutBtn().should('contain','Sair');
 }
 validaLoginInvalido(){
   this.elements.emailInput.type('teste@gmail.com',{force: true});
   this.elements.passwordInput.type({force: true},123);
   this.elements.loginBtn().click({force: true});

 }
 validaLoginValido(){
   this.elements.errorMessage.should('contain','Usuário ou senha inválido. Tente novamente ou verifique suas informações!');
 }
}
export const loginPage = new LoginPage();
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
    this.elements.passwordInput().eq(0).type(senha,{force: true,log:false});
    this.elements.loginBtn().click({force: true});
    this.validaLoginSucesso();
 }
 loginUsuarioValidoUser1(){
  var json = {};
  cy
.fixture('usuariosCadastrados')
.then( usuario => {
  json.email = usuario[0].email;
  json.senha = usuario[0].senha;
        

  this.elements.emailInput().eq(0).type(json.email,{force: true});
  this.elements.passwordInput().eq(0).type(json.senha,{force: true,log:false});
  this.elements.loginBtn().click({force: true});
  this.validaLoginSucesso();

})
}

 validaLoginSucesso(){
   this.elements.logoutBtn().should('contain','Sair');
 }
logout(){
  this.elements.logoutBtn().click({force: true});
}
 validaLoginValido(){
   this.elements.errorMessage.should('contain','Usuário ou senha inválido. Tente novamente ou verifique suas informações!');
 }
}
export const loginPage = new LoginPage();
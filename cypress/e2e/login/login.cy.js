describe("Suite de prueba con login", () => {
  it("Login correcto", () => {
    cy.visit("https://qa.stag.edipro.cl");
    cy.contains("Ingrese con su cuenta");

    cy.get('input[name="user[login]"').clear().type("yusef@edipro.cl");
    cy.get('input[name="user[password]"').clear().type("ediproyusef");

    cy.get('input[name="commit"]').click();

    cy.url().should("eq", "https://qa.stag.edipro.cl/");
  });

  it("error por credenciales erroneas", () => {
    //escenario error

    cy.visit("https://qa.stag.edipro.cl");
    cy.get('input[name="user[login]"').clear().type("yuse@edipro.cl");
    cy.get('input[name="user[password]"').clear().type("ediproyusef");

    cy.get('input[name="commit"]').click();

    cy.get(".sweet-alert")
      .should("be.visible")
      .within(() => {
        cy.contains("Aviso");
        cy.contains("El email o password ingresado es incorrecto");
        cy.contains("OK").click().click();
      });
  });

  it("Olvidé contrasenna", () => {
    cy.visit("https://qa.stag.edipro.cl");
    cy.contains("¿Olvidó su contraseña?").click();

    cy.url().should("eq", "https://qa.stag.edipro.cl/auth/users/password/new");
    cy.get('input[name="user[email]"').clear().type("yusef@edipro.cl");
    cy.get('input[name="commit"]').click();
  });
}); //acá se cierra el suite ojito:o

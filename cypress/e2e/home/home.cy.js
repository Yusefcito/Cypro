describe("Suite de prueba con login", () => {
  beforeEach(() => {
    cy.visit("https://qa.stag.edipro.cl");

    cy.get('input[name="user[login]"').clear().type("yusef@edipro.cl");
    cy.get('input[name="user[password]"').clear().type("ediproyusef");

    cy.get('input[name="commit"]').click();
  });


  it("error por credenciales erroneas", () => {
    cy.get('#asistentModal') // Seleccione el modal
        .should('be.visible') // Verifica que el modal esté visible
        .within(() => {
            cy.contains('Hola')
            cy.contains('Cerrar').click();
            cy.wait(4000)
        });
});

  it('Probando modulo 2')
}); //acá se cierra el suite ojito:o

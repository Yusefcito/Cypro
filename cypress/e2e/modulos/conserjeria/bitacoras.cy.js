describe("Suite de bitácora", () => {
  beforeEach(() => {
    cy.visit("https://qa.stag.edipro.cl");

    cy.get('input[name="user[login]"').clear().type("yusef@edipro.cl");
    cy.get('input[name="user[password]"').clear().type("ediproyusef");

    cy.get('input[name="commit"]').click();

    cy.get("body").then(($body) => {
      if ($body.find("#informacion-modal-content").length) {
        // Si el modal está presente, realiza las operaciones dentro del modal
        cy.get("#informacion-modal-content")
          .should("be.visible")
          .within(() => {
            cy.contains("Cerrar").click();
          });
      } else {
        cy.contains("Inicio");
      }
    });
    cy.wait(5000);
    cy.get(".container-fluid").should("exist");
    cy.get(".main-header-left").click();
    cy.get("a.nav-link.with-sub").contains("Conserjería").click();
    cy.get(".nav-sub-link[href='/bitacoras']").click();

    cy.url().should("eq", "https://qa.stag.edipro.cl/bitacoras");
  });

  // //CP-1 - Validar contenido del módulo Bitácoras.
  // it("Revisar modulo Conserjería", () => {
  //   //Esto revisará el contenido del módulo
  //   cy.get("h2.main-content-title.tx-24.mg-b-5")
  //     .contains("Bitácoras")
  //     .should("exist");
  //   //botones disponibles
  //   cy.get(".btn.btn-primary.btn-icon-text[href='/bitacoras/new']")
  //     .contains("Registrar")
  //     .should("exist");
  //   cy.get(".btn.btn-info.btn-icon-text").contains("Buscar").should("exist");
  //   cy.get(".btn.btn-dark.btn-icon-text").contains("Excel").should("exist");
  //   cy.get(".btn.btn-warning.btn-icon-text")
  //     .contains("Acciones")
  //     .should("exist");

  //   cy.get(".btn.ripple.btn-primary[href='/bitacoras/new']")
  //     .contains("Agregar Bitacora")
  //     .should("exist");
  //   //fin de botones

  //   cy.get("h6.main-content-label.mb-1")
  //     .contains("Sin registros de bitacora para mostrar ")
  //     .should("exist");
  // });

  //CP - 2 - Validar form registrar
  it("Botón Registar", () => {
    cy.get(".btn.btn-primary.btn-icon-text[href='/bitacoras/new']")
      .contains("Registrar")
      .should("exist")
      .click();

    cy.url().should("eq", "https://qa.stag.edipro.cl/bitacoras/new");

    cy.get("h2.main-content-title.tx-24.mg-b-5")
      .contains("Registro en Bitácora")
      .should("exist");

    // esto valida el contenido del campo "Departamento"
    cy.get("div.form-group.select.optional.bitacora_departamento_id")
      .find(".select2-selection--single")
      .click();

    // cy.get("#select2-bitacora_tipo_bitacora_id-container").click(); es una mousherramienta que usaremos por si a caso.

    cy.get("#select2-bitacora_departamento_id-results").contains("1").click();

    // Valida el contenido del campo Tipo de registro
    cy.get("#select2-bitacora_tipo_bitacora_id-container").click();

    // Selecciona una opción específica (por ejemplo, "Cambio de Turno")
    cy.get("#select2-bitacora_tipo_bitacora_id-results")
      .contains("Cambio de Turno")
      .click();

    // Verifica que la opción seleccionada sea correcta
    cy.get("#select2-bitacora_tipo_bitacora_id-container").should(
      "contain",
      "Cambio de Turno"
    );

    // marca o desmarca la casilla :O
    cy.get(".ckbox.mb-2.boolean.optional.bitacora_destacado").click();

    // Verifica que la casilla esté marcada
    cy.get("#bitacora_destacado").should("be.checked");

    //checkea el calendario :D
    cy.get("#bitacora_fecha")
      .should("have.attr", "readonly", "readonly") // Verificar que el campo sea de solo lectura
      .should("have.attr", "required", "required") // Verificar que el campo sea obligatorio
      .should("have.attr", "aria-required", "true") // Verificar que el campo tenga el atributo aria-required
      .should("have.attr", "placeholder", "Ej. 16/01/2018 12:30") // Verificar el placeholder
      .should("have.attr", "type", "text"); // Verificar el tipo de input

    // checkea el adjuntar esté presente (aqui hacer test funcional en caso de error)
    cy.get("#bitacora_adjunto").should("exist");

    const comentario = "Este es un comentario de prueba";
    cy.get("#bitacora_comentario").type(comentario);

    // Verifica que el comentario ha sido ingresado correctamente
    cy.get("#bitacora_comentario").should("have.value", comentario);

    cy.get(".list-group.border.projects-list").should("exist");

    // Verifica que la lista tenga al menos un elemento
    cy.get(".list-group.border.projects-list")
      .find(".list-group-item")
      .should("have.length.gt", 0);

    cy.get(".list-group.border.projects-list")
      .find(".list-group-item")
      .contains("Cambio de Turno")
      .should("exist");

    cy.get("a.btn.ripple.btn-dark").should("exist");

    // Verificar la presencia del botón Guardar
    cy.get("input.btn.ripple.btn-main-primary").should("exist");
  });
}); //acá se cierra el suite ojito:o

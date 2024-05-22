describe("Suite de prueba con login", () => {
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
            cy.wait(4000);
          });
      } else {
        cy.contains("Inicio");
      }
    });
  });

  it("Validar elementos del header", () => {
    cy.get(".main-header-center").should("exist");
    cy.get(".responsive-logo").should("exist");
    cy.get("form").should("have.attr", "action", "/search");
    cy.get('input[type="search"]')
      .should("exist")
      .should("have.class", "form-control")
      .should("have.class", "rounded-0");
    cy.get(".search-btn")
      .should("exist")
      .find("i")
      .should("have.class", "fe-search");
  });

  it('"Descargas', () => {
    cy.get(".container-fluid").should("exist");
    cy.get(".nav-link.icon.main-header-notification")
      .should("exist")
      .should("have.attr", "href", "/descargas")
      .find("i.fa.fa-download")
      .should("exist")
      .wait(4000)
      .click();
  });

  it("Registro de visitas", () => {
    cy.get('span[data-bs-toggle="modal"][data-bs-target="#modalvisits"]')
      .should("exist") // Verifica que el elemento span esté presente
      .within(() => {
        // Verifica que el elemento a tenga las clases y atributos correctos
        cy.get("a.nav-link.icon.main-header-notification")
          .should("exist") // Verifica que el elemento a esté presente
          .should("have.attr", "data-bs-toggle", "tooltip") // Verifica el atributo data-bs-toggle
          .should("have.attr", "data-bs-placement", "bottom") // Verifica el atributo data-bs-placement
          .should("have.attr", "title", "") // Verifica el atributo title
          .should("have.attr", "href", "#"); // Verifica el atributo href

        // Verifica que el elemento i tenga las clases correctas
        cy.get('i.fa.fa-bell-o[aria-hidden="true"]').should("exist"); // Verifica que el elemento i esté presente
      });

    // Realiza un clic en el elemento para abrir el modal
    cy.get(
      'span[data-bs-toggle="modal"][data-bs-target="#modalvisits"]'
    ).click();

    // Espera a que el modal se abra completamente
    cy.get(".modal-footer button.btn-danger").should("be.visible");

    // Verifica que el título del modal sea "Registro de Visitas"
    cy.get(".modal.show#modalvisits")
      .should("exist") // Verifica que el modal esté presente
      .within(() => {
        cy.get(".modal-header h4.modal-title").should(
          "have.text",
          "Registro de Visitas" // Verifica que el título del modal sea "Registro de Visitas"
        );

        cy.get("select#rut_search_tipo") // Verifica que el combo box exista y contiene las opciones correctas
          .should("exist")
          .should("have.descendants", "option");
        cy.get("select#rut_search_tipo option").should("have.length", 3); // Verifica que haya 3 opciones en el select

        cy.get(
          ".select2-container--default .select2-selection--single"
        ).click(); //selecciona el combo-box

        // Verifica que la lista de opciones esté presente
        cy.get("ul.select2-results__options")
          .should("exist")
          .should("be.visible");

        // Verifica que la lista de opciones contenga las opciones correctas
        cy.get("ul.select2-results__options li.select2-results__option")
          .should("have.length", 3) // Verifica que haya 3 opciones en la lista
          .should("contain", "Carnet De Identidad")
          .should("contain", "Pasaporte")
          .should("contain", "No Identificado");

        cy.get(
          ".select2-container--default .select2-selection--single"
        ).click();

        // Verifica que el campo de entrada para el número de documento exista
        cy.get("input#rut_search_rut")
          .should("exist")
          .should("have.attr", "type", "text")
          .should("have.attr", "name", "rut_search[rut]")
          .should("be.visible");

        // Verificar que el botón "Continuar" está presente y tiene la clase correcta
        cy.get(".modal-footer button.btn-primary.btn-modal-form")
          .should("exist")
          .should("have.text", "Continuar");

        // Verificar que el botón "Cerrar" está presente y tiene el texto correcto
        cy.get(".modal-footer button.btn-danger")
          .should("exist")
          .should("have.text", "Cerrar")
          .click();
      });
  }); //fin de registro de visitas

  it("Bitácoras", () => {
    cy.get(".container-fluid").should("exist");
    cy.get(".nav-link.icon.main-header-notification")
      .should("exist")
      .find("i.fe.fe-edit-2")
      .should("exist")
      .wait(4000)
      .click();
    cy.url().should("eq", "https://qa.stag.edipro.cl/bitacoras/new");
  });

  it("Encomiendas", () => {
    cy.get(".container-fluid").should("exist");
    cy.get(".nav-link.icon.main-header-notification")
      .should("exist")
      .find("i.fe.fe-package")
      .should("exist")
      .wait(4000)
      .click();
    cy.url().should("eq", "https://qa.stag.edipro.cl/encomiendas/new");
  });

  it("Mensajes", () => {
    cy.get(".container-fluid").should("exist");
    cy.get(".nav-link.icon.main-header-notification")
      .should("exist")
      .wait(4000);
    cy.get('a.nav-link.icon[data-bs-original-title="Mensajes"]').click();

    // Esperar a que aparezca el dropdown y luego hacer clic en el enlace
    cy.get(".dropdown-menu")
      .should("exist")
      .first() // Seleccionar el primer elemento
      .within(() => {
        cy.get(".main-notification-text").should(
          "have.text",
          "No tienes nuevos mensajes"
        );
        cy.get('a[href="/mailbox/inbox"]').click();
        cy.url().should("eq", "https://qa.stag.edipro.cl/mailbox/inbox");
      });
  });

  it("El elemento de notificación debe estar presente y mostrar el mensaje correcto", () => {
    // Verificar que el elemento de notificación esté presente
    cy.get(".dropdown.main-header-notification").should("exist");

    // Verificar que el mensaje de notificación sea correcto
    cy.get(".main-notification-text")
      .should("contain", "No tienes nuevas notificaciones")
      .wait(5000);

    cy.get('a.nav-link.icon[data-bs-original-title="Notificaciones"]')
      .first()
      .click();
    cy.get(".header-navheading").should("be.visible");
    cy.get(".main-notification-text").should(
      "contain",
      "No tienes nuevas notificaciones"
    );
  });
}); //acá se cierra el suite ojito:o

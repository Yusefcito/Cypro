describe("Suite de Encomienda", () => {
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
      cy.wait(6000);
      cy.get(".container-fluid").should("exist");
      cy.get(".main-header-left").click();
      cy.get("a.nav-link.with-sub").contains("Conserjería").click(); // módulo de conserjería
      cy.get(".nav-sub-link[href='/encomiendas']").click();
  
      cy.url().should("eq", "https://qa.stag.edipro.cl/encomiendas");
    });
  
    it("modulo encomienda", () => {
      // Verifica que el botón exista y sea visible
      cy.get("h2.main-content-title.tx-24.mg-b-5")
        .contains("Encomiendas")
        .should("exist");
  
      cy.get('.btn.btn-primary.btn-icon-text[href="/encomiendas/new"]').should(
        "exist"
      );
  
      cy.get(".btn.btn-info.btn-icon-text").should("exist");
  
      cy.get(".btn.btn-dark.btn-icon-text").should("exist");
  
      cy.get(".btn.btn-warning.btn-icon-text").should("exist");
  
      cy.get(".badge.bg-danger").should("exist");
  
      cy.get(".badge.bg-info").should("exist");
  
      cy.get(".badge.bg-success").should("exist");
  
      cy.get(".table.mg-b-0.table-striped.table-sticky").should("exist");
      cy.get("thead.tableFloatingHeaderOriginal").within(() => {
        cy.get("tr").should("have.length", 1); // Validar que hay un elemento tipo tr
        cy.get("th").should(($th) => {
          // Obtiene los validadores th dentro del elemento tr
          expect($th).to.have.length(9); // Validar que hay 9 columnas
          expect($th.eq(0)).to.contain("Departamento");
          expect($th.eq(1)).to.contain("Destinatario");
          expect($th.eq(2)).to.contain("Tipo");
          expect($th.eq(3)).to.contain("Entregada por");
          expect($th.eq(4)).to.contain("Recibe");
          expect($th.eq(5)).to.contain("Fecha Recepción");
          expect($th.eq(6)).to.contain("Fecha de entrega");
          expect($th.eq(7)).to.contain("Comentario");
          // Validar que el 9º th esté vacío
          expect($th.eq(8)).to.be.empty;
        });
      });
  
      cy.get(".btn.ripple.btn-dark").should("exist");
  
      cy.contains("tr.text-center", "Tomás Mercado").within(() => {
        // Selecciona y hace clic en el botón para desplegar el dropdown
        cy.get('button.btn.ripple.btn-dark[data-bs-toggle="dropdown"]').click();
  
        // Espera a que el menú desplegable sea visible
        cy.get("div.dropdown-menu").should("be.visible");
  
        // Selecciona y hace clic en una opción del dropdown
        cy.get('a.dropdown-item[href="/encomiendas/128/entregar"]').should(
          "exist"
        );
        cy.get('a.dropdown-item[href="/encomiendas/128/edit"]').should("exist");
        cy.get('a.dropdown-item[href="/encomiendas/128/anular"]').should("exist");
        cy.get('a.dropdown-item[href="/encomiendas/128"]').should("exist");
      });
    });
  
    it("Dropdown - Entregar", () => {
      /// ------------------------------------------------------------------ dropdown
      cy.contains("tr.text-center", "Tomás Mercado").within(() => {
        // Selecciona y hace clic en el botón para desplegar el dropdown
        cy.get('button.btn.ripple.btn-dark[data-bs-toggle="dropdown"]').click();
  
        // Espera a que el menú desplegable sea visible
        cy.get("div.dropdown-menu").should("be.visible");
  
        // Selecciona y hace clic en una opción del dropdown
        cy.get('a.dropdown-item[href="/encomiendas/128/entregar"]')
          .should("exist")
          .click();
        cy.url().should(
          "eq",
          "https://qa.stag.edipro.cl/encomiendas/128/entregar"
        );
      });
      ///----------------------------------------------------------------------- fin dropdown
  
      // Valida el contenido del primer elemento de la lista
      cy.get(".col-xl-3 .list-group-item")
        .eq(0)
        .within(() => {
          cy.get("h6").should("contain.text", "Sobre");
          cy.get("p").should("contain.text", "30/06/2024 01:29");
        });
  
      cy.get("#encomienda_entrego")
        .should("contain.attr", "placeholder", "Ej. Pedro Solis")
        .type("Pedro Solis");
  
      // Fecha
      cy.get("#bitacora_fecha")
        .invoke("val")
        .then((fecha) => {
          const datePattern = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;
          expect(fecha).to.match(datePattern);
        });
  
      // Quien entrega
      cy.get("#encomienda_colaborador_id").should("exist");
  
      // Comentario entrega
      cy.get("#encomienda_comentario_entrega").type("Comentario de prueba.");
  
      // Submit
      cy.get('input[type="submit"]').should("exist");
  
      // Valida los elementos de la lista
      cy.get(".col-xl-3 .list-group-item").should("have.length", 3);
  
      // Valida el contenido del primer elemento de la lista
      cy.get(".col-xl-3 .list-group-item")
        .eq(0)
        .within(() => {
          cy.get("h6").should("contain.text", "Sobre");
          cy.get("p").should("contain.text", "30/06/2024 01:29");
        });
  
      // Valida el contenido del segundo elemento de la lista
      cy.get(".col-xl-3 .list-group-item")
        .eq(1)
        .within(() => {
          cy.get("h6").should("contain.text", "Diario");
          cy.get("p").should("contain.text", "28/06/2024 22:18");
        });
  
      // Valida el contenido del tercer elemento de la lista
      cy.get(".col-xl-3 .list-group-item")
        .eq(2)
        .within(() => {
          cy.get("h6").should("contain.text", "Encomienda");
          cy.get("p").should("contain.text", "30/06/2024 15:14");
        });
  
      // Valida la imagen en la segunda tarjeta
      cy.get(".col-xl-3 .card.custom-card")
        .eq(1)
        .within(() => {
          cy.get("img")
            .should("contain.attr", "src")
            .and(
              "include",
              "undraw_order_delivered_re_v4ab-a31a38a89d9bcc4aa4d0b9beadd74b4ab5103f722f1b32e2fb785e19f1a3f022.svg"
            );
        });
    });
  
    it("Dropdown - Anular", () => {
      /// ------------------------------------------------------------------ dropdown
      cy.contains("tr.text-center", "Tomás Mercado").within(() => {
        // Selecciona y hace clic en el botón para desplegar el dropdown
        cy.get('button.btn.ripple.btn-dark[data-bs-toggle="dropdown"]').click();
  
        // Espera a que el menú desplegable sea visible
        cy.get("div.dropdown-menu").should("be.visible");
  
        // Selecciona y hace clic en una opción del dropdown
        cy.get('a.dropdown-item[href="/encomiendas/128/anular"]')
          .should("exist")
          .click();
      });
      ///----------------------------------------------------------------------- fin dropdown
  
      cy.get("#modal-anular-encomienda").should("be.visible");
  
      // Verificar el título del modal
      cy.get("#modal-anular-encomienda .modal-title").should(
        "have.text",
        "Anular encomienda"
      );
  
      // Verificar el campo de motivo de anulación y el mensaje de error
      cy.get("#encomienda_motivo_anulacion").should("be.visible");
      cy.get("#encomienda_motivo_anulacion")
        .invoke("attr", "required")
        .should("exist");
      // Forzar el foco en el campo de texto para que el mensaje de error aparezca
      cy.get("#encomienda_motivo_anulacion").focus().blur();
  
      // Esperar explícitamente a que el mensaje de error aparezca
      cy.get("#parsley-id-39", { timeout: 6000 })
        .should("be.visible")
        .and("contain", "Este valor es requerido.");
  
      // Verificar los botones de "Cerrar" y "Continuar"
      cy.get("#modal-anular-encomienda").within(() => {
        cy.get(".modal-footer .btn.btn-danger")
          .should("be.visible")
          .and("have.text", "Cerrar");
        cy.get(".modal-footer .btn.btn-primary.btn-modal-form")
          .should("be.visible")
          .and("have.text", "Continuar");
      });
    });
    it("Dropdown - Eliminar", () => {
      // / ------------------------------------------------------------------ dropdown
      cy.contains("tr.text-center", "Tomás Mercado").within(() => {
        // Selecciona y hace clic en el botón para desplegar el dropdown
        cy.get('button.btn.ripple.btn-dark[data-bs-toggle="dropdown"]').click();
  
        // Espera a que el menú desplegable sea visible
        cy.get("div.dropdown-menu").should("be.visible");
  
        // Selecciona y hace clic en una opción del dropdown
        cy.get('a.dropdown-item[href="/encomiendas/128"]')
          .should("exist")
          .click();
      });
      // /----------------------------------------------------------------------- fin dropdown
  
      // Verificar que el modal está visible
      cy.get(".modal-dialog.modal-xl").should("be.visible");
  
      // Verificar el título del modal
      cy.get(".modal-dialog.modal-xl .modal-header .modal-title").should(
        "have.text",
        "Confirmación"
      );
  
      // Verificar el mensaje en el cuerpo del modal
      cy.get(".modal-dialog.modal-xl .modal-body p").should(
        "have.text",
        "Seguro?"
      );
  
      // Verificar los botones de "Cancelar" y "Confirmar"
      cy.get(".modal-dialog.modal-xl .modal-footer").within(() => {
        cy.get(".btn.cancel.btn-default")
          .should("be.visible")
          .and("have.text", "Cancelar");
        cy.get(".btn.confirm.commit.btn-danger")
          .should("be.visible")
          .and("have.text", "Confirmar");
      });
    });
  
    it("Tool tips - filters", () => {
      // Verifica que los tool tips de filtros funcionen
  
      cy.get(".badge.bg-danger")
        .contains("No entregada con más de 3 días")
        .click();
      cy.get(".badge.bg-danger").each(($badge) => {
        const datePattern = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;
        const badgeText = $badge.text().trim();
        if (datePattern.test(badgeText)) {
          expect(badgeText).to.match(datePattern);
        }
      });
  
      cy.get(".badge.bg-success").contains("Entregada").click();
      cy.get(".badge.bg-success").each(($badge) => {
        const datePattern = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;
        const badgeText = $badge.text().trim();
        if (datePattern.test(badgeText)) {
          expect(badgeText).to.match(datePattern);
        }
      });
  
      cy.get(".badge.bg-info").contains("Anulada").click();
      // Verifica si hay badges con la clase 'bg-info'
      cy.get("body").then(($body) => {
        if ($body.find(".badge.bg-info").length > 0) {
          // Si hay badges, verifica que las celdas que contienen fechas cumplan con el formato esperado y tengan la clase 'bg-info'
          cy.get(".badge.bg-info").each(($badge) => {
            const datePattern = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;
            const badgeText = $badge.text().trim();
            if (datePattern.test(badgeText)) {
              expect(badgeText).to.match(datePattern);
            }
          });
        } else {
          // Si no hay badges, imprime un mensaje en la consola (opcional)
          cy.log("No hay badges con la clase bg-info");
        }
      });
    });
  
    it("Validar Registro - formulario Encomienda", () => {
      cy.get(".btn.btn-primary.btn-icon-text").contains("Registrar").click();
      cy.url().should("eq", "https://qa.stag.edipro.cl/encomiendas/new");
  
      // Hidden fields
      cy.get('input[name="encomienda[destinatario]"]').type("Yusef Said");
  
      cy.get("#select2-encomienda_departamento_id-container").click();
      cy.get(".select2-results__options").contains("1").click();
  
      cy.get("#select2-encomienda_tipo_encomienda_id-container").click();
      cy.get(".select2-results__options").within(() => {
        cy.get(".select2-results__option").should(($options) => {
          const texts = $options
            .map((index, option) => Cypress.$(option).text())
            .get();
          expect(texts).to.include.members(["Sobre", "Diario", "Encomienda"]);
        });
      });
      cy.get(".select2-results__options").contains("Sobre").click();
  
      cy.get("#encomienda_comentario")
        .should("exist")
        .and("have.prop", "tagName", "TEXTAREA");
      cy.get("#adjuntar-archivo").should("exist");
      cy.get("#adjuntar-imagen").should("exist");
  
      cy.get('input[type="submit"].btn.ripple.btn-main-primary').should("exist");
      cy.get("a.btn.ripple.btn-dark").should("exist");
  
      cy.get('a[href="/tipos_encomiendas/new"]').click();
      cy.url().should("eq", "https://qa.stag.edipro.cl/tipos_encomiendas/new");
  
      cy.get("input#tipo_encomienda_nombre")
        .should("exist")
        .and("have.attr", "type", "text")
        .and("have.attr", "name", "tipo_encomienda[nombre]")
        .and("have.attr", "placeholder", "Nombre de tipo de Encomienda")
        .and("have.attr", "required", "required");
  
      cy.get("input#tipo_encomienda_descripcion")
        .should("exist")
        .and("have.attr", "type", "text")
        .and("have.attr", "name", "tipo_encomienda[descripcion]")
        .and("have.attr", "placeholder", "descripción del tipo de Encomienda")
        .and("have.attr", "required", "required")
        .and("have.attr", "maxlength", "1000")
        .and("have.attr", "size", "1000");
  
      cy.get('input[type="submit"].btn.ripple.btn-main-primary').should("exist");
  
      cy.get("a.btn.ripple.btn-secondary.pd-x-30").should("exist");
  
      cy.get(
        'img[src="/assets/spruha/delivery2-c43c10cb3216b0c7f170f4b02872417f2d3a046bad5a97fedf9e6a52b2bc7caf.jpg"]'
      ).should("exist"); // Verifica que el elemento img existe
    });
    it("Validar Registro - formulario Encomienda", () => {
      cy.get(".btn.btn-info.btn-icon-text").click();
  
      cy.get(".modal-title").should("contain", "Búsqueda de Encomiendas");
  
      // Verificar los campos del formulario
      cy.get("#q_entregada_cont").should(
        "have.attr",
        "placeholder",
        "Ej. Correos de Chile"
      );
      cy.get("#q_destinatario_cont").should(
        "have.attr",
        "placeholder",
        "Ej. Juan Soto"
      );
      cy.get("#q_fecha_between_dates").should("exist");
      cy.get("#q_fecha_entrega_between_dates").should("exist");
      cy.get("#q_tipo_encomienda_id_eq").should("exist");
      cy.get("#select2-q_tipo_encomienda_id_eq-container").should("exist");
      cy.get("#select2-q_user_id_eq-container").should("exist");
      cy.get("#select2-q_departamento_id_eq-container").should("exist");
      cy.get("#select2-q_estado_true-container").should("exist");
      cy.get("#q_comentario_cont").should(
        "have.attr",
        "placeholder",
        "Ej. Encomienda por pagar"
      );
      cy.get("#q_comentario_entrega_cont").should(
        "have.attr",
        "placeholder",
        "Ej. Sobre abierto"
      );
      cy.get("#select2-q_anulada_eq-container").should("exist");
  
      cy.get(".modal-footer .btn-danger").should("contain", "Cerrar");
      cy.get(".modal-footer .btn-primary").should("contain", "Buscar");
    });
  
    it("botón excel", () => {
      cy.intercept("GET", "/encomiendas.xls", {
        statusCode: 200,
        body: "Interceptado",
      }).as("descargaExcel");
  
      // Verifica que el enlace de descarga de Excel exista y sea visible
      cy.get('a[href="/encomiendas.xls"].btn.btn-dark.btn-icon-text')
        .should("exist")
        .and("be.visible");
  
      // Verifica que el enlace contenga el icono correcto
      cy.get(
        'a[href="/encomiendas.xls"].btn.btn-dark.btn-icon-text i.fa.fa-file-excel-o'
      )
        .should("exist")
        .and("be.visible");
  
      // Verifica que el texto del enlace contenga "Excel"
      cy.get('a[href="/encomiendas.xls"].btn.btn-dark.btn-icon-text').contains(
        "Excel"
      );
  
      // Verifica el href del enlace
      cy.get('a[href="/encomiendas.xls"]').should(
        "have.attr",
        "href",
        "/encomiendas.xls"
      );
    });
  
    it("botón acciones/Entregadas", () => {
      // Verifica que el botón exista y sea visible
      cy.get('button.btn.btn-warning.btn-icon-text[data-bs-toggle="dropdown"]')
        .should("exist")
        .and("be.visible");
  
      // Verifica que el botón contenga el texto "Acciones"
      cy.get(
        'button.btn.btn-warning.btn-icon-text[data-bs-toggle="dropdown"]'
      ).contains("Acciones");
  
      cy.get(".btn.btn-warning.btn-icon-text").click();
      cy.get(".dropdown-menu.show").should("exist");
      cy.get(".dropdown-item[href='/encomiendas/entregadas']").click();
  
      cy.url().should("eq", "https://qa.stag.edipro.cl/encomiendas/entregadas");
    });
  
    it("botón acciones/encomienda/tipos_encomienda", () => {
      // Verifica que el botón exista y sea visible
      cy.get('button.btn.btn-warning.btn-icon-text[data-bs-toggle="dropdown"]')
        .should("exist")
        .and("be.visible");
  
      // Verifica que el botón contenga el texto "Acciones"
      cy.get(
        'button.btn.btn-warning.btn-icon-text[data-bs-toggle="dropdown"]'
      ).contains("Acciones");
  
      cy.get(".btn.btn-warning.btn-icon-text").click();
      cy.get(".dropdown-menu.show").should("exist");
      cy.get(".dropdown-item[href='/tipos_encomiendas']").click();
  
      cy.url().should("eq", "https://qa.stag.edipro.cl/tipos_encomiendas");
    });
  
    it("botón acciones/Entregadas", () => {
      // Verifica que el botón exista y sea visible
      cy.get('button.btn.btn-warning.btn-icon-text[data-bs-toggle="dropdown"]')
        .should("exist")
        .and("be.visible");
  
      // Verifica que el botón contenga el texto "Acciones"
      cy.get(
        'button.btn.btn-warning.btn-icon-text[data-bs-toggle="dropdown"]'
      ).contains("Acciones");
  
      cy.get(".btn.btn-warning.btn-icon-text").click();
      cy.get(".dropdown-menu.show").should("exist");
      cy.get(".dropdown-item[href='/encomiendas/entregadas']").click();
  
      cy.url().should("eq", "https://qa.stag.edipro.cl/encomiendas/entregadas");
  
      cy.get(".btn.btn-primary.btn-icon-text")
        .contains("Registrar")
        .should("exist");
  
      cy.get(".btn.btn-info.btn-icon-text").should("exist");
      cy.get(".btn.btn-dark.btn-icon-text").should("exist");
      cy.get(".btn.btn-warning.btn-icon-text").should("exist");
  
      cy.get(".table.mg-b-0.table-striped.table-sticky").should("exist");
      cy.get("thead.tableFloatingHeaderOriginal").within(() => {
        cy.get("tr").should("have.length", 1); // Validar que hay un elemento tipo tr
        cy.get("th").should(($th) => {
          // Obtiene los validadores th dentro del elemento tr
          expect($th).to.have.length(7); // Validar que hay 9 columnas
          expect($th.eq(0)).to.contain("Departamento");
          expect($th.eq(1)).to.contain("Destinatario");
          expect($th.eq(2)).to.contain("Transportada Por");
          expect($th.eq(3)).to.contain("Recibe");
          expect($th.eq(4)).to.contain("Fecha Recepción");
          expect($th.eq(5)).to.contain("Fecha de entrega");
        });
      });
      //------------------------------------------------------------------------
      // entregas
      cy.contains("tr.text-center", "Vanessa Cortez").within(() => {
        // Selecciona y hace clic en el botón para desplegar el dropdown
        cy.get('button.btn.ripple.btn-dark[data-bs-toggle="dropdown"]').click();
  
        // Espera a que el menú desplegable sea visible
        cy.get("div.dropdown-menu").should("be.visible");
  
        // Selecciona y hace clic en una opción del dropdown
        cy.get('a.dropdown-item[href="/encomiendas/82/edit"]').should("exist");
        cy.get('a.dropdown-item[href="/encomiendas/82"]').should("exist");
        cy.get('a.dropdown-item[href="/encomiendas/82/detalle_entrega"]').should("exist");
  
      });
      //------------------------------------------------------------------------
    });
  
    it("Dropdown - Detalle de entrega", () => {
      cy.get('button.btn.btn-warning.btn-icon-text[data-bs-toggle="dropdown"]')
        .should("exist")
        .and("be.visible");
  
      // Verifica que el botón contenga el texto "Acciones"
      cy.get(
        'button.btn.btn-warning.btn-icon-text[data-bs-toggle="dropdown"]'
      ).contains("Acciones");
  
      cy.get(".btn.btn-warning.btn-icon-text").click();
      cy.get(".dropdown-menu.show").should("exist");
      cy.get(".dropdown-item[href='/encomiendas/entregadas']").click();
  
      cy.contains("tr.text-center", "Vanessa Cortez").within(() => {
        // Selecciona y hace clic en el botón para desplegar el dropdown
        cy.get('button.btn.ripple.btn-dark[data-bs-toggle="dropdown"]').click();
  
        // Espera a que el menú desplegable sea visible
        cy.get("div.dropdown-menu").should("be.visible");
  
        // Selecciona y hace clic en una opción del dropdown
        cy.get('a.dropdown-item[href="/encomiendas/82/detalle_entrega"]')
          .should("exist")
          .click();
      });
      cy.url().should(
        "eq",
        "https://qa.stag.edipro.cl/encomiendas/82/detalle_entrega"
      );
  
      cy.get(".main-content-body.tab-pane.active").within(() => {
        cy.contains("h4.tx-15", "Comentario").should("exist");
        cy.contains("p", "Caja mediana envuelta en plástico negro").should(
          "exist"
        );
  
        cy.contains("h4.tx-15", "Tipo encomienda").should("exist");
        cy.contains("p", "Encomienda").should("exist");
  
        cy.contains("h4.tx-15", "Comentario de la Entrega").should("exist");
        cy.contains("p", "recibe la hermana").should("exist");
  
        cy.contains("h4.tx-15", "Recepción").should("exist");
        cy.contains("p", "24/05/2023 12:35").should("exist");
  
        cy.contains("h4.tx-15", "Entregada el").should("exist");
        cy.contains("p", "30/05/2023 01:34").should("exist");
  
        cy.contains("h4.tx-15", "Entregó").should("exist");
        cy.contains("p", "Juan Perez Perez").should("exist");
  
        cy.contains("h4.tx-15", "Recibió Entrega").should("exist");
        cy.contains("p", "Sin Información").should("exist");
  
        cy.contains("label.main-content-label", "Departamento").should("exist");
  
        cy.contains(
          ".main-profile-contact-list .media-body span",
          "número"
        ).should("exist");
  
        cy.contains(
          ".main-profile-contact-list .media-body span",
          "Propietario"
        ).should("exist");
      });
    });
  
    it("Dropdown - editar entrega", () => {
      cy.get('button.btn.btn-warning.btn-icon-text[data-bs-toggle="dropdown"]')
        .should("exist")
        .and("be.visible");
  
      // Verifica que el botón contenga el texto "Acciones"
      cy.get(
        'button.btn.btn-warning.btn-icon-text[data-bs-toggle="dropdown"]'
      ).contains("Acciones");
  
      cy.get(".btn.btn-warning.btn-icon-text").click();
      cy.get(".dropdown-menu.show").should("exist");
      cy.get(".dropdown-item[href='/encomiendas/entregadas']").click();
  
      cy.contains("tr.text-center", "Vanessa Cortez").within(() => {
        // Selecciona y hace clic en el botón para desplegar el dropdown
        cy.get('button.btn.ripple.btn-dark[data-bs-toggle="dropdown"]').click();
  
        // Espera a que el menú desplegable sea visible
        cy.get("div.dropdown-menu").should("be.visible");
  
        // Selecciona y hace clic en una opción del dropdown
        cy.get('a.dropdown-item[href="/encomiendas/82/edit"]')
          .should("exist")
          .click();
        {
        }
      });
      cy.url().should("eq", "https://qa.stag.edipro.cl/encomiendas/82/edit");
  
      cy.get("#decimalCurrency").should("have.attr", "data-decimal", "0");
      cy.get("#radixPoint").should("have.attr", "data-separator", ",");
      cy.get("#groupSeparator").should("have.attr", "data-delimiter", ".");
  
      cy.get("h2.main-content-title").contains("Editar Registro Encomienda");
      cy.get("ol.breadcrumb").within(() => {
        cy.get("li").eq(0).contains("Inicio").should("have.attr", "href", "/");
        cy.get("li")
          .eq(1)
          .contains("Encomiendas")
          .should("have.attr", "href", "/encomiendas");
        cy.get("li.active").contains("Editar");
      });
  
      cy.get('form#edit_encomienda_82').within(() => {
        cy.get('input#encomienda_destinatario').should('have.value', 'Vanessa Cortez').and('have.attr', 'required');
        cy.get('select#encomienda_departamento_id').should('have.value', '126');
        cy.get('select#encomienda_tipo_encomienda_id').should('have.value', '3').and('have.attr', 'required');
        cy.get('input#encomienda_entregada').should('have.value', 'Chilexpress').and('have.attr', 'required');
        cy.get('input#encomienda_fecha').should('have.value', '24/05/2023 12:35').and('have.attr', 'required');
        cy.get('textarea#encomienda_comentario').contains('Caja mediana envuelta en plástico negro');
      });
      cy.get('button#adjuntar-archivo').should('exist').contains('Adjuntar Archivo');
      cy.get('a#adjuntar-imagen').should('have.attr', 'href', '/utilizar_camara').contains('Usar Cámara');
  
      cy.get("a.btn.ripple.btn-dark").should("exist");
      // Verificar la presencia del botón Guardar
      cy.get("input.btn.ripple.btn-main-primary").should("exist");
  
      cy.get('.col-xl-3 .card-header label')
        .should('have.text', 'Recientes');
  
      // Valida el subtítulo de la sección
      cy.get('.col-xl-3 .card-header span')
        .should('have.text', 'Últimos registros de Encomiendas');
  
      // Valida los elementos de la lista
      cy.get('.col-xl-3 .list-group-item').should('have.length', 3);
  
      // Valida el contenido del primer elemento de la lista
      cy.get('.col-xl-3 .list-group-item').eq(0).within(() => {
        cy.get('h6').should('contain.text', 'Sobre');
        cy.get('p').should('contain.text', '30/06/2024 01:29');
      });
  
      // Valida el contenido del segundo elemento de la lista
      cy.get('.col-xl-3 .list-group-item').eq(1).within(() => {
        cy.get('h6').should('contain.text', 'Diario');
        cy.get('p').should('contain.text', '28/06/2024 22:18');
      });
  
      // Valida el contenido del tercer elemento de la lista
      cy.get('.col-xl-3 .list-group-item').eq(2).within(() => {
        cy.get('h6').should('contain.text', 'Encomienda');
        cy.get('p').should('contain.text', '30/06/2024 15:14');
      });
  
      // Valida la imagen en la segunda tarjeta
      cy.get('.col-xl-3 .card.custom-card').eq(1).within(() => {
        cy.get('img').should('contain.attr', 'src').and('include', 'undraw_order_delivered_re_v4ab-a31a38a89d9bcc4aa4d0b9beadd74b4ab5103f722f1b32e2fb785e19f1a3f022.svg');
      });
  
    });
  }); ////acá se cierra el suite ojito:o
  
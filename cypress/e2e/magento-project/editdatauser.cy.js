// // cypress/e2e/edit-account.cy.js
describe("Edit Account Information", () => {
  // it("should navigate to edit page after login", () => {
  //   // Visit the site
  //   cy.visit(
  //     "https://magento.softwaretestingboard.com/customer/account/login",
  //     {
  //       timeout: 60000,
  //     }
  //   );

  //   // Intercept all relevant network requests
  //   cy.intercept("POST", "**/customer/account/loginPost").as("loginRequest");
  //   cy.intercept("GET", "**/customer/section/load*").as("sectionLoad");
  //   cy.intercept("GET", "**/customer/account/edit*").as("editPageLoad");

  //   // Perform login
  //   cy.get("#email").should("be.visible").type("refofattahillah@gmail.com");
  //   cy.get("#pass").should("be.visible").type("Az12345678");
  //   cy.get("#send2").should("be.visible").click();

  //   // Wait for login requests to complete
  //   cy.wait("@loginRequest");
  //   cy.wait("@sectionLoad");

  //   // Verify we're on the account page
  //   cy.url().should("include", "/customer/account");

  //   // Wait for the page to be fully loaded
  //   cy.get(".page-title").should("be.visible");

  //   // Find and click the edit link - try multiple possible selectors
  //   cy.get("body").then(($body) => {
  //     if ($body.find('a[href*="customer/account/edit"]').length > 0) {
  //       cy.get('a[href*="customer/account/edit"]')
  //         .should("be.visible")
  //         .first()
  //         .click({ force: true });
  //     } else if ($body.find('a:contains("Edit")').length > 0) {
  //       cy.get('a:contains("Edit")')
  //         .should("be.visible")
  //         .first()
  //         .click({ force: true });
  //     } else if (
  //       $body.find('a:contains("Edit Account Information")').length > 0
  //     ) {
  //       cy.get('a:contains("Edit Account Information")')
  //         .should("be.visible")
  //         .first()
  //         .click({ force: true });
  //     }
  //   });

  //   // Wait for edit page load
  //   cy.wait("@editPageLoad", { timeout: 10000 });

  //   // Verify we're on the edit page
  //   cy.url().should("include", "/customer/account/edit");

  //   // Wait for form to be visible
  //   cy.get("form.form-edit-account").should("be.visible");

  //   // Verify key form elements are present
  //   cy.get("#firstname").should("be.visible");
  //   cy.get("#lastname").should("be.visible");
  //   cy.get("#change-email").should("exist");
  //   cy.get("#change-password").should("exist");
  // });

  // it("should handle form interactions after navigation", () => {
  //   // Visit login page directly
  //   cy.visit(
  //     "https://magento.softwaretestingboard.com/customer/account/login",
  //     {
  //       timeout: 60000,
  //     }
  //   );

  //   // Login
  //   cy.get("#email").should("be.visible").type("ref.forbusiness@gmail.com");
  //   cy.get("#pass").should("be.visible").type("Az12345678");
  //   cy.get("#send2").should("be.visible").click();

  //   // Wait for account page load
  //   cy.get(".page-title").should("be.visible");

  //   // Visit edit page directly instead of clicking
  //   cy.visit(
  //     "https://magento.softwaretestingboard.com/customer/account/edit/",
  //     {
  //       timeout: 60000,
  //     }
  //   );

  //   // Wait for form to be visible
  //   cy.get("form.form-edit-account").should("be.visible");

  //   // Now we can interact with the form
  //   const newFirstName = `Test${Date.now()}`;
  //   const newLastName = `User${Date.now()}`;

  //   cy.get("#firstname").should("be.visible").clear().type(newFirstName);
  //   cy.get("#lastname").should("be.visible").clear().type(newLastName);

  //   // Try to save
  //   cy.get('button[title="Save"]').should("be.visible").click();

  //   // Verify success message
  //   cy.get('[data-ui-id="message-success"]', { timeout: 10000 }).should(
  //     "be.visible"
  //   );
  // });

  it("should handle email and password changes", () => {
    // Visit login page directly
    cy.visit(
      "https://magento.softwaretestingboard.com/customer/account/login",
      {
        timeout: 60000,
      }
    );

    // Login
    cy.get("#email").should("be.visible").type("sanbercode64004@yopmail.com");
    cy.get("#pass").should("be.visible").type("Az12345678");
    cy.get("#send2").should("be.visible").click();

    // Wait for account page load
    cy.get(".page-title").should("be.visible");

    // Visit edit page directly
    cy.visit(
      "https://magento.softwaretestingboard.com/customer/account/edit/",
      {
        timeout: 60000,
      }
    );

    // Wait for form to be visible
    cy.get("form.form-edit-account").should("be.visible");

    // Check the change email checkbox
    cy.get("#change-email").should("exist").check();

    // Enter the new email
    cy.get("#email")
      .should("be.visible")
      .clear()
      .type("fattahillahrefo@yahoo.co.id");

    // Enter current password for email change
    cy.get("#current-password").should("be.visible").type("Az12345678");

    // Check the change password checkbox
    cy.get("#change-password").should("exist").check();

    // Enter new password details
    cy.get("#password").should("be.visible").type("Az123456789");
    cy.get("#password-confirmation").should("be.visible").type("Az123456789");

    // Try to save
    cy.get('button[title="Save"]').should("be.visible").click();

    // Verify success message
    cy.get('[data-ui-id="message-success"]', { timeout: 10000 }).should(
      "be.visible"
    );

    // Optional: Verify we can log in with new credentials
    // Note: You might want to add this in a separate test or handle this differently
    // based on your test requirements
  });
});

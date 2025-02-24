describe("Edit Address Test", () => {
  beforeEach(() => {
    // Visit the base URL
    cy.visit(
      "https://magento.softwaretestingboard.com/customer/account/login",
      {
        timeout: 60000,
      }
    );
    cy.get("#email").type("sanbercode64001@yopmail.com");
    cy.get("#pass").type("Az12345678");
    cy.get("#send2").click();

    // Wait for the account dashboard to load
    cy.get(".page-title").should("be.visible");

    // Navigate to address book - first go to the account page if needed
    cy.visit("https://magento.softwaretestingboard.com/customer/address/");
    // Alternative approach using UI navigation
    // cy.get('.block-dashboard-info').contains('Manage Addresses').click();
  });

  it("should change billing address successfully", () => {
    // Test data
    const newBillingAddress = {
      firstName: "John",
      lastName: "Doe",
      company: "Test Company",
      phone: "1234567890",
      street1: "123 Test Street",
      street2: "Apt 456",
      city: "Test City",
      state: "California",
      zip: "12345",
      country: "United States",
    };

    // Click "Change Billing Address" link
    cy.get(".box-address-billing .box-actions")
      .contains("Change Billing Address")
      .click();

    // Fill in the billing address form
    cy.get("#firstname").clear().type(newBillingAddress.firstName);
    cy.get("#lastname").clear().type(newBillingAddress.lastName);
    cy.get("#company").clear().type(newBillingAddress.company);
    cy.get("#telephone").clear().type(newBillingAddress.phone);
    cy.get("#street_1").clear().type(newBillingAddress.street1);
    cy.get("#street_2").clear().type(newBillingAddress.street2);
    cy.get("#city").clear().type(newBillingAddress.city);

    // Select country first as it may affect state options
    cy.get("#country").select(newBillingAddress.country);

    // Handle state selection
    cy.get("#region_id").select(newBillingAddress.state);

    cy.get("#zip").clear().type(newBillingAddress.zip);

    // Save address
    cy.get(".save").click();

    // Verify success message
    cy.get(".message-success")
      .should("be.visible")
      .and("contain", "You saved the address");

    // Verify the billing address was updated
    cy.get(".box-address-billing")
      .should("contain", newBillingAddress.firstName)
      .and("contain", newBillingAddress.lastName)
      .and("contain", newBillingAddress.street1)
      .and("contain", newBillingAddress.city)
      .and("contain", newBillingAddress.zip);
  });

  it("should validate required fields for billing address", () => {
    // Click "Change Billing Address" link
    cy.get(".box-address-billing .box-actions")
      .contains("Change Billing Address")
      .click();

    // Clear required fields
    cy.get("#firstname").clear();
    cy.get("#lastname").clear();
    cy.get("#telephone").clear();
    cy.get("#street_1").clear();
    cy.get("#city").clear();
    cy.get("#zip").clear();

    // Try to save
    cy.get(".save").click();

    // Verify error messages
    cy.get("#firstname-error").should("be.visible");
    cy.get("#lastname-error").should("be.visible");
    cy.get("#telephone-error").should("be.visible");
    cy.get("#street_1-error").should("be.visible");
    cy.get("#city-error").should("be.visible");
    cy.get("#zip-error").should("be.visible");
  });
});

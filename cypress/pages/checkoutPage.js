class checkoutPage {
  first_name = "[name='firstname']"
  last_name = "[name='lastname']"
  company = "[name='company']"
  street_address1 = ".street [aria-required='true']"
  street_address2 = ".street div:nth-of-type(2) .input-text"
  street_address3 = ".street div:nth-of-type(3) .input-text"
  city = "[name='city']"
  state_province = "[name='region_id']"
  zip_portalcode = "[name='postcode']"
  country = "[name='country_id']"
  phone_number = "[name='telephone']"




  toRadiantTee(size) {
    cy.visit('radiant-tee.html')
    cy.get('.size', size).click()
    cy.get('.swatch-attribute.color')
      .find('.swatch-option')
      .eq(0).click()
    cy.get('#product-addtocart-button').click()
  }
  clickCart() {
    cy.get('.showcart').click()
  }
  clickCheckout() {
    cy.get('#top-cart-btn-checkout').click()
  }

  verifyShippingAddress() {
    cy.get('#shipping > .step-title')
      .should('be.visible')
  }

  buttonOrderSummary() {
    cy.get('.block > .title').click()
  }

  buttonViewDetails() {
    cy.get('.product > .toggle').click()
  }

  verifyOrderSummary() {
    cy.get('.minicart-items-wrapper')
      .should('be.visible')
  }

  buttonNextShippingAddress() {
    cy.get('.button').click()
  }

  verifyPaymentMethod() {
    cy.get('.payment-group > .step-title')
      .should('be.visible')
  }
  buttonPlaceOrder() {
    cy.get(".checkout")
      .click()
  }
  verifySuccessMessagepurchase(text) {
    cy.get('.base').should('have.text', text)
  }

  buttonShipHere() {
    cy.get(".action-save-address > span")
      .click()
  }

  buttonNewAddress() {
    cy.get(".action-show-popup").click()
  }

  unceklistSaveAddress() {
    cy.get('#shipping-save-in-address-book').uncheck().should('not.be.checked')
  }

  buttonNextOrderSummary() {
    cy.get(".button").click()
  }
}

export default new checkoutPage()

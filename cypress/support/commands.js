// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// -- Custom command to register new account Eleven Team --

Cypress.Commands.add('registerUser', (user) => {
    cy.get('#firstname').type(user.firstname)
    cy.get('#lastname').type(user.lastname)
    cy.get('#email_address').type(user.email)
    cy.get('#password').type(user.password)
    cy.get('#password-confirmation').type(user.password)
    cy.get('.action.submit.primary').click()

  })

  // -- Custom command to login with valid data --

  Cypress.Commands.add('login', (user) => {
    cy.get('#email').type(user.email)
    cy.get('#pass').type(user.password)
    cy.get('#send2').click()
  })

  // Custom command to configure and add product to cart
Cypress.Commands.add('addProductToCart', (product) => {
    cy.visit(product.url)
    cy.get('.page-title').should('contain', product.name)
    cy.get(`[option-label="${product.size}"]`).click()
    cy.get(`[option-label="${product.color}"]`).click()
    cy.get('#qty').clear().type(product.defaultQty)
    cy.get('#product-addtocart-button').click()
    cy.get('.message-success').should('be.visible')
})

// Custom command to handle uncaught exceptions
Cypress.Commands.add('handleUncaughtException', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
})

// Custom command to verify error message
Cypress.Commands.add('verifyErrorMessage', (message) => {
    cy.get('.message-error, div.mage-error, .modal-content')
        .should('be.visible')
        .and('contain', message)
})
/// <reference types="cypress" />

import CartPage from '../../pages/cartPage'

describe('Shopping Cart Update Test Suite', () => {
    let product
    let errorMessages

    beforeEach(() => {
        cy.handleUncaughtException()
        cy.fixture('products').then((data) => {
            product = data.radiantTee
            errorMessages = data.errorMessages
        })
        cy.addProductToCart(product)
        CartPage.visitCart()
        CartPage.verifyProductInCart(product.name, product.defaultQty)
    })

    it('Should update product quantity in cart', () => {
        CartPage.updateQuantity(product.name, product.updatedQty)
        // cy.wait(1000)
        CartPage.verifyProductInCart(product.name, product.updatedQty)
    })

    it('Should show error when updating quantity to zero', () => {
        cy.get('table#shopping-cart-table')
            .contains('tr', product.name)
            .find('.input-text.qty')
            .as('qtyInput')
            .clear()
            .type('0')

        cy.get('.update').click()

        cy.get('@qtyInput')
            .should('have.class', 'mage-error')
            .should('have.value', '0')

        cy.verifyErrorMessage(errorMessages.invalidQty)
    })

    it('Should show error when exceeding stock quantity', () => {
        cy.get('table#shopping-cart-table')
            .contains('tr', product.name)
            .find('.input-text.qty')
            .as('qtyInput')
            .should('have.value', product.defaultQty)

        CartPage.updateQuantity(product.name, product.excessQty)

        cy.verifyErrorMessage(errorMessages.excessQty)

        CartPage.clickErrorOk()
    })

    it('Should maintain quantity when updating with same value', () => {
        CartPage.updateQuantity(product.name, product.defaultQty)
        cy.wait(1000)
        CartPage.verifyProductInCart(product.name, product.defaultQty)
    })
})
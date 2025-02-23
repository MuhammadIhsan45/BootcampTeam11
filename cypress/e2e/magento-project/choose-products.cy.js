/// <reference types="cypress" />

import ChooseProductsPage from '../../pages/chooseProductsPage'
import ProductPage from '../../pages/productPage'
import CartPage from '../../pages/cartPage'

const chooseProductsPage = new ChooseProductsPage()

describe('Product Selection Test Suite', () => {
    let product
    let errorMessages

    beforeEach(() => {
        cy.handleUncaughtException()
        cy.fixture('products').then((data) => {
            product = data.radiantTee
            errorMessages = data.errorMessages
        })

        chooseProductsPage.visit()
    })

    describe('Product Search and Navigation', () => {
        it('Should display product list', () => {
            cy.get('.product-item-info')
                .should('be.visible')
                .and('have.length.greaterThan', 0)
        })

        it('Should navigate to product detail page', () => {
            cy.get(':nth-child(1) > .product-item-info > .product-item-details > .product-item-name > .product-item-link')
                .then(($link) => {
                    const productName = $link.text().trim()
                    cy.wrap($link).click()
                    cy.url().should('include', '/radiant-tee.html')
                    cy.get('.page-title').should('contain', productName)
                })
        })
    })

    describe('Product Configuration', () => {
        beforeEach(() => {
            cy.visit('/radiant-tee.html')
            ProductPage.verifyProductTitle('Radiant Tee')
            ProductPage.verifyConfigurableOptions()
        })

        it('Should display configurable options', () => {
            ProductPage.verifyConfigurableOptions()
        })

        it('Should select size option', () => {
            ProductPage.selectSize('XS')
            ProductPage.verifySelectedSize('XS')
        })

        it('Should select color option', () => {
            ProductPage.selectColor('Blue')
            ProductPage.verifySelectedColor('Blue')
        })

        it('Should set quantity', () => {
            ProductPage.setQuantity('1')
        })
    })

    describe('Add to Cart Functionality', () => {
        beforeEach(() => {
            cy.visit('/radiant-tee.html')
            ProductPage.verifyProductTitle('Radiant Tee')
        })

        it('Should show error when adding without selecting options', () => {
            ProductPage.addToCart()
            ProductPage.verifyErrorMessage('This is a required field')
        })

        it('Should add product with selected options to cart', () => {
            ProductPage.configureProduct('XS', 'Blue', '1')
            ProductPage.addToCart()
            ProductPage.verifySuccessMessage()
        })

        it('Should add multiple products with different options', () => {
            ProductPage.configureProduct('XS', 'Blue', '1')
            ProductPage.addToCart()
            ProductPage.verifySuccessMessage()

            ProductPage.configureProduct('S', 'Purple', '1')
            ProductPage.addToCart()
            ProductPage.verifySuccessMessage()
        })
    })

    describe('Cart Management', () => {
        beforeEach(() => {
            cy.visit('/radiant-tee.html')
            ProductPage.verifyProductTitle('Radiant Tee')
            ProductPage.configureProduct('XS', 'Blue', '1')
            ProductPage.addToCart()
            ProductPage.verifySuccessMessage()
            CartPage.visitCart()
        })

        it('Should remove product from cart', () => {
            CartPage.removeProduct('Radiant Tee')
            CartPage.verifyEmptyCart()
        })

        it('Should navigate back to product from cart', () => {
            CartPage.clickProductLink('Radiant Tee')
            ProductPage.verifyProductTitle('Radiant Tee')
        })

        it('Should proceed to checkout', () => {
            CartPage.proceedToCheckout()
            cy.url().should('include', '/checkout')
        })
    })
})

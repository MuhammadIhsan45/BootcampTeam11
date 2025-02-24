class CartPage {
    elements = {
        cartTable: () => cy.get('table#shopping-cart-table'),
        cartItems: () => cy.get('.cart.items'),
        quantityInputs: () => cy.get('.input-text.qty'),
        updateCartBtn: () => cy.get('.update'),
        removeItemBtn: () => cy.get('.cart.table-wrapper .actions-toolbar>.action-delete'),
        emptyCartMessage: () => cy.get('.cart-empty'),
        checkoutBtn: () => cy.get('.checkout-methods-items .action.primary.checkout'),
        errorMessage: () => cy.get('.message-error, div.mage-error, .modal-content'),
        errorOkButton: () => cy.get('.modal-popup button.action-primary'),
        successMessage: () => cy.get('.message-success'),
        productLinks: () => cy.get('table#shopping-cart-table .product-item-name > a'),
        cartIcon: () => cy.get('.showcart'),
        proceedToCheckoutBtn: () => cy.get('#top-cart-btn-checkout'),
        miniCart: () => cy.get('#ui-id-1'),
        cartSubtotal: () => cy.get('.subtotal .price'),
        deleteConfirmButton: () => cy.get('button.action-accept')
    }

    visitCart() {
        cy.visit('/checkout/cart/')
        cy.wait(2000)
    }

    openMiniCart() {
        this.elements.cartIcon().click()
        cy.wait(1000)
    }

    updateQuantity(productName, quantity) {
        cy.get('table#shopping-cart-table')
            .contains('tr', productName)
            .find('.input-text.qty')
            .as('qtyInput')
            .clear()
            .type(quantity)

        cy.get('.update').click()

        if (quantity === '0') {
            cy.get('@qtyInput')
                .should('have.class', 'mage-error')
                .should('have.value', '0')
            return
        }

        cy.wait(2000)
    }

    clickErrorOk() {
        this.elements.errorOkButton()
            .should('be.visible')
            .click()

        cy.wait(2000)
    }

    removeProduct(productName) {
        cy.wait(2000)
        this.elements.removeItemBtn()
            .should('be.visible')
            .click({ force: true })
    }

    verifyProductInCart(productName, quantity) {
        cy.wait(1000)

        cy.get('table#shopping-cart-table')
            .contains('tr', productName)
            .find('.input-text.qty')
            .should('be.visible')
            .should('have.value', quantity)
    }

    verifyEmptyCart() {
        this.elements.emptyCartMessage().should('be.visible')
    }

    verifyCartSubtotal(expectedTotal) {
        this.elements.cartSubtotal().should('contain', expectedTotal)
    }

    proceedToCheckout() {
        this.elements.checkoutBtn().click()
    }

    attemptCheckout() {
        this.elements.checkoutBtn().click({ force: true })
    }

    verifyErrorMessage(message) {
        this.elements.errorMessage()
            .should('be.visible')
            .and('contain', message)
    }

    verifySuccessMessage(message) {
        this.elements.successMessage()
            .should('be.visible')
            .and('contain', message)
    }

    clickProductLink(productName) {
        cy.get('table#shopping-cart-table')
            .contains('.product-item-name > a', productName)
            .should('be.visible')
            .click()
    }
}

export default new CartPage()
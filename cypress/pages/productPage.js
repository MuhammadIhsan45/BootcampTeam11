class ProductPage {
    elements = {
        productTitle: () => cy.get('.page-title'),
        sizeOptions: () => cy.get('[attribute-code="size"] .swatch-option.text'),
        colorOptions: () => cy.get('[attribute-code="color"] .swatch-option.color'),
        quantityInput: () => cy.get('#qty'),
        addToCartBtn: () => cy.get('#product-addtocart-button'),
        stockStatus: () => cy.get('.stock span'),
        successMessage: () => cy.get('[data-ui-id="message-success"]'),
        errorMessageSize: () => cy.get('#super_attribute\\[143\\]-error'),
        errorMessageColor: () => cy.get('#super_attribute\\[93\\]-error'),
        price: () => cy.get('[data-price-type="finalPrice"] .price'),
        configurableOptions: () => cy.get('.swatch-attribute'),
        outOfStockMessage: () => cy.get('.stock.unavailable'),
        requiredFieldMessage: () => cy.get('#super_attribute[data-validate]'),
        selectedSize: () => cy.get('[attribute-code="size"] .swatch-attribute-selected-option'),
        selectedColor: () => cy.get('[attribute-code="color"] .swatch-attribute-selected-option')
    }

    selectSize(size) {
        const sizeMap = {
            'XS': '166',
            'S': '167',
            'M': '168',
            'L': '169',
            'XL': '170'
        }
        
        const sizeValue = sizeMap[size]
        if (!sizeValue) {
            throw new Error(`Invalid size: ${size}`)
        }

        cy.get(`#option-label-size-143-item-${sizeValue}`)
            .click()
            .should('have.attr', 'aria-checked', 'true')

        cy.wait(1000)
    }

    selectColor(color) {
        const colorMap = {
            'Blue': '50',
            'Orange': '56',
            'Purple': '57'
        }
        
        const colorValue = colorMap[color]
        if (!colorValue) {
            throw new Error(`Invalid color: ${color}`)
        }

        cy.get(`#option-label-color-93-item-${colorValue}`).click()
        
        cy.wait(500)
        
        cy.get('[attribute-code="color"]')
            .should('have.attr', 'option-selected', colorValue)

        cy.wait(1000)
    }

    setQuantity(quantity) {
        this.elements.quantityInput().clear().type(quantity)
        this.elements.quantityInput().should('have.value', quantity)
    }

    addToCart() {
        this.elements.addToCartBtn().click()
    }

    verifyProductTitle(title) {
        this.elements.productTitle().should('contain', title)
    }

    verifyStockStatus(status) {
        if (status === 'OUT_OF_STOCK') {
            this.elements.outOfStockMessage().should('be.visible')
        } else {
            this.elements.stockStatus().should('contain', status)
        }
    }

    verifySuccessMessage() {
        this.elements.successMessage()
            .should('be.visible')
            .and('contain', 'You added')
    }

    verifyErrorMessage(message) {
        this.elements.errorMessageSize()
            .should('be.visible')
            .and('contain', message)
        this.elements.errorMessageColor()
            .should('be.visible')
            .and('contain', message)
    }

    verifyPrice(price) {
        this.elements.price().should('contain', price)
    }

    verifyConfigurableOptions() {
        this.elements.configurableOptions().should('have.length', 2) 
        this.elements.sizeOptions().should('be.visible')
        this.elements.colorOptions().should('be.visible')
    }

    verifyRequiredOptions() {
        this.addToCart()
        this.elements.errorMessageSize()
            .should('exist')
            .and('contain', 'This is a required field')
        this.elements.errorMessageColor()
            .should('exist')
            .and('contain', 'This is a required field')
    }

    configureProduct(size, color, quantity = '1') {
        if (size) this.selectSize(size)
        if (color) this.selectColor(color)
        if (quantity) this.setQuantity(quantity)
    }

    verifySelectedSize(size) {
        const sizeMap = {
            'XS': '166',
            'S': '167',
            'M': '168',
            'L': '169',
            'XL': '170'
        }

        const sizeValue = sizeMap[size]
        if (!sizeValue) {
            throw new Error(`Invalid size: ${size}`)
        }

        this.elements.selectedSize()
            .should('contain', size)
    }

    verifySelectedColor(color) {
        const colorMap = {
            'Blue': '50',
            'Orange': '56',
            'Purple': '57'
        }

        const colorValue = colorMap[color]
        if (!colorValue) {
            throw new Error(`Invalid color: ${color}`)
        }

        this.elements.selectedColor()
            .should('contain', color)
    }
}

export default new ProductPage()

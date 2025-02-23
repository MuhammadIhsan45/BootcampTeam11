class ChooseProductsPage {
    visit() {
        cy.visit('/', {
            timeout: 60000,
            failOnStatusCode: false
        })
        cy.get('body').should('be.visible')
        cy.get('.page-wrapper').should('be.visible')
    }

    elements = {
        logo: () => cy.get('.logo > img'),
        searchBox: () => cy.get('#search'),
        shoppingCart: () => cy.get('.showcart'),
        menuItems: {
            whatsNew: () => cy.get('#ui-id-3 > span'),
            women: () => cy.get('#ui-id-4 > :nth-child(2)'),
            men: () => cy.get('#ui-id-5 > :nth-child(2)'),
            gear: () => cy.get('#ui-id-6 > :nth-child(2)'),
            training: () => cy.get('#ui-id-7 > :nth-child(2)'),
            sale: () => cy.get('#ui-id-8 > span')
        },
        filters: {
            size: (size) => cy.get(`[option-label="${size}"]`),
            color: (color) => cy.get(`[option-label="${color}"]`),
            price: {
                from: () => cy.get('#price-from'),
                to: () => cy.get('#price-to'),
                go: () => cy.get('.price-go')
            }
        },
        sorter: () => cy.get('#sorter'),
        searchResults: () => cy.get('.search.results'),
        noResults: () => cy.get('.message.notice'),
        productCount: () => cy.get('.toolbar-number')
    }

    verifyMainMenuItems() {
        this.elements.menuItems.whatsNew().should('have.text', "What's New")
        this.elements.menuItems.women().should('have.text', 'Women')
        this.elements.menuItems.men().should('have.text', 'Men')
        this.elements.menuItems.gear().should('have.text', 'Gear')
        this.elements.menuItems.training().should('have.text', 'Training')
        this.elements.menuItems.sale().should('have.text', 'Sale')
    }

    verifyHeaderElements() {
        this.elements.logo().should('have.attr', 'src')
        this.elements.searchBox().should('be.visible')
        this.elements.shoppingCart().should('be.visible')
    }

    searchProduct(keyword) {
        this.elements.searchBox().clear().type(`${keyword}{enter}`)
    }

    filterBySize(size) {
        this.elements.filters.size(size).click()
        cy.wait(1000)
    }

    filterByColor(color) {
        this.elements.filters.color(color).click()
        cy.wait(1000)
    }

    filterByPrice(from, to) {
        if (from) {
            this.elements.filters.price.from().clear().type(from)
        }
        if (to) {
            this.elements.filters.price.to().clear().type(to)
        }
        this.elements.filters.price.go().click()
        cy.wait(1000)
    }

    sortBy(option) {
        this.elements.sorter().select(option)
        cy.wait(1000)
    }

    verifySearchResults(shouldExist = true) {
        if (shouldExist) {
            this.elements.searchResults().should('exist')
            this.elements.productCount().should('exist')
        } else {
            this.elements.noResults().should('be.visible')
        }
    }

    verifyProductCount(comparison, count) {
        this.elements.productCount().invoke('text').then((text) => {
            const number = parseInt(text)
            expect(number).to[comparison](count)
        })
    }
}

export default ChooseProductsPage
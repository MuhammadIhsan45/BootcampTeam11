import RegistrationPage from '../../pages/registrationPage'
import '../../support/commands'
const registrationPage = new RegistrationPage()

describe('Verify Registration Functionallity', () => {
    beforeEach(() => {
      registrationPage.visit()
    })

    it('Create an Account With Invalid Data', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        cy.fixture('user').then((user) => {
            user.email = user.invalidEmail
            cy.registerUser(user)
        cy.get('#email_address-error').should('have.text','Please enter a valid email address (Ex: johndoe@domain.com).')
        })
    })

    it('Create an Account With Empty Required Data', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        cy.get('#firstname').clear()
        cy.get('#lastname').clear()
        cy.get('#email_address').clear()
        cy.get('#password').clear()
        cy.get('#password-confirmation').clear()
        cy.get('.action.submit.primary').click()
        cy.get('#firstname-error').should('have.text','This is a required field.')
        cy.get('#lastname-error').should('have.text','This is a required field.')
        cy.get('#email_address-error').should('have.text','This is a required field.')
        cy.get('#password-error').should('have.text','This is a required field.')
    })

    it('Create an Account With Invalid Password', () => {
        registrationPage.clickCreateAccount()
        registrationPage.verifyPageTitle()
        cy.fixture('user').then((user) => {
            user.password = user.invalidPassword
            cy.registerUser(user)
        cy.get('#password-error').should('have.text','Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.')
        })
    })

    // it('Create an Account With Valid Data', () => {
    //     registrationPage.clickCreateAccount()
    //     registrationPage.verifyPageTitle()
    //     cy.fixture('user').then((user) => {
    //         cy.registerUser(user)
    //         cy.url().should('eq', 'https://magento.softwaretestingboard.com/customer/account/')
    //         cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]').should('have.text', 'Thank you for registering with Main Website Store.')
    //     })
    // })
})
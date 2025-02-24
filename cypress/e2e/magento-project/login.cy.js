import LoginPage from '../../pages/loginPage'
import '../../support/commands'

const loginPage = new LoginPage()

describe('Verify Login Functionality', () => {
  beforeEach(() => {
    loginPage.visit()
  })

  it('Login with Invalid Email', () => {
    loginPage.verifyPageTitle()
    cy.fixture('user').then((user) => {
      user.email = user.invalidEmail
      cy.login(user)
      cy.get('.mage-error').should('contain', 'Please enter a valid email address (Ex: johndoe@domain.com).')
    })
  })

  it('Login with Invalid Password', () => {
    loginPage.verifyPageTitle()
    cy.fixture('user').then((user) => {
      user.password = user.invalidPassword
      cy.login(user)
      cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]').should('contain', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
    })
  })

  //   -- script case ini belum fix -- 
  //   it('Login with Empty Credentials', () => {
  //     loginPage.verifyPageTitle()
  //     cy.get('#send2').click() 
  //     cy.get('.mage-error', { timeout: 10000 }).should('be.visible').and('have.text', 'This is a required field.')
  //     cy.get('.mage-error', { timeout: 10000 }).should('be.visible').and('have.text', 'This is a required field.')
  //   })

  it('Login with Valid Credentials', () => {
    loginPage.verifyPageTitle()
    cy.fixture('user').then((user) => {
      cy.login(user)
      cy.url().should('eq', 'https://magento.softwaretestingboard.com/customer/account/')
    })
  })

})

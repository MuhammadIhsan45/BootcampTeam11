/// <reference types="cypress" />

// import ChooseProductsPage from '../../pages/chooseProductsPage'
// import ProductPage from '../../pages/productPage'
// import CartPage from '../../pages/cartPage'
// import productPage from '../../pages/productPage'
// describe('Proceed To Checkout', () => {

//   beforeEach(() => {
//     cy.visit('')
//   })
//   it('Success proceed to checkout - without Login', () => {

//     cy.addProductRadiantTee()
//     cy.get(productPage.radiant_tree).should('be.visible')
//     cy.selectSize('XS')
//     // cy.selectColor('Blue')
//     cy.get('.swatch-attribute.color > .swatch-attribute-options').contains('1').click()
//   })
// })
import LoginPage from '../../pages/loginPage'
import CartPage from '../../pages/cartPage'
import checkoutPage from '../../pages/checkoutPage'

const loginPage = new LoginPage()

describe('proceed to checkout ', () => {
  let errorMessages
  beforeEach(() => {
    loginPage.visit()
    loginPage.verifyPageTitle()
    cy.fixture('user').then((user) => {
      cy.login(user)
      checkoutPage.toRadiantTee()
    })
    cy.fixture('products').then((data) => {
      errorMessages = data.errorMessages
    })
  })


  it('Success Proceed to Checkout Test - default', () => {
    cy.wait(3000)
    checkoutPage.clickCart()
    checkoutPage.clickCheckout()
    cy.wait(3000)
    checkoutPage.verifyShippingAddress()
    cy.wait(3000)
    checkoutPage.buttonNextOrderSummary()
    cy.wait(3000)
    checkoutPage.verifyPaymentMethod()
    cy.wait(3000)
    checkoutPage.buttonPlaceOrder()
    checkoutPage.verifySuccessMessagepurchase('Thank you for your purchase!')

  })

  it('Success Proceed to Checkout Test - New Address', () => {
    cy.wait(3000)
    checkoutPage.clickCart()
    checkoutPage.clickCheckout()
    checkoutPage.verifyShippingAddress()
    checkoutPage.buttonNewAddress()
    cy.inputTextCO(checkoutPage.first_name, 'Eleven11')
    cy.inputTextCO(checkoutPage.last_name, 'Team11')
    cy.inputTextCO(checkoutPage.company, 'Sanbercode')
    cy.inputTextCO(checkoutPage.street_address1, 'Jl.Poltangan')
    cy.inputTextCO(checkoutPage.street_address2, 'No.12, Rt.012/Rw.002')
    cy.inputTextCO(checkoutPage.street_address3, 'Kec.Pancoran Mas')
    cy.inputTextCO(checkoutPage.city, 'DKI Jakarta')
    cy.wait(1000)
    cy.selectCountry(checkoutPage.country, 'Australia')
    cy.inputTextCO(checkoutPage.zip_portalcode, '009221')
    cy.selectProvince(checkoutPage.state_province, 'Victoria')
    cy.inputTextCO(checkoutPage.phone_number, '0812')
    checkoutPage.buttonNextShippingAddress()
    cy.wait(1000)
    checkoutPage.buttonNextOrderSummary()
    checkoutPage.verifyPaymentMethod()
    checkoutPage.buttonPlaceOrder()
    checkoutPage.verifySuccessMessagepurchase('Thank you for your purchase!')
  })


  it('Invalid Proceed to Checkout Test - Negative New Address', () => {
    cy.wait(3000)
    checkoutPage.clickCart()
    checkoutPage.clickCheckout()
    checkoutPage.verifyShippingAddress()
    checkoutPage.buttonNewAddress()
    cy.inputTextCO(checkoutPage.first_name, 'Eleven11')
    cy.inputTextCO(checkoutPage.last_name, 'Team11')
    cy.inputTextCO(checkoutPage.company, 'Sanbercode')
    cy.inputTextCO(checkoutPage.street_address1, 'Jl.Poltangan')
    cy.inputTextCO(checkoutPage.street_address2, 'No.12, Rt.012/Rw.002')
    cy.inputTextCO(checkoutPage.street_address3, 'Kec.Pancoran Mas')
    // cy.inputTextCO(checkoutPage.city, '')
    cy.wait(1000)
    cy.selectCountry(checkoutPage.country, 'Australia')
    // cy.inputTextCO(checkoutPage.zip_portalcode, '')
    // cy.selectProvince(checkoutPage.state_province, '')
    // cy.inputTextCO(checkoutPage.phone_number, '')
    checkoutPage.buttonNextShippingAddress()
    cy.wait(1000)
    cy.verifyErrorMessage(errorMessages.emptyFieldNewAddress)
    // checkoutPage.buttonNextOrderSummary()
    // checkoutPage.verifyPaymentMethod()
    // checkoutPage.buttonPlaceOrder()
    // checkoutPage.verifySuccessMessagepurchase('Thank you for your purchase!')
  })

})




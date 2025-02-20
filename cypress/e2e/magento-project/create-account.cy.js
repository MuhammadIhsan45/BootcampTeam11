describe('Verify Registration Functionallity', () => {
  beforeEach(() => {
    cy.visit('')
  })
  it('Create An Account', () => {
    cy.get('[href="https://magento.softwaretestingboard.com/customer/account/create/"').click
    cy.get('#firstname').type('Eleven')
    cy.get('#lastname').type('Team')
  })
})
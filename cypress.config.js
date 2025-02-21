const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    baseUrl: 'https://magento.softwaretestingboard.com',
 main
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 3000,
    screenshotOnRunFailure: false
  },
});

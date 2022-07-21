const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    testUserPassword: process.env.TEST_USER_PASSWORD,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

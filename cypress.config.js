const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

//const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  projectId: 'y4hsnk',
  "reporter": "mochawesome",
  "reporterOptions":{
  "reportDir": "cypress/report/mochawesome-report",
  "overwrite":true,
  "html":true,
  "json": false,
  "timestamp":"mmddyyyy_HHMMss"
},
chainWebpack: (config) => {
  config.plugin("polyfills").use(NodePolyfillPlugin);
},

e2e: {
    setupNodeEvents,
    excludeSpecPattern: "*.js",
    specPattern: ['cypress/e2e/**/*.{feature, features}'],
    baseUrl: "https://bugbank.netlify.app/",
    chromeWebSecurity: false,
    allureReuseAfterSpec: true,

  },
});

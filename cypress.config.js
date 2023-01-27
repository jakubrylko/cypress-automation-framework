const { defineConfig } = require('cypress');
const fs = require('fs-extra');
const path = require('path');
const cucumber = require('cypress-cucumber-preprocessor').default;

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress/config', `${file}.json`);

  if (!fs.existsSync(pathToConfigFile)) {
    console.log('No custom config file found');
    return {};
  }

  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  projectId: 'me28b4',
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())

      const file = config.env.configFile || ''
      return getConfigurationByFile(file)
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    excludeSpecPattern: "cypress/e2e/ignore-folder/*",
    baseUrl: "http://www.webdriveruniversity.com",
    experimentalStudio: true,
    chromeWebSecurity: false,
    hideXHRInCommandLog: true,
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    trashAssetsBeforeRuns: true,
    screenshotOnRunFailure: true,
    videoUploadOnPasses: false,
    video: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
    retries: {
      runMode: 1,
      openMode: 1
    },
    env: {
      firstName: 'Sarah',
      webDriverUni: 'http://www.webdriveruniversity.com'
    }
  },
});
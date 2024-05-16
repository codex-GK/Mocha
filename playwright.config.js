// @ts-check
const { defineConfig, devices } = require("@playwright/test");

const config = {
  testDir: "./tests",
  outputDir: "./test-results",
  /* Run tests in files in parallel */
  fullyParallel: true,

  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },

  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: "chromium",
    //browserName : 'webkit',
    // hesdless : true -->this will not show the browser opening
    headless: true,
    //browserName : 'chrome'
    screenshot: "on",
    trace: "on",

    //trace: "retain-on-failure",
  },
};
module.exports = config;

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
  projects: [
    {
      name: "safari",
      use: {
        //browserName: "chromium",
        browserName: "webkit",
        // hesdless : true -->this will not show the browser opening
        headless: false,
        //browserName : 'webkit'
        screenshot: "on",
        video: "retain-on-failure",

        trace: "retain-on-failure",
        //...devices["iPhone 13 Pro Max"],
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        //browserName : 'webkit',
        // hesdless : true -->this will not show the browser opening
        headless: false,
        //browserName : 'webkit'
        screenshot: "on",
        video: "retain-on-failure",
        //trace: "retain-on-failure",
        trace: "on",
        //viewport: { width: 720, height: 720 },
        //ignorehttpserrors: true, //to handle ssl certification errors automatically
        //Permissions: ["geolocation"], //to allow when google ask permission for location
      },
    },
  ],
};
module.exports = config;

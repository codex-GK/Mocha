const { test, expect } = require("@playwright/test");

test("rahulshettyAcademy", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");

  const email = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const login = page.locator("#login");
  await email.fill("brti1@gmail.com");
  await password.fill("Test@12345");
  await login.click();
  console.log(await page.locator(".card-body b").nth(0).textContent());
  await page.locator(".card-body b").first().waitFor();
  console.log(await page.locator(".card-body b").allTextContents());
  await page.pause();
});

test.only("dropdownAndRadiobuttons", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("select.form-control").selectOption("teach");
  await page.locator("span.checkmark").nth(1).click();
  await page.locator("#okayBtn").click();

  await page.pause();
});

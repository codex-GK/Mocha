const { test, expect } = require("@playwright/test");

test("@smoke Popup validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://google.com/");
  await page.goBack(); //navigates the web page to back
  await page.goForward(); //navigates the web page to forwasrd
  await page.goBack();
  await expect(page.locator("#hide-textbox")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#show-textbox")).toBeTruthy();
  await page.locator("#show-textbox").click();
  //await page.pause();

  //Handling java pop ups, we use on method()
  await page.locator("#confirmbtn").click();
  await page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();

  //How to handle Frames
  const frameVariable = await page.frameLocator("#courses-iframe");
  //if there are two elements with the attribute and one is not visible, we use :visible keyword to click on the visible element
  await frameVariable.locator("li a[href*='lifetime-access']:visible").click();
  const verbiage = await frameVariable.locator(".text h2").textContent();
  console.log(verbiage);
  console.log(verbiage.split(" ")[1]);
  await page.pause();
});

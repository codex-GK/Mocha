import { test, expect } from "@playwright/test";
test("@smoke special Locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Student").check(); //.click and .check works the same
  await page.getByLabel("Gender").selectOption("Male");

  //get by place holder

  //if there is any attribute containing placeholder we can use placeholder

  await page.getByPlaceholder("Password").fill("asas12");

  //get by role
  await page.getByRole("button", { name: "Submit" }).click();
  //get by text, just copy the text u see on the UI, not from the inspect element property

  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();
  //whenever ther is property a i.e anchor tag with href it is a link

  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button", { name: "Add" })
    .click();
});

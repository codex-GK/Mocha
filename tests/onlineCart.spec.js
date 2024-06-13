const { test, expect } = require("@playwright/test");
//const { apiUtils } = require("../Utils/apiUtils");
test("shoppingCart", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");
  const email = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const login = page.locator("#login");
  const products = page.locator(".card-body");
  const productname = "ZARA COAT 3";

  await email.fill("brti1@gmail.com");
  await password.click();
  await password.fill("Test@12345");
  await login.click();
  await page.locator(".card-body").first().waitFor();
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productname) {
      await products.nth(i).locator("text = Add To Cart").click();
      break;
    }
  }
  await page.locator("button[routerlink='/dashboard/cart']").click();
  //await page.locator("[routerlink='/dashboard/cart']").click();
  await page.locator("text=Checkout").click();
  const country = await page
    .locator("[placeholder='Select Country']")
    .type("ind", { delay: 1000 });
  const dropdownBox = page.locator(".ta-results");

  const countryList = await page.locator(".ta-results button").count();

  for (let i = 0; i < countryList; ++i) {
    const countryName = await page
      .locator(".ta-results button")
      .nth(i)
      .textContent();
    if (countryName === " India") {
      await page.locator(".ta-results button").nth(i).click();
      break;
    }
  }
  await page.locator("text = Place Order ").click();

  const ordrID = await page.locator("label.ng-star-inserted").textContent();
  console.log("order id", ordrID);

  await page.locator("label[routerlink = '/dashboard/myorders']").click();

  await page.locator(".ng-star-inserted h1").waitFor();
  const row = await page.locator("tbody th").all();
  for (let i = 0; i < (await row.length); ++i) {
    const rowOrdrID = await row[i].textContent();
    console.log("orderlistid", rowOrdrID);

    if (ordrID.includes(rowOrdrID)) {
      const viewButton = await page.locator("tr td button.btn-primary").nth(i);
      await viewButton.click();

      break;
    }
  }
  await page.pause();
});

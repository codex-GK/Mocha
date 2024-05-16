const { test, expect } = require("@playwright/test");

test("Page rsaTester", async ({ page }) => {
  //await page.goto("https://rahulshettyacademy.com/client");
  await page.goto("https://rahulshettyacademy.com/client");
  //console.log(await page.title());
  //expect(page).tohavetitle("Google");
  //await expect(page).toHaveTitle("Google");

  const email = page.locator("#userEmail");
  //const phone = page.locator("#userMobile");
  const password = page.locator("#userPassword");
  const login = await page.locator("#login");
  const products = await page.locator(".card-body");
  const item = "IPHONE 13 PRO";

  await email.click();
  await email.fill("brti1@gmail.com");
  //await phone.click();
  //await phone.fill("1234567845");
  await password.click();
  await password.type("Test@12345");
  await login.click();
  await page.locator(".card-body").first().waitFor();
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === item) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  const cart = await page.locator("[routerlink*='cart']").click();
  const cartItems = await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();

  const country = await page
    .locator("[placeholder*='Country']")
    .type("ind", { delay: 1000 });

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();

  const dropdownOptionsCount = await page.locator(".ta-results button").count();

  for (let i = 0; i < dropdownOptionsCount; i++) {
    const countryName = await page
      .locator(".ta-results button")
      .nth(i)
      .textContent();

    if (countryName === " India") {
      await page.locator(".ta-results button").nth(i).click();

      break;
    }
  }
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderId = await page.locator("label.ng-star-inserted").textContent();
  console.log(orderId);

  await page.locator("button[routerlink*='orders']").click();
  await page.locator(".ng-star-inserted h1").waitFor();

  const row = await page.locator("tbody th").all();
  for (let i = 0; i < (await row.length); ++i) {
    const rowOrdrID = await row[i].textContent();
    console.log(rowOrdrID);

    if (orderId.includes(rowOrdrID)) {
      const viewButton = await page.locator("tr td button.btn-primary").nth(i);
      await viewButton.click();

      break;
    }
  }
  await page.pause();
});

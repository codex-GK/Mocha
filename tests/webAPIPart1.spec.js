const { test, expect, request } = require("@playwright/test");
const { apiUtils } = require("../Utils/apiUtils");
const loginPayLoad = {
  userEmail: "brti1@gmail.com",
  userPassword: "Test@12345",
};
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }],
};
//let token;
//let orderID;
//request library: Exposes API that can be used for WEB API testing

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiutils = new apiUtils(apiContext, loginPayLoad);
  response = await apiutils.createOrder(orderPayload);
});

test("place The Order", async ({ page }) => {
  //const apiutils = new apiUtils(apiContext,loginPayLoad)
  //const orderID = createOrder(orderPayload);
  //we have to execute javascript exprerssions to "insert token" into the browser local storage, playwright by default doesnt insert token, so we use addInitscript
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("button[routerlink*='orders']").click();
  await page.locator(".ng-star-inserted h1").waitFor();

  const row = await page.locator("tbody th").all();
  for (let i = 0; i < (await row.length); ++i) {
    const rowOrdrID = await row[i].textContent();
    console.log(rowOrdrID);

    if (response.orderID.includes(rowOrdrID)) {
      const viewButton = await page.locator("tr td button.btn-primary").nth(i);
      await viewButton.click();

      break;
    }
  }
  await page.pause();
});

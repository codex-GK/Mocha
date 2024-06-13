const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
//converting json file to string and string to java script object
//json to string-->using strigify method(); string to java object using parse method()
const dataset = JSON.parse(
  JSON.stringify(require("../Utils/pageObjectImpTestData.json"))
);
for (const data of dataset) {
  //${} this will evaluate as expression if not is is considered as a regular string
  test(`client app login for ${data.item}`, async ({ page }) => {
    const pomanager = new POManager(page);

    const loginPage = pomanager.getLoginPage();
    await loginPage.url();
    await loginPage.validLogin(data.email, data.password);

    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.itemname(data.item);
    await dashboardpage.navigatetocart();

    const mycartpage = pomanager.getMycartPage();
    await mycartpage.checkouts();

    const paymentorders = pomanager.getPaymentOrders();
    await paymentorders.dropdowns("ind", "India");
    await paymentorders.placeorder();

    // expect(page.locator(".hero-primary")).toHaveText(
    // " Thankyou for the order. "
    //);
    const orderId = await page.locator("label.ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='orders']").click();
    await page.locator(".ng-star-inserted h1").waitFor();

    const row = await page.locator("tbody th").all();
    for (let i = 0; i < (await row.length); ++i) {
      const rowOrdrID = await row[i].textContent();
      console.log(rowOrdrID);

      if (orderId.includes(rowOrdrID)) {
        const viewButton = await page
          .locator("tr td button.btn-primary")
          .nth(i);
        await viewButton.click();

        break;
      }
    }
    await page.pause();
  });
}

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.cart = page.locator("[routerlink*='cart']");
    //this.cart = page.locator("[routerlink = '/dashboard/cart']");
  }

  async itemname(item) {
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if ((await this.products.nth(i).locator("b").textContent()) === item) {
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }

  async navigatetocart() {
    await this.cart.click();
  }
}
module.exports = { DashboardPage };

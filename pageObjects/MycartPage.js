class MycartPage {
  constructor(page) {
    this.page = page;
    this.cartitems = page.locator("div li").first();
    this.checkout = page.locator("text=Checkout");
  }
  async checkouts() {
    await this.cartitems.waitFor();
    await this.checkout.click();
  }
}
module.exports = { MycartPage };

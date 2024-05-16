class PaymentOrders {
  constructor(page) {
    this.page = page;
    this.country = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator(".ta-results");
    //this.dropdownOptionsCount = page.locator("button");
    this.submitorder = page.locator(".action__submit");
  }
  async dropdowns(countryCode, countryName) {
    // await this.country.type("ind");
    await this.country.type(countryCode, { delay: 1000 });
    await this.dropdown.waitFor();
    //await this.dropdownOptionsCount.count();
    const dropdownOptionsCount = await this.dropdown.locator("button").count();

    for (let i = 0; i < dropdownOptionsCount; i++) {
      const text = await this.dropdown.locator("button").nth(i).textContent();

      console.log("text for testing", text);
      if (text.trim() === countryName) {
        //await this.page.locator(".ta-results button").waitFor();
        await this.dropdown.locator("button").nth(i).click();

        break;
      }
    }
  }
  async placeorder() {
    //await this.page.locator(".ta-results button").waitFor();
    await this.submitorder.click();
  }
}
module.exports = { PaymentOrders };

class LoginPage {
  constructor(page) {
    this.login = page.locator("#login");
    this.email = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.page = page;
  }
  async url() {
    // console.log("Testing 3",this.page);
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validLogin(email, password)   {
    await this.email.click();
    await this.email.fill(email);

    await this.password.click();
    await this.password.type(password);
    await this.login.click();
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { LoginPage };

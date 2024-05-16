const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { MycartPage } = require("./MycartPage");
const { PaymentOrders } = require("./PaymentOrders");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardpage = new DashboardPage(this.page);
    this.mycartpage = new MycartPage(this.page);
    this.paymentorders = new PaymentOrders(this.page); 
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardpage;
  }
  getMycartPage() {
    return this.mycartpage;
  }
  getPaymentOrders() {
    return this.paymentorders;
  }
}
module.exports = { POManager };

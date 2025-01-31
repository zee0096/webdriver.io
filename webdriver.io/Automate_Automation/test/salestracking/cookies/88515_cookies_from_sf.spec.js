const SalesTrackingPage = require('../../../pages/salestracking/salestracking.page');
const ShoppingPage = require('../../../pages/salestracking/shopping.page');
const StorefrontPage = require('../../../pages/storefront.page');
const Contact = require('../../../pages/salestracking/contact');
const CookiePage = require('../../../lib/cookie');
const ReportSalesPage = require('../../../pages/backoffice/reports/reportsales.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(!SalesTrackingPage.isCookieTracking || StorefrontPage.isTeamMode)(`${StorefrontPage.RETAILER} 
  Salestracking cookies from Storefront`, () => {
  it('C88515 As a customer, salestracking cookies are applied '
    + 'when navigating to the rep storefront', () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('88515');

    speclib.addStepAutoNumber('Open storefront');
    if (!StorefrontPage.isProdEnv) {
      StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);
    }
    ShoppingPage.openShoppingPage();

    speclib.addStepAutoNumber('Verify Cookie Tracking - acquisition');
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('storefront');
    speclib.addStepAutoNumber('Verify Cookie Tracking - value of tracking cookie');
    expect(CookiePage.valueOfTrackingCookie()).toEqual('true');
    speclib.addStepAutoNumber('Verify Cookie Tracking - tracking rep cookie');
    expect(CookiePage.valueOfTrackingRepCookie()).toEqual(ShoppingPage.REP_NAME);
    speclib.addStepAutoNumber('Verify Cookie Tracking - footer session');
    expect(CookiePage.valueOfTrackingFooterRepSessionCookie()).toEqual(SalesTrackingPage.REP_NAME);

    speclib.addStepAutoNumber('Pause for 1 minute for expiration to be updated');
    // eslint-disable-next-line wdio/no-pause
    browser.pause(60000);

    speclib.addStepAutoNumber('Refresh page');
    ShoppingPage.refreshPage(1000, { pauseForLocalStorage : true });

    speclib.addStepAutoNumber('Verify Cookie Tracking after refresh - acquisition');
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('storefront');
    speclib.addStepAutoNumber('Verify Cookie Tracking after refresh - tracking cookie');
    expect(CookiePage.valueOfTrackingCookie()).toEqual('true');
    speclib.addStepAutoNumber('Verify Cookie Tracking after refresh - Rep Name');
    expect(CookiePage.valueOfTrackingRepCookie()).toEqual(ShoppingPage.REP_NAME);
    speclib.addStepAutoNumber('Verify Cookie Tracking after refresh - Footer session');
    expect(CookiePage.valueOfTrackingFooterRepSessionCookie()).toEqual(SalesTrackingPage.REP_NAME);

    if (!StorefrontPage.isProdEnv && SalesTrackingPage.hasProducts) {
      speclib.addStepAutoNumber('Do a Transaction');
      SalesTrackingPage.makeTransaction({ productId : 'fakeForC88515' });

      speclib.addStepAutoNumber('Log in BO');
      SalesTrackingPage.openBoAndLoginByRole(SalesTrackingPage.ROLE.rep, false);

      speclib.addStepAutoNumber('Get the information of the sale for the specified transaction ID');
      const SALE = SalesTrackingPage.getSale(SalesTrackingPage.transaction.ID);

      speclib.addStepAutoNumber('Verify Sale\'s data - acquisition');
      expect(SALE.acquisition).toEqual('storefront');
      speclib.addStepAutoNumber('Verify Sale\'s data - full name');
      expect(SALE.customer_name).toEqual(Contact.fullName);
      speclib.addStepAutoNumber('Verify Sale\'s data - e-mail');
      expect(SALE.customer_email).toEqual(Contact.email);
      speclib.addStepAutoNumber('Verify Sale\'s data - Unit price');
      expect(SALE.total).toEqual(`${SalesTrackingPage.transaction.unitPrice}00`);
      expect(SALE.quantities).toEqual('1');

      speclib.addStepAutoNumber('Open BO');
      ReportSalesPage.openBoLoginPage(true);

      speclib.addStepAutoNumber('Navigate to the Reports');
      ReportSalesPage.clickOnReportsMnu();

      speclib.addStepAutoNumber('Navigate to the Sales sub tab');
      ReportSalesPage.clickOnSalesTab();

      speclib.addStepAutoNumber(`Find the transaction by id:${SalesTrackingPage.transaction.ID}`);
      const trxInReportsObj = ReportSalesPage.findTransactionInRow(SalesTrackingPage.transaction.ID);

      speclib.addStepAutoNumber('Verify the transaction details');
      expect(trxInReportsObj).toBeGreaterThanOrEqual(0);

      speclib.addStepAutoNumber(`Verify the price:${SalesTrackingPage.transaction.unitPrice}`);
      expect(ReportSalesPage.saleAmountTotal(trxInReportsObj).getText())
        .toContain(`${SalesTrackingPage.transaction.unitPrice}`);

      speclib.addStepAutoNumber('Click show more details');
      ReportSalesPage.clickOnShowDetails(trxInReportsObj);

      speclib.addStepAutoNumber('Verify the transaction details(show more)');
      expect(ReportSalesPage.valuesOfPrd).toContain('1X');
      expect(ReportSalesPage.valuesOfPrd).toContain(`${SalesTrackingPage.transaction.productId}`);
    }
  });
});

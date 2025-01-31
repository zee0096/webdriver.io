const SalesTrackingPage = require('../../../pages/salestracking/salestracking.page');
const ShoppingPage = require('../../../pages/salestracking/shopping.page');
const StorefrontPage = require('../../../pages/storefront.page');
const Contact = require('../../../pages/salestracking/contact');
const LocalStoragePage = require('../../../pages/salestracking/localStorage.page');
const ReportSalesPage = require('../../../pages/backoffice/reports/reportsales.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(SalesTrackingPage.isCookieTracking)(`${StorefrontPage.RETAILER} 
  Local storage salestracking by Storefront`, () => {
  it('C88511 Local storage salestracking is applied when navigating to the rep storefront', () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('88511');

    speclib.addStepAutoNumber('Open storefront');
    if (!StorefrontPage.isProdEnv) {
      StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);
    }
    ShoppingPage.openShoppingPage();

    speclib.addStepAutoNumber('Verify Local Storage - Acquisition');
    expect(LocalStoragePage.valueOfAcquisition()).toEqual('storefront');
    speclib.addStepAutoNumber('Verify Local Storage - RepName');
    expect(LocalStoragePage.valueOfTrackingRep()).toEqual(SalesTrackingPage.REP_NAME);
    speclib.addStepAutoNumber('Verify Local Storage - RepName in footer session');
    expect(LocalStoragePage.valueOfFooterRepSession()).toEqual(SalesTrackingPage.REP_NAME);
    speclib.addStepAutoNumber('Verify Local Storage - value of tracking');
    expect(LocalStoragePage.valueOfTracking()).toEqual('true');

    speclib.addStepAutoNumber('Verify expiration dates');
    LocalStoragePage.setTrackingRepTimeStamp(LocalStoragePage.getExpirationDateOfTrackingRep());
    expect(LocalStoragePage.expirationDateOfTrackingRep()).toBeGreaterThan(82800000);
    expect(LocalStoragePage.expirationDateOfTrackingRep()).toBeLessThan(86400000);

    LocalStoragePage.setTrackingTimeStamp(LocalStoragePage.getExpirationDateOfTracking());
    expect(LocalStoragePage.expirationDateOfTracking()).toBeGreaterThan(82800000);
    expect(LocalStoragePage.expirationDateOfTracking()).toBeLessThan(86400000);

    speclib.addStepAutoNumber('Pause for 1 minute for expiration to be updated');
    // eslint-disable-next-line wdio/no-pause
    browser.pause(60000);

    speclib.addStepAutoNumber('Refresh page');
    ShoppingPage.refreshPage(1000, { pauseForLocalStorage : true });

    speclib.addStepAutoNumber('Verify Local Storage after refresh - Acquisition');
    expect(LocalStoragePage.valueOfAcquisition()).toEqual('storefront');
    speclib.addStepAutoNumber('Verify Local Storage after refresh - REP_NAME tracking');
    expect(LocalStoragePage.valueOfTrackingRep()).toEqual(SalesTrackingPage.REP_NAME);
    speclib.addStepAutoNumber('Verify Local Storage after refresh - REP_NAME session');
    expect(LocalStoragePage.valueOfFooterRepSession()).toEqual(SalesTrackingPage.REP_NAME);
    speclib.addStepAutoNumber('Verify Local Storage after refresh - Value of tracking');
    expect(LocalStoragePage.valueOfTracking()).toEqual('true');

    speclib.addStepAutoNumber('Verify expiration dates after refresh');
    expect(LocalStoragePage.expirationDateOfTrackingRep()).toBeGreaterThan(82800000);
    expect(LocalStoragePage.expirationDateOfTrackingRep()).toBeLessThan(86400000);

    expect(LocalStoragePage.expirationDateOfTracking()).toBeGreaterThan(82800000);
    expect(LocalStoragePage.expirationDateOfTracking()).toBeLessThan(86400000);

    expect(LocalStoragePage.sf_wdt_tracking_rep_timeStamp)
      .toBeLessThan(LocalStoragePage.getExpirationDateOfTrackingRep());
    expect(LocalStoragePage.sf_wdt_tracking_timeStamp)
      .toBeLessThan(LocalStoragePage.getExpirationDateOfTracking());

    if (!StorefrontPage.isProdEnv) {
      speclib.addStepAutoNumber('Do a Transaction');
      SalesTrackingPage.makeTransaction({ productId : 'fakeForC88511' });

      speclib.addStepAutoNumber('Log in BO');
      SalesTrackingPage.openBoAndLoginByRole(SalesTrackingPage.ROLE.rep, false);

      speclib.addStepAutoNumber('Get the information of the sale for the specified transaction ID');
      const SALE = SalesTrackingPage.getSale(SalesTrackingPage.transaction.ID);

      speclib.addStepAutoNumber('Verify Sale\'s acquisition data');
      expect(SALE.acquisition).toEqual('storefront');
      speclib.addStepAutoNumber('Verify Sale\'s attribution data');
      expect(SALE.attribution).toEqual('storefront');
      speclib.addStepAutoNumber('Verify customer fullName');
      expect(SALE.customer_name).toEqual(Contact.fullName);
      speclib.addStepAutoNumber('Verify customer email');
      expect(SALE.customer_email).toEqual(Contact.email);
      speclib.addStepAutoNumber('Verify Product price');
      expect(SALE.total).toEqual(`${SalesTrackingPage.transaction.unitPrice}00`);
      speclib.addStepAutoNumber('Verify qty of Product');
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

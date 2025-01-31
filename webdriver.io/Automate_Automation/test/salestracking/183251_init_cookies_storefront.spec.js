const ShoppingPage = require('../../pages/salestracking/shopping.page');
const CookiePage = require('../../lib/cookie');
const speclib = require('../../lib/speclib');
const StorefrontPage = require('../../pages/storefront.page');
const { hasFooter } = require('../../pages/footer.page');
const SalesTrackingPage = require('../../pages/salestracking/salestracking.page');
const ReportSalesPage = require('../../pages/backoffice/reports/reportsales.page');

speclib.descSkipIf(!ShoppingPage.isCookieTracking)(`${ShoppingPage.RETAILER} New Salestracking`, () => {
  it('C183251 Salestracking Initiation - Cookies by Storefront - URL with sf_rep/sf_store parameter', () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('183251');

    if (!StorefrontPage.isProdEnv) {
      StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);
    }

    speclib.addStepAutoNumber('Open Shopping page');
    ShoppingPage.openShoppingPage();

    if (hasFooter) {
      speclib.addStepAutoNumber('Verify Footer is displayed');
      expect(ShoppingPage.footer).toBeDisplayed();
    }

    speclib.addStepAutoNumber('Verify sf_rep/sf_store to be displayed in URL');
    expect(browser).toHaveUrlContaining(SalesTrackingPage.modeParameterInUrl());

    speclib.addStepAutoNumber('Verify Cookie Tracking');
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('storefront');
    expect(CookiePage.valueOfTrackingCookie()).toEqual('true');

    if (CookiePage.MODE === 'rep') {
      expect(CookiePage.valueOfTrackingRepCookie()).toEqual(SalesTrackingPage.REP_NAME);
      expect(CookiePage.valueOfTrackingFooterRepSessionCookie()).toEqual(SalesTrackingPage.REP_NAME);
    } else {
      expect(CookiePage.valueOfTrackingStoreCookie()).toEqual(SalesTrackingPage.storeAPIValue);
      expect(CookiePage.valueOfTrackingFooterStoreSessionCookie()).toEqual(SalesTrackingPage.storeAPIValue);
    }

    speclib.addStepAutoNumber('Refresh page');
    ShoppingPage.refreshPage(1000, { pauseForLocalStorage : true });
    speclib.addStepAutoNumber('Verify sf_rep/sf_store to be displayed in URL');
    expect(browser).toHaveUrlContaining(SalesTrackingPage.modeParameterInUrl());

    speclib.addStepAutoNumber('Verify Cookie Tracking after page was refreshed');
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('storefront');
    expect(CookiePage.valueOfTrackingCookie()).toEqual('true');

    if (CookiePage.MODE === 'rep') {
      expect(CookiePage.valueOfTrackingRepCookie()).toEqual(SalesTrackingPage.REP_NAME);
      expect(CookiePage.valueOfTrackingFooterRepSessionCookie()).toEqual(SalesTrackingPage.REP_NAME);
    } else {
      expect(CookiePage.valueOfTrackingStoreCookie()).toEqual(SalesTrackingPage.storeAPIValue);
      expect(CookiePage.valueOfTrackingFooterStoreSessionCookie()).toEqual(SalesTrackingPage.storeAPIValue);
    }

    if(!StorefrontPage.isProdEnv && SalesTrackingPage.hasProducts) {
      speclib.addStepAutoNumber('Do a Transaction');
      SalesTrackingPage.makeTransaction({ productId : 'fakeForC183251'});

      speclib.addStepAutoNumber('Log in BO');
      SalesTrackingPage.openBoAndLoginByRole(SalesTrackingPage.ROLE.rep, false);

      speclib.addStepAutoNumber('Get the information of the sale for the specified transaction ID');
      const SALE = SalesTrackingPage.getSale(SalesTrackingPage.transaction.ID);

      speclib.addStepAutoNumber('Verify Sale\'s data:acquisition');
      expect(SALE.acquisition).toEqual('storefront');

      speclib.addStepAutoNumber('Verify Sale\'s data:customer_name');
      expect(SALE.customer_name).toEqual(SalesTrackingPage.transaction.customerName);

      speclib.addStepAutoNumber('Verify Sale\'s data:customer_email');
      expect(SALE.customer_email).toEqual(SalesTrackingPage.transaction.customerEmail);

      speclib.addStepAutoNumber('Verify Sale\'s data:price');
      expect(SALE.total).toEqual(`${SalesTrackingPage.transaction.unitPrice}00`);

      speclib.addStepAutoNumber('Verify Sale\'s data:quantities');
      expect(SALE.quantities).toEqual(SalesTrackingPage.transaction.quantity);

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

      // getting text on product(s) column after click on show details
      const valuesOfPrd = ReportSalesPage.skuPrdOfItem(trxInReportsObj).getText();

      speclib.addStepAutoNumber('Verify the transaction details(show more)');
      expect(valuesOfPrd).toContain('1X');
      expect(valuesOfPrd).toContain(`${SalesTrackingPage.transaction.productId}`);
    }
  });
});

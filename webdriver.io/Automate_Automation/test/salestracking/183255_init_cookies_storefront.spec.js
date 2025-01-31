const StorefrontPage = require('../../pages/storefront.page');
const CookiePage = require('../../lib/cookie');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(
  StorefrontPage.isTeamMode
)(`${StorefrontPage.RETAILER} New Salestracking`, () => {
  it('C183255 [rep mode] Salestracking Initiation - Cookies - Storefront', () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('183255');

    speclib.addStepAutoNumber('Open Storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);

    speclib.addStepAutoNumber('Verify Cookie Tracking');
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('storefront');
    expect(CookiePage.valueOfTrackingCookie()).toEqual('true');
    expect(CookiePage.valueOfTrackingRepCookie()).toEqual(StorefrontPage.REP_NAME);
  });
});

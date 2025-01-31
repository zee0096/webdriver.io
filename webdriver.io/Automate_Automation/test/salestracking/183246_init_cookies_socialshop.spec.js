const BackOffice = require('../../pages/backoffice.page');
const ShoppingPage = require('../../pages/salestracking/shopping.page');
const CookiePage = require('../../lib/cookie');
const speclib = require('../../lib/speclib');

const { hasSocialShop } = require('../../pages/backoffice/accountsettings/usermanagement.page');

const BackOfficePage = new BackOffice();

speclib.descSkipIf(
  BackOfficePage.isProdEnv
  || BackOfficePage.isTeamMode
  || !hasSocialShop
)(`${BackOfficePage.RETAILER} New Salestracking`, () => {
  it('C183246 [rep mode] Salestracking Initiation - Cookies - SocialShop page', () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('183246');

    speclib.addStepAutoNumber('Open Social Shop page');
    BackOfficePage.openBoPageByUrl(`/socialshop/${ShoppingPage.REP_NAME}`);
    BackOfficePage.waitForLoadingIconDisappear();
    speclib.addStepAutoNumber('Verify Cookie Tracking');
    expect(CookiePage.valueOfTrackingCookie()).toEqual('true');
    expect(CookiePage.valueOfTrackingRepCookie()).toEqual(ShoppingPage.REP_NAME);
  });
});

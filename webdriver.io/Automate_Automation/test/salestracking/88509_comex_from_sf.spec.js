const ShoppingPage = require('../../pages/salestracking/shopping.page');
const StorefrontPage = require('../../pages/storefront.page');
const CookiePage = require('../../lib/cookie');
const LocalStoragePage = require('../../pages/salestracking/localStorage.page');
const SalesTrackingPage = require('../../pages/salestracking/salestracking.page');
const speclib = require('../../lib/speclib');

describe(`${StorefrontPage.RETAILER} Comex`, () => {
  it('C88509 Salestracking stands down when URL has "page=comex" in it (from Storefront)', () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('88509');

    if (!StorefrontPage.isProdEnv) {
      StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);
    }

    ShoppingPage.openShoppingPage(true);
    ShoppingPage.refreshPage(2000);

    if (SalesTrackingPage.isCookieTracking) {
      speclib.addStepAutoNumber('Verify Cookie Tracking');

      if (CookiePage.hasComexCookie) {
        expect(CookiePage.valueOfTrackingCookie()).toEqual('true');
      } else {
        expect(CookiePage.valueOfTrackingCookie()).toEqual('');
      }

      if (!CookiePage.isTeamMode) {
        if (CookiePage.hasComexCookie) {
          expect(CookiePage.valueOfTrackingRepCookie()).toEqual(SalesTrackingPage.REP_NAME);
        } else {
          expect(CookiePage.valueOfTrackingRepCookie()).toEqual('');
        }
      } else {
        expect(CookiePage.valueOfTrackingStoreCookie())
          .toEqual(CookiePage.getExpectedCookiesByName(
            CookiePage.COOKIE_NAMES.sf_wdt_tracking_store
          ).value);
      }
    } else {
      speclib.addStepAutoNumber('Verify Local Storage');
      expect(LocalStoragePage.valueOfTrackingRep()).toEqual(SalesTrackingPage.REP_NAME);
      expect(LocalStoragePage.valueOfTracking()).toEqual('true');
    }
  });
});

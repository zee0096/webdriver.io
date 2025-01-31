/* eslint-disable wdio/await-expect */
const { BADGES, TEST_DATA } = require('../../lib/defaultconstantslib');
const StorefrontPage = require('../../pages/storefront.page');
const SidebarPage = require('../../pages/sidebar.page');
const Cookie = require('../../lib/cookie');
const EmailMePage = require('../../lib/emailme');
const AppntRequestPage = require('../../lib/appntrequest');
const BoHomePagePage = require('../../pages/backoffice/home/bohomepage.page');
const PersonalShopper = require('../../lib/personalshopper');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(!PersonalShopper.hasPersonalShopper)(`${BoHomePagePage.RETAILER} Storefront 
  Personal Shopper Request`, () => {
  it('C184090 Personal Shopper / New Request (PS window) from storefront', () => {
    speclib.addModule(speclib.ALLURE.module.customerRequests);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184090');

    EmailMePage.widgetWindowComingFrom = StorefrontPage.IT_IS_COMMING_FROM.storefront;
    AppntRequestPage.widgetWindowComingFrom = StorefrontPage.IT_IS_COMMING_FROM.storefront;

    speclib.addStepAutoNumber('Login BO page as rep');
    BoHomePagePage.openBoAndLoginByRole(BoHomePagePage.ROLE.rep, false);
    BoHomePagePage.backOfficeProof.waitForDisplayed();
    if (!(BoHomePagePage.isTeamMode && BoHomePagePage.isProdEnv)
      && BoHomePagePage.hasCustomerRequestsBadges) {
      BoHomePagePage.getInitialValueOfPsCount();
    }
    speclib.addStepAutoNumber('open rep Storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, true);

    speclib.addStepAutoNumber('Click on Personal Shopper link');
    StorefrontPage.clickOnPersonalShopperLnk();

    speclib.addStepAutoNumber('Switch to Personal Shopper window');
    StorefrontPage.switchToPsWidgetWindow();
    speclib.addStepAutoNumber('Validate personal shopper title is visible');
    expect(PersonalShopper.personalShopperTitle).toBeDisplayed();

    speclib.addStepAutoNumber('Validate privacy disclaimer checkbox is displayed');
    expect(PersonalShopper.pdCheckBox).toBeDisplayed();

    speclib.addStepAutoNumber('Validate privacy disclaimer has more than 10 characters');
    expect(PersonalShopper.pdCheckBoxText.getText().length).toBeGreaterThan(10);

    if (SidebarPage.hasPrivacyPolicyLnk) {
      speclib.addStepAutoNumber('Validate personal shopper title');
      expect(PersonalShopper.privacyPolicyLink.getAttribute('href').length).toBeGreaterThan(15);
    }

    if (!PersonalShopper.isProdEnv || !PersonalShopper.isTeamMode) {
      speclib.addStepAutoNumber('Personal Shopper Form');
      PersonalShopper.requestPersonalShopperFrm({
        email : TEST_DATA.request.sf.email,
        info  : TEST_DATA.request.sf.psMessage,
        phone : TEST_DATA.request.sf.phone,
      });

      speclib.addStepAutoNumber('Validate success message was displayed');
      expect(PersonalShopper.requestSentIsVisible()).toBeTruthy();
    }

    if (StorefrontPage.isCookieTracking) {
      browser.switchToParentFrame();
      speclib.addStepAutoNumber('Get acquisition cookie');
      const acquisition = Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_acquisition);

      speclib.addStepAutoNumber('Validate acquisition cookie is storefront');
      expect(acquisition).toEqual('storefront');

      speclib.addStepAutoNumber('Validate tracking cookie is true');
      Cookie.getTrackingValue();
      // const trackingValue = Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_tracking);
      expect(Cookie.tracking.value).toEqual('true');

      if (StorefrontPage.isTeamMode) {
        // const trackingValueStore = Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_tracking_store);
        speclib.addStepAutoNumber('Validate tracking store cookie is not a number');
        Cookie.getTrackingStore();
        expect(Cookie.tracking.store).not.toBeNaN();
      } else {
        // const trackingValueRep = Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_tracking_rep);
        speclib.addStepAutoNumber('Validate tracking rep cookie was equal to rep name');
        Cookie.getTrackingRep();
        expect(Cookie.tracking.rep).toEqual(StorefrontPage.REP_NAME);
      }
    }

    if ((!PersonalShopper.isProdEnv || !PersonalShopper.isTeamMode) && BoHomePagePage.hasCustomerRequestsBadges) {
      speclib.addStepAutoNumber('Switch to BO window');
      BoHomePagePage.switchToBackofficeWindow();

      speclib.addStepAutoNumber('Refresh page');
      BoHomePagePage.refreshPage();
      BoHomePagePage.getNewValueOfPsCount();

      speclib.addStepAutoNumber('Validate Personal Shopper badge was incremented');
      if (BoHomePagePage.initialPsCounterValue.includes('K')) {
        // if there are more than 999 requests they're showed as 1K, and it's impossible to check the difference
        expect(parseInt(BoHomePagePage.initialPsCounterValue, 10) > 0).toBeTruthy();
      } else {
        expect(parseInt(BoHomePagePage.newPsCounterValue, 10)).toEqual(
          parseInt(BoHomePagePage.initialPsCounterValue, 10) + 1
        );
      }
    }
  });
});

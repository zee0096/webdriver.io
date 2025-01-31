/* eslint-disable wdio/await-expect */
const { BADGES } = require('../../lib/defaultconstantslib');
const { TEST_DATA } = require('../../lib/defaultconstantslib');
const StorefrontPage = require('../../pages/storefront.page');
const SidebarPage = require('../../pages/sidebar.page');
const Cookie = require('../../lib/cookie');
const EmailMePage = require('../../lib/emailme');
const AppntRequestPage = require('../../lib/appntrequest');
const BoHomePagePage = require('../../pages/backoffice/home/bohomepage.page');
const speclib = require('../../lib/speclib');

let initialEmailCount = '';

speclib.descSkipIf(!StorefrontPage.hasEmailMeRequest)(`${BoHomePagePage.RETAILER} Storefront Contact
  Me Request`, () => {
  before(() => {
    EmailMePage.widgetWindowComingFrom = StorefrontPage.IT_IS_COMMING_FROM.storefront;
    AppntRequestPage.widgetWindowComingFrom = StorefrontPage.IT_IS_COMMING_FROM.storefront;

    speclib.addStepAutoNumber('Login BO page as rep');
    BoHomePagePage.openBoAndLoginByRole(BoHomePagePage.ROLE.rep, false);
    BoHomePagePage.backOfficeProof.waitForDisplayed();
    if (!(BoHomePagePage.isTeamMode && BoHomePagePage.isProdEnv)
      && BoHomePagePage.hasCustomerRequestsBadges) {
      initialEmailCount = BoHomePagePage.getBadgeCount(BADGES.ask);
    }
    speclib.addStepAutoNumber('open rep Storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, true);
  });

  it(`C184091 Email / Ask & Answer New Request from storefront`, () => {
    speclib.addModule(speclib.ALLURE.module.storefront);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('184091');

    speclib.addStepAutoNumber('Click on Email Me link');
    StorefrontPage.clickOnEmailMeLnk();

    speclib.addStepAutoNumber('Validate contact box exist');
    expect(StorefrontPage.contactBox).toBeExisting();

    speclib.addStepAutoNumber('Validate Privacy Disclaimer checkbox is displayed');
    expect(EmailMePage.pdCheckBox).toBeDisplayed();

    speclib.addStepAutoNumber('Validate Privacy Disclaimer text is bigger than 10 characters');
    expect(EmailMePage.pdCheckBoxText.getText().length).toBeGreaterThan(10);

    if (SidebarPage.hasPrivacyPolicyLnk) {
      expect(EmailMePage.privacyPolicyLink.getAttribute('href').length).toBeGreaterThan(15);
    }

    if(!EmailMePage.isProdEnv || !EmailMePage.isTeamMode) {
      speclib.addStepAutoNumber('Fill up request email form');
      EmailMePage.requestEmailFrm(TEST_DATA.request.sf.email, TEST_DATA.request.sf.emailMessage);

      speclib.addStepAutoNumber('Validate Success message for request was displayed');
      expect(EmailMePage.requestSentIsVisible).toBeTruthy();
    }

    if (StorefrontPage.isCookieTracking) {
      browser.switchToParentFrame();
      const acquisition = Cookie.valueOfAcquisitionCookie();
      speclib.addStepAutoNumber('Validate Acquisition cookie is storefront');
      expect(acquisition).toEqual('storefront');
    }

    if(!EmailMePage.isProdEnv || !EmailMePage.isTeamMode) {
      speclib.addStepAutoNumber('Switch to BO window');
      BoHomePagePage.switchToBackofficeWindow();
      BoHomePagePage.refreshPage(5000);
      const newEmailCount = BoHomePagePage.getBadgeCount(BADGES.ask);
      speclib.addStepAutoNumber('Validate if email/badge increase +1');
      if (initialEmailCount.includes('K')) { // if there are more than 999 requests they're showed as 1K, and it's impossible to check the difference
        expect(parseInt(initialEmailCount, 10) > 0).toBeTruthy();
      } else {
        expect(parseInt(newEmailCount, 10)).toEqual(parseInt(initialEmailCount, 10) + 1);
      }
    }
  });
});

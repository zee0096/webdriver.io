// test/storefront/acquisitionfromsf.spec.js
const SidebarPage = require('../../pages/sidebar.page');
const StorefrontPage = require('../../pages/storefront.page');
const CookiePage = require('../../lib/cookie');
const AppointmentRequestPage = require('../../lib/appntrequest');
const EmailMePage = require('../../lib/emailme');
const speclib = require('../../lib/speclib');
const { TEST_DATA } = require('../../lib/defaultconstantslib');

speclib.descSkipIf(!SidebarPage.isCookieTracking || (StorefrontPage.isProdEnv && StorefrontPage.isTeamMode))
(`${StorefrontPage.RETAILER} Appointment Acquisition from storefront`, () => {
  before(() => {
    speclib.addStepAutoNumber('Open storefront page as rep');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);
  }, 3);

  it('C184099 Acquisition channel is set (cookie)', () => {
    speclib.addModule(speclib.ALLURE.module.storefront);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('184099');

    speclib.addStepAutoNumber('Validate Acquisition cookie is storefront');
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('storefront');

    speclib.addStepAutoNumber('Click on appointment request link');
    StorefrontPage.clickOnAppntReqLnk();

    speclib.addStepAutoNumber('Fill up the appointment request form');
    AppointmentRequestPage.requestAppointmentByType(
      AppointmentRequestPage.getAppointmentTypeByRandom(),
      {
        email : TEST_DATA.request.sf.email,
        info  : TEST_DATA.request.sf.appntMessage,
        name  : TEST_DATA.request.sf.name,
        phone : TEST_DATA.request.sf.phone,
      },
    );
    speclib.addStepAutoNumber('Validate Acquisition cookie is equal to storefront');
    AppointmentRequestPage.waitForRequestSentMessageToDisappear();
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('storefront');

    speclib.addStepAutoNumber('Click on email me link');
    StorefrontPage.clickOnEmailMeLnk();

    speclib.addStepAutoNumber('Fill up the email req. form');
    EmailMePage.requestEmailFrm(TEST_DATA.request.sf.email, TEST_DATA.request.sf.emailMessage);

    speclib.addStepAutoNumber('Validate Acquisition cookie is equal to storefront');
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('storefront');
    CookiePage.deleteCookie(CookiePage.COOKIE_NAMES.sf_wdt_acquisition);
  });
});

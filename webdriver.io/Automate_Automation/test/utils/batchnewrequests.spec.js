const { TEST_DATA } = require('../../lib/defaultconstantslib');
const StorefrontPage = require('../../pages/storefront.page');
const EmailMe = require('../../lib/emailme');
const PersonalShopper = require('../../lib/personalshopper');
const AppointmentRequestPage = require('../../lib/appntrequest');
const speclib = require('../../lib/speclib');

const { phone } = TEST_DATA.request.sf;
const { email } = TEST_DATA.request.sf;
const { emailMessage } = TEST_DATA.request.sf;
const { appntMessage } = TEST_DATA.request.sf;
const { psMessage } = TEST_DATA.request.sf;

for (let i = 0; i < 2; i++) {
  speclib.descSkipIf(StorefrontPage.isProdEnv && StorefrontPage.isTeamMode)(`${StorefrontPage.RETAILER} Storefront Request`, () => {
    before(() => {
      StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);
    });

    afterEach(() => {
      browser.switchToParentFrame();
    });

    speclib.itSkipIf(!StorefrontPage.hasEmailMeRequest)('C84749 Email / Ask & Answer New Request', () => {
      StorefrontPage.clickOnEmailMeLnk();
      EmailMe.requestEmailFrm(email, emailMessage);
      expect(EmailMe.requestSentIsVisible()).toBeTruthy();
    });

    speclib.itSkipIf(!PersonalShopper.hasPersonalShopper)('C84750 Personal Shopper New Request', () => {
      StorefrontPage.clickOnPersonalShopperLnk();
      PersonalShopper.requestPersonalShopperFrm({
        email,
        info : psMessage,
        phone,
      });
      expect(PersonalShopper.requestSentIsVisible()).toBeTruthy();
    });

    speclib.itSkipIf(!AppointmentRequestPage.hasInStoreAppntTypeOpt || !StorefrontPage.hasAppointmentRequest)('C84751 In-Store Appointment New Request', () => {
      StorefrontPage.clickOnAppntReqLnk();
      AppointmentRequestPage.requestAppointmentByType(
        AppointmentRequestPage.APPOINTMENT_TYPE.store,
        {
          email,
          info : appntMessage,
        },
      );
      expect(AppointmentRequestPage.requestSentIsVisible()).toBeTruthy();
    });

    speclib.itSkipIf(!AppointmentRequestPage.hasPhoneAppntTypeOpt || !StorefrontPage.hasAppointmentRequest)('C84752 Phone Appointment New Request', () => {
      StorefrontPage.clickOnAppntReqLnk();
      AppointmentRequestPage.requestAppointmentByType(
        AppointmentRequestPage.APPOINTMENT_TYPE.phone,
        {
          email,
          info : appntMessage,
        },
      );
      expect(AppointmentRequestPage.requestSentIsVisible()).toBeTruthy();
    });

    speclib.itSkipIf(!AppointmentRequestPage.hasLiveChatAppntTypeOpt || !StorefrontPage.hasAppointmentRequest)('C84753 Chat Appointment New Request', () => {
      StorefrontPage.clickOnAppntReqLnk();
      AppointmentRequestPage.requestAppointmentByType(
        AppointmentRequestPage.APPOINTMENT_TYPE.chat,
        {
          email,
          info : appntMessage,
        },
      );
      expect(AppointmentRequestPage.requestSentIsVisible()).toBeTruthy();
    });

    speclib.itSkipIf(!AppointmentRequestPage.hasVirtualAppntTypeOpt || !StorefrontPage.hasAppointmentRequest)
    ('C180687 Appointment New Request (appointment Virtual)', () => {
      StorefrontPage.clickOnAppntReqLnk();
      AppointmentRequestPage.requestAppointmentByType(
        AppointmentRequestPage.APPOINTMENT_TYPE.virtual,
        {
          email : TEST_DATA.request.sf.email,
          info  : TEST_DATA.request.sf.appntMessage,
        }
      );

      expect(AppointmentRequestPage.requestSentIsVisible()).toBeTruthy();
    });
  });
}

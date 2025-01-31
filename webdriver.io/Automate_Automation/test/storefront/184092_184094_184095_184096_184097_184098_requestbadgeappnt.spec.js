/* eslint-disable wdio/await-expect */
const { BADGES } = require('../../lib/defaultconstantslib');
const { TEST_DATA } = require('../../lib/defaultconstantslib');
const StorefrontPage = require('../../pages/storefront.page');
const SidebarPage = require('../../pages/sidebar.page');
const EmailMePage = require('../../lib/emailme');
const AppntRequestPage = require('../../lib/appntrequest');
const BoHomePagePage = require('../../pages/backoffice/home/bohomepage.page');
const speclib = require('../../lib/speclib');

let initialAppntCount = '';
let sentRequests = 0;

speclib.descSkipIf(!SidebarPage.hasAppointmentRequest)(`${BoHomePagePage.RETAILER} Storefront 
  Appointment Request`, () => {
  before(() => {
    EmailMePage.widgetWindowComingFrom = StorefrontPage.IT_IS_COMMING_FROM.storefront;
    AppntRequestPage.widgetWindowComingFrom = StorefrontPage.IT_IS_COMMING_FROM.storefront;

    speclib.addStepAutoNumber('Login BO page as rep');
    BoHomePagePage.openBoAndLoginByRole(BoHomePagePage.ROLE.rep, false);
    BoHomePagePage.backOfficeProof.waitForDisplayed();
    if (!(BoHomePagePage.isTeamMode && BoHomePagePage.isProdEnv)
      && BoHomePagePage.hasCustomerRequestsBadges) {
      initialAppntCount = BoHomePagePage.getBadgeCount(BADGES.appnt);
    }
    speclib.addStepAutoNumber('Open rep Storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, true);
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.storefront);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
  });

  after(() => {
    BoHomePagePage.logoutWithoutUI();
  });

  it('C184092 Appointment New Request (window) and privacy Disclaimer', () => {
    speclib.addTestId('184092');

    speclib.addStepAutoNumber('Click onAppnt Request link');
    StorefrontPage.clickOnAppntReqLnk();

    speclib.addStepAutoNumber('Validate appnt request window is visible');
    expect(AppntRequestPage.appntBox).toExist();

    speclib.addStepAutoNumber('Validate Privacy Disclaimer checkbox is displayed');
    expect(AppntRequestPage.pdCheckBox).toBeDisplayed();

    speclib.addStepAutoNumber('Validate Privacy Disclaimer text is bigger than 10 characters');
    expect(AppntRequestPage.pdCheckBoxText.getText().length).toBeGreaterThan(10);

    if (SidebarPage.hasPrivacyPolicyLnk) {
      speclib.addStepAutoNumber('Validate Privacy Disclaimer link is bigger than 15 characters');
      expect(AppntRequestPage.privacyPolicyLink.getAttribute('href').length).toBeGreaterThan(15);
    }
    AppntRequestPage.closeAppntRequestWidget();
    BoHomePagePage.scrollToBottom();
  });

  speclib.itSkipIf(
    (StorefrontPage.isProdEnv && StorefrontPage.isTeamMode)
    || !AppntRequestPage.hasPhoneAppntTypeOpt
  )('C184094 Appointment New Request (appointment by Phone)', () => {
    speclib.addTestId('184094');

    speclib.addStepAutoNumber('Switch to frontend window');
    StorefrontPage.switchToFrontendWindow();

    speclib.addStepAutoNumber('Click on appnt request link');
    StorefrontPage.clickOnAppntReqLnk();

    speclib.addStepAutoNumber('Request appointment by phone');
    AppntRequestPage.requestAppointmentByType(
      AppntRequestPage.APPOINTMENT_TYPE.phone,
      {
        email : TEST_DATA.request.sf.email,
        info  : TEST_DATA.request.sf.appntMessage,
      },
    );

    speclib.addStepAutoNumber('Validate appointment phone is available');
    expect(AppntRequestPage.requestSentIsVisible).toBeTruthy();
    AppntRequestPage.waitForRequestSentMessageToDisappear();
    sentRequests += 1;
  });

  speclib.itSkipIf(
    (StorefrontPage.isProdEnv && StorefrontPage.isTeamMode)
    || !AppntRequestPage.hasInStoreAppntTypeOpt
  )('C184095 Appointment New Request (appointment In-Store)', () => {
    speclib.addTestId('184095');

    speclib.addStepAutoNumber('Switch to frontend window');
    StorefrontPage.switchToFrontendWindow();

    speclib.addStepAutoNumber('Click on appnt request link');
    StorefrontPage.clickOnAppntReqLnk();
    speclib.addStepAutoNumber('Request appnt by Store');
    AppntRequestPage.requestAppointmentByType(
      AppntRequestPage.APPOINTMENT_TYPE.store,
      {
        email : TEST_DATA.request.sf.email,
        info  : TEST_DATA.request.sf.appntMessage,
      }
    );

    speclib.addStepAutoNumber('Validate request appnt was sent');
    expect(AppntRequestPage.requestSentIsVisible).toBeTruthy();
    AppntRequestPage.waitForRequestSentMessageToDisappear();
    sentRequests += 1;
  });

  speclib.itSkipIf(
    (StorefrontPage.isProdEnv && StorefrontPage.isTeamMode)
    || !AppntRequestPage.hasVirtualAppntTypeOpt
  )('C184096 Appointment New Request (appointment Virtual)', () => {
    speclib.addTestId('184096');

    speclib.addStepAutoNumber('Switch to frontend window');
    StorefrontPage.switchToFrontendWindow();

    speclib.addStepAutoNumber('Click on appnt request link');
    StorefrontPage.clickOnAppntReqLnk();
    speclib.addStepAutoNumber('Request appnt by Virtual');
    AppntRequestPage.requestAppointmentByType(
      AppntRequestPage.APPOINTMENT_TYPE.virtual,
      {
        email : TEST_DATA.request.sf.email,
        info  : TEST_DATA.request.sf.appntMessage,
      }
    );

    speclib.addStepAutoNumber('Validate request appnt was sent');
    expect(AppntRequestPage.requestSentIsVisible).toBeTruthy();
    AppntRequestPage.waitForRequestSentMessageToDisappear();
    sentRequests += 1;
  });

  speclib.itSkipIf(
    (StorefrontPage.isProdEnv && StorefrontPage.isTeamMode)
    || !AppntRequestPage.hasLiveChatAppntTypeOpt
  )('C184097 Appointment New Request (appointment by Chat service)', () => {
    speclib.addTestId('184097');

    speclib.addStepAutoNumber('Switch to frontend window');
    StorefrontPage.switchToFrontendWindow();

    speclib.addStepAutoNumber('Click on appnt request link');
    StorefrontPage.clickOnAppntReqLnk();
    speclib.addStepAutoNumber('Request appnt by Chat');
    AppntRequestPage.requestAppointmentByType(
      AppntRequestPage.APPOINTMENT_TYPE.chat,
      {
        email : TEST_DATA.request.sf.email,
        info  : TEST_DATA.request.sf.appntMessage,
      }
    );
    speclib.addStepAutoNumber('Validate request appnt was sent');
    expect(AppntRequestPage.requestSentIsVisible).toBeTruthy();
    AppntRequestPage.waitForRequestSentMessageToDisappear();
    sentRequests += 1;
  });

  speclib.itSkipIf(
    (StorefrontPage.isProdEnv && StorefrontPage.isTeamMode)
    || !BoHomePagePage.hasCustomerRequestsBadges
  )('C184098 Check Appointment Request Count', () => {
    speclib.addTestId('184098');

    speclib.addStepAutoNumber('Switch to BO window');
    BoHomePagePage.switchToBackofficeWindow();
    BoHomePagePage.refreshPage(5000);
    const newAppntCount = BoHomePagePage.getBadgeCount(BADGES.appnt);
    speclib.addStepAutoNumber('Validate appnt counter was updated');
    if (initialAppntCount.includes('K')) { // if there are more than 999 requests they're showed as 1K, and it's impossible to check the difference
      expect(parseInt(initialAppntCount, 10) > 0).toBeTruthy();
    } else {
      expect(parseInt(newAppntCount, 10)).toEqual(parseInt(initialAppntCount, 10) + sentRequests);
    }
  });
});

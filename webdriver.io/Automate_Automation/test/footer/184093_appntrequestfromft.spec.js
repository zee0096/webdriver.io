const { TEST_DATA } = require('../../lib/defaultconstantslib');
const Cookie = require('../../lib/cookie');
const SidebarPage = require('../../pages/sidebar.page');
const FooterPage = require('../../pages/footer.page');
const AppointmentRequestPage = require('../../lib/appntrequest');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(!FooterPage.hasAppointmentRequest || !FooterPage.hasFooter)(`${SidebarPage.RETAILER} Footer Appointment`, () => {
  // eslint-disable-next-line mocha/no-hooks-for-single-case
  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.footer);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  it('C184093 Appointment Request from footer', () => {
    AppointmentRequestPage.widgetWindowComingFrom = FooterPage.IT_IS_COMMING_FROM.footer;

    speclib.addTestId('184093');
    speclib.addStepAutoNumber('Open Footer');
    FooterPage.openFooterPage();
    speclib.addStepAutoNumber('Click Appointment Request Link');
    FooterPage.clickOnAppntRequestLnk();
    speclib.addStepAutoNumber('Verify appointment is displayed');
    expect(AppointmentRequestPage.appntBox).toBeDisplayed();

    speclib.addStepAutoNumber('Verify privacy policy checkbox is displayed');
    expect(AppointmentRequestPage.pdCheckBox).toBeDisplayed();
    speclib.addStepAutoNumber('Verify privacy policy text is displayed');
    expect(AppointmentRequestPage.pdCheckBoxText.getText().length).toBeGreaterThan(10);

    if (SidebarPage.hasPrivacyPolicyLnk) {
      speclib.addStepAutoNumber('Verify privacy policy link is displayed');
      expect(AppointmentRequestPage.privacyPolicyLink.getAttribute('href').length).toBeGreaterThan(15);
    }
  });

  speclib.itSkipIf(SidebarPage.isProdEnv)('C184093 Getting random appnt', () => {
    speclib.addTestId('184093');
    speclib.addStepAutoNumber('Request Appointment');
    AppointmentRequestPage.requestAppointmentByType(
      AppointmentRequestPage.getAppointmentTypeByRandom(),
      {
        email : TEST_DATA.request.ft.email,
        info  : TEST_DATA.request.ft.appntMessage,
        name  : TEST_DATA.request.ft.name,
        phone : TEST_DATA.request.ft.phone,
      },
    );
    speclib.addStepAutoNumber('Verify Request sent is visible');
    expect(AppointmentRequestPage.requestSentIsVisible()).toBeTruthy();
  });

  speclib.itSkipIf(SidebarPage.isProdEnv)('C180833 Acquisition channel', () => {
    speclib.addTestId('184093');
    speclib.addStepAutoNumber('Switch to Footer window');
    FooterPage.switchToFooterWindow();
    speclib.addStepAutoNumber('Refresh the page');
    FooterPage.refreshPage();

    speclib.addStepAutoNumber('Get cookie');
    const acquisition = Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_acquisition);
    speclib.addStepAutoNumber('Verify Cookie');
    expect(acquisition).toEqual(FooterPage.expectedAcquisition);
  });
});

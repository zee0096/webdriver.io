const { TEST_DATA } = require('../../lib/defaultconstantslib');
const SidebarPage = require('../../pages/sidebar.page');
const AppointmentRequestPage = require('../../lib/appntrequest');
const Cookie = require('../../lib/cookie');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(!SidebarPage.hasSidebar || !SidebarPage.hasAppointmentRequest)(`${SidebarPage.RETAILER} Sidebar get Appointment`, () => {
  before(() => {
    AppointmentRequestPage.widgetWindowComingFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;
    speclib.addStepAutoNumber('Open sidebar page');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();
    speclib.addStepAutoNumber('Click on widget');
    SidebarPage.clickOnWidgetIco();
    speclib.addStepAutoNumber('Click on Appointment request option');
    AppointmentRequestPage.clickOnApptRequestOpt();
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.sidebar);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
  });

  it('C180833 Appointment Request from sidebar', () => {
    speclib.addTestId('180833');
    speclib.addStepAutoNumber('Verify appointment box is displayed');
    expect(AppointmentRequestPage.appntBox).toBeDisplayed();
  });

  it('C180833 verify Privacy disclaimer items', () => {
    speclib.addTestId('180833');
    speclib.addStepAutoNumber('Verify PD checkbox');
    expect(AppointmentRequestPage.pdCheckBox).toBeDisplayed();

    expect(AppointmentRequestPage.pdCheckBoxText.getText().length).toBeGreaterThan(10);

    if (SidebarPage.hasPrivacyPolicyLnk) {
      speclib.addStepAutoNumber('Verify privacy policy link');
      expect(AppointmentRequestPage.privacyPolicyLink.getAttribute('href').length).toBeGreaterThan(15);
    }
  });

  speclib.itSkipIf(SidebarPage.isProdEnv || !SidebarPage.hasSms)('C184140 Appointment Request through SMS from sidebar', () => {
    speclib.addTestId('184140');
    speclib.addStepAutoNumber('Verify sms button is displayed and clickable');
    expect(AppointmentRequestPage.smsButton).toBeDisplayed();
    expect(AppointmentRequestPage.smsButton).toBeClickable();
  });

  speclib.itSkipIf(SidebarPage.isProdEnv)('C180833 Request appnt by Random type', () => {
    speclib.addTestId('180833');
    speclib.addStepAutoNumber('Request random type appointment from sidebar');
    AppointmentRequestPage.requestAppointmentByType(
      AppointmentRequestPage.getAppointmentTypeByRandom(),
      {
        email : TEST_DATA.request.sb.email,
        info  : TEST_DATA.request.sb.appntMessage,
        name  : TEST_DATA.request.sb.name,
        phone : TEST_DATA.request.sb.phone,
      },
    );
    speclib.addStepAutoNumber('Verify request sent message is visible');
    expect(AppointmentRequestPage.requestSentIsVisible()).toBeTruthy();
  });

  speclib.itSkipIf(SidebarPage.isProdEnv)('C180833 Acquisition channel', () => {
    speclib.addTestId('180833');
    speclib.addStepAutoNumber('Switch to sidebar window and refresh page');
    SidebarPage.switchToSidebarWindow();
    SidebarPage.refreshPage();

    speclib.addStepAutoNumber('Verify sf_wdt_acquisition cookie value is valid');
    const acquisition = Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_acquisition);
    expect(acquisition).toEqual('sidebar-book-appointment');
  });
});

const SidebarPage = require('../../pages/sidebar.page');
const AppointmentRequestPage = require('../../lib/appntrequest');
const Cookie = require('../../lib/cookie');
const EmailMe = require('../../lib/emailme');
const speclib = require('../../lib/speclib');
const { TEST_DATA } = require('../../lib/defaultconstantslib');

speclib.descSkipIf(!SidebarPage.hasSidebar || !SidebarPage.hasAppointmentRequest)(`${SidebarPage.RETAILER} Sidebar Acquisition`, () => {
  before(() => {
    // setting the class variables
    AppointmentRequestPage.widgetWindowComingFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.sidebar);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
  });

  it('C184136 No Acquisition', () => {
    speclib.addTestId('184136');
    speclib.addStepAutoNumber('Open sidebar page');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();

    speclib.addStepAutoNumber('Click on widget');
    SidebarPage.clickOnWidgetIco();
    speclib.addStepAutoNumber('Click on Appointment request option');
    AppointmentRequestPage.clickOnApptRequestOpt();

    speclib.addStepAutoNumber('Switch to sidebar window and refresh page');
    SidebarPage.switchToSidebarWindow();
    SidebarPage.refreshPage();

    speclib.addStepAutoNumber('Verify sf_wdt_acquisition cookie value is empty');
    const acquisition = Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_acquisition);
    expect(acquisition).toEqual('');
  });

  if (!SidebarPage.isProdEnv || SidebarPage.RETAILER === 'elguntors') {
    it('C184137 Appointment Acquisition', () => {
      speclib.addTestId('184137');
      speclib.addStepAutoNumber('Switch to widget window');
      SidebarPage.switchToWidgetWindow();
      speclib.addStepAutoNumber('Send appointment request');
      AppointmentRequestPage.requestAppointmentByType(AppointmentRequestPage.getAppointmentTypeByRandom(), {
        email : TEST_DATA.request.sb.email,
        info  : TEST_DATA.request.sb.appntMessage,
        name  : TEST_DATA.request.sb.name,
        phone : TEST_DATA.request.sb.phone,
      });
      speclib.addStepAutoNumber('Switch to sidebar window and refresh page');
      SidebarPage.switchToSidebarWindow();
      SidebarPage.refreshPage();
      speclib.addStepAutoNumber('Verify sf_wdt_acquisition cookie value is valid');
      const acquisition = Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_acquisition);
      expect(acquisition).toEqual('sidebar-book-appointment');
    });

    speclib.itSkipIf(!SidebarPage.hasEmailMeRequest)('C184138 Acquisition Not Overwritten', () => {
      speclib.addTestId('184138');
      speclib.addStepAutoNumber('Open sidebar page');
      SidebarPage.openSidebarPage();
      speclib.addStepAutoNumber('Click on widget');
      SidebarPage.clickOnWidgetIco();
      speclib.addStepAutoNumber('Click on Email request option');
      EmailMe.clickOnEmailMeOpt();
      speclib.addStepAutoNumber('Send email request');
      EmailMe.requestEmailFrm('qatest@salesfloor.net', 'Sidebar Email Acquisition test');
      speclib.addStepAutoNumber('Switch to sidebar window and refresh page');
      SidebarPage.switchToWidgetWindow();
      SidebarPage.refreshPage();
      speclib.addStepAutoNumber('Verify sf_wdt_acquisition cookie value is valid');
      const acquisition = Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_acquisition);
      expect(acquisition).toEqual('sidebar-book-appointment');
    });
  }
});

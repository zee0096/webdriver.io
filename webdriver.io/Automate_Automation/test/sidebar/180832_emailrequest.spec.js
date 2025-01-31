const { TEST_DATA } = require('../../lib/defaultconstantslib');
const SidebarPage = require('../../pages/sidebar.page');
const EmailMe = require('../../lib/emailme');
const Cookie = require('../../lib/cookie');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(!SidebarPage.hasSidebar || !SidebarPage.hasEmailMeRequest)(`${SidebarPage.RETAILER} Sidebar Email`, () => {
  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.sidebar);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
  });

  it('C180832 Open Email Request form from sidebar', () => {
    EmailMe.widgetWindowComingFrom = EmailMe.IT_IS_COMMING_FROM.sidebar;
    speclib.addTestId('180832');

    speclib.addStepAutoNumber('Open sidebar page');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();
    speclib.addStepAutoNumber('Click on widget');
    SidebarPage.clickOnWidgetIco();
    speclib.addStepAutoNumber('Click on email me option');
    EmailMe.clickOnEmailMeOpt();
    speclib.addStepAutoNumber('Verify contact box is displayed');
    expect(SidebarPage.contactBox).toBeDisplayed();
  });

  it('C180832 Verify Privacy disclaimer items', () => {
    speclib.addTestId('180832');
    speclib.addStepAutoNumber('Verify pc checkbox is displayed');
    expect(EmailMe.pdCheckBox).toBeDisplayed();

    expect(EmailMe.pdCheckBoxText.getText().length).toBeGreaterThan(10);
    if (SidebarPage.hasPrivacyPolicyLnk) {
      speclib.addStepAutoNumber('Verify privacy policy link is displayed');
      expect(EmailMe.privacyPolicyLink.getAttribute('href').length).toBeGreaterThan(15);
    }
  });

  speclib.itSkipIf(SidebarPage.isProdEnv)('C180832 Request Email confirmation', () => {
    speclib.addTestId('180832');
    speclib.addStepAutoNumber('Request email me form');
    EmailMe.requestEmailFrm(
      TEST_DATA.request.sb.email,
      TEST_DATA.request.sb.emailMessage,
      TEST_DATA.request.sb.name,
      TEST_DATA.request.sb.phone
    );
    speclib.addStepAutoNumber('Verify sent message to be displayed');
    expect(EmailMe.sentMsgTxt).toBeDisplayed();
  });

  speclib.itSkipIf(SidebarPage.isProdEnv)('C180832 Aquisition channel', () => {
    speclib.addTestId('180832');
    speclib.addStepAutoNumber('Switch to sidebar window and refresh page');
    SidebarPage.switchToSidebarWindow();
    SidebarPage.refreshPage();
    speclib.addStepAutoNumber('Get sf_wdt_acquisition cookie value');
    const acquisition = Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_acquisition);
    speclib.addStepAutoNumber('Verify sf_wdt_acquisition cookie value is valid');
    expect(acquisition).toEqual('sidebar-email-me');
  });
});

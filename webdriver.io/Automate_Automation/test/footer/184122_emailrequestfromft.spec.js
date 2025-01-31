const { TEST_DATA } = require('../../lib/defaultconstantslib');
const SidebarPage = require('../../pages/sidebar.page');
const EmailMePage = require('../../lib/emailme');
const FooterPage = require('../../pages/footer.page');
const Cookie = require('../../lib/cookie');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(!FooterPage.hasEmailMeRequest || !FooterPage.hasFooter)(`${SidebarPage.RETAILER} Footer Email`, () => {
  // eslint-disable-next-line mocha/no-hooks-for-single-case,mocha/no-top-level-hooks
  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.footer);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  it('184122 Email Request from footer', () => {
    EmailMePage.widgetWindowComingFrom = FooterPage.IT_IS_COMMING_FROM.footer;
    speclib.addTestId('184122');
    speclib.addStepAutoNumber('Open Footer');
    FooterPage.openFooterPage();
    speclib.addStepAutoNumber('Click Contact Me');
    FooterPage.clickOnMailMeLnk();
    speclib.addStepAutoNumber('Verify Contact Me is displayed');
    expect(SidebarPage.contactBox).toBeDisplayed();

    speclib.addStepAutoNumber('Verify privacy policy checkbox is displayed');
    expect(EmailMePage.pdCheckBox).toBeDisplayed();
    speclib.addStepAutoNumber('Verify privacy policy text is displayed');
    expect(EmailMePage.pdCheckBoxText.getText().length).toBeGreaterThan(10);

    if (SidebarPage.hasPrivacyPolicyLnk) {
      speclib.addStepAutoNumber('Verify privacy policy link is displayed');
      expect(EmailMePage.privacyPolicyLink.getAttribute('href').length).toBeGreaterThan(15);
    }
  });

  speclib.itSkipIf(SidebarPage.isProdEnv)('C184122 Email Request - request email', () => {
    speclib.addTestId('184122');
    speclib.addStepAutoNumber('Request Contact Me Appointment');
    EmailMePage.requestEmailFrm(
      TEST_DATA.request.ft.email,
      TEST_DATA.request.ft.emailMessage,
      TEST_DATA.request.ft.name,
      TEST_DATA.request.ft.phone
    );
    speclib.addStepAutoNumber('Verify Request sent is visible');
    expect(EmailMePage.thankyouMsg).toBeDisplayed();

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

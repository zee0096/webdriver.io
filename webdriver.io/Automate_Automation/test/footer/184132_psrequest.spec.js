const { TEST_DATA } = require('../../lib/defaultconstantslib');
const SidebarPage = require('../../pages/sidebar.page');
const FooterPage = require('../../pages/footer.page');
const PersonalShopperPage = require('../../lib/personalshopper');
const Cookie = require('../../lib/cookie');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(
  !PersonalShopperPage.hasPersonalShopper || !FooterPage.hasFooter,
)(`${FooterPage.RETAILER} Footer Personal Shopper open PS form`, () => {
  // eslint-disable-next-line mocha/no-hooks-for-single-case,mocha/no-top-level-hooks
  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.footer);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  it('C184132 PS Request from footer', () => {
    speclib.addTestId('184132');
    speclib.addStepAutoNumber('Open Footer');
    FooterPage.openFooterPage();
    speclib.addStepAutoNumber('Click Personal Shopper');
    FooterPage.clickOnPersonalShopperLnk();
    speclib.addStepAutoNumber('Verify Personal Shopper is displayed');
    expect(PersonalShopperPage.personalShopperTitle).toBeDisplayed();

    speclib.addStepAutoNumber('Verify privacy policy checkbox is displayed');
    expect(PersonalShopperPage.pdCheckBox).toBeDisplayed();
    speclib.addStepAutoNumber('Verify privacy policy text is displayed');
    expect(PersonalShopperPage.pdCheckBoxText.getText().length).toBeGreaterThan(10);

    if (SidebarPage.hasPrivacyPolicyLnk) {
      speclib.addStepAutoNumber('Verify privacy policy link is displayed');
      expect(PersonalShopperPage.privacyPolicyLink.getAttribute('href').length).toBeGreaterThan(15);
    }
  });

  speclib.itSkipIf(SidebarPage.isProdEnv)('C184132 PS Request - request email', () => {
    speclib.addTestId('184132');
    speclib.addStepAutoNumber('Request Peronal Shopper Appointment');
    PersonalShopperPage.requestPersonalShopperFrm({
      email  : TEST_DATA.request.ft.email,
      info   : TEST_DATA.request.ft.psMessage,
      budget : '1000',
      name   : TEST_DATA.request.ft.name,
      phone  : TEST_DATA.request.ft.phone,
    });
    speclib.addStepAutoNumber('Verify Request sent is visible');
    expect(PersonalShopperPage.thankyouMsg).toBeDisplayed();

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

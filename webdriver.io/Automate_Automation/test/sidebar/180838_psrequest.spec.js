const { TEST_DATA } = require('../../lib/defaultconstantslib');
const SidebarPage = require('../../pages/sidebar.page');
const PersonalShopper = require('../../lib/personalshopper');
const Cookie = require('../../lib/cookie');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(
  !SidebarPage.hasSidebar || !PersonalShopper.hasPersonalShopper || !PersonalShopper.hasPersonalShopperInSb,
)(`${SidebarPage.RETAILER} Sidebar PS`, () => {
  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.sidebar);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
  });

  it('C180838 Personal Shopper Request from sidebar', () => {
    PersonalShopper.widgetWindowComingFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;
    speclib.addTestId('180838');

    speclib.addStepAutoNumber('Open sidebar page');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();
    speclib.addStepAutoNumber('Click on widget');
    SidebarPage.clickOnWidgetIco();
    speclib.addStepAutoNumber('Click on personal shopper option');
    PersonalShopper.clickOnPersonalShopperOpt();

    speclib.addStepAutoNumber('Verify personal shopper title to exist');
    // we can not use display because some retailers don't have title (Ex. elguntors)
    expect(PersonalShopper.personalShopperTitle).toExist();
  });

  it('C180838 Personal Shopper Request from sidebar - Verify Privacy Disclaimer', () => {
    speclib.addTestId('180838');

    speclib.addStepAutoNumber('Verify mark PD checkbox');
    expect(PersonalShopper.pdCheckBox).toBeDisplayed();

    expect(PersonalShopper.pdCheckBoxText.getText().length).toBeGreaterThan(10);

    if (SidebarPage.hasPrivacyPolicyLnk) {
      speclib.addStepAutoNumber('Verify privacy policy link to be dislplayed');
      expect(PersonalShopper.privacyPolicyLink.getAttribute('href').length).toBeGreaterThan(15);
    }
  });

  if (!SidebarPage.isProdEnv || SidebarPage.RETAILER === 'elguntors') {
    it('C180838 Personal Shopper Request shows thank you message', () => {
      speclib.addTestId('180838');

      speclib.addStepAutoNumber('Send personal shopper request');
      PersonalShopper.requestPersonalShopperFrm({
        email  : TEST_DATA.request.sb.email,
        info   : TEST_DATA.request.sb.psMessage,
        budget : '1000',
        name   : TEST_DATA.request.sb.name,
        phone  : TEST_DATA.request.sb.phone,
      });
      speclib.addStepAutoNumber('Verify sent message to be displayed');
      expect(PersonalShopper.requestSentIsVisible()).toBeTruthy();
    });

    it('C180838 PS request - Acquisition channel is set', () => {
      speclib.addTestId('180838');
      speclib.addStepAutoNumber('Switch to sidebar window and refresh page');
      SidebarPage.switchToSidebarWindow();
      SidebarPage.refreshPage();
      speclib.addStepAutoNumber('Get sf_wdt_acquisition cookie value');
      const acquisition = Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_acquisition);
      speclib.addStepAutoNumber('Verify sf_wdt_acquisition cookie value is valid');
      expect(acquisition).toEqual('sidebar-personal-shopper');
    });
  }
});

const SidebarPage = require('../../../pages/sidebar.page');
const speclib = require('../../../lib/speclib');
const { hasSpecialityDrp } = require('../../../lib/widget');
const EmailMePage = require('../../../lib/emailme');

speclib.descSkipIf(hasSpecialityDrp === false || SidebarPage.RETAILER !== 'macys')(`${SidebarPage.RETAILER} 
  Live Chat Contextual Widget with pre selected specialty`, () => {
  it(`C183355 Verify that, Live Chat Contextual Widget with pre selected retailer 
  store ID & specialty ID shows the valid specialities when rep is unavailable for live chat`, () => {
    speclib.addModule(speclib.ALLURE.module.widgetsLandingPage);
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addTestId('183355');

    speclib.addStepAutoNumber('Open sidebar');
    SidebarPage.openSidebarPage();

    const cwToCheck = $$(`//button[contains(@class, "sf-contextual-widget-live-chat-class")]
    [contains(text(),"Retailer: CW - By Class with Retailer Store ID") and contains(text(),"& Speciality:")]`)[0];

    const textToCheck = cwToCheck.getText();
    cwToCheck.click();

    const WindowIdFromNewWindow = SidebarPage.getWindowIdFromNewWindow();
    browser.switchToWindow(WindowIdFromNewWindow);

    expect(textToCheck.includes(EmailMePage.specialtySelected.getText().trim())).toBeTruthy();
  });
});

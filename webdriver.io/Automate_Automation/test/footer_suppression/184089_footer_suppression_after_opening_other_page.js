const SidebarPage = require('../../pages/sidebar.page');
const FooterPage = require('../../pages/footer.page');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(!FooterPage.hasFooter)(`${FooterPage.RETAILER} Footer Suppression`, () => {
  it('184089 Open footer page', () => {
    speclib.addModule(speclib.ALLURE.module.footer);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184089');
    speclib.addStepAutoNumber('Open footer page');
    FooterPage.openFooterPage();
    speclib.addStepAutoNumber('Verify footer is displayed');
    expect(FooterPage.footer).toBeDisplayed();
    speclib.addStepAutoNumber('Open other page');
    browser.url('http://www.google.ca');
    browser.pause(1000);
    speclib.addStepAutoNumber('Open sidebar');
    SidebarPage.openSidebarPage();
    speclib.addStepAutoNumber('Verify footer is not displayed');
    expect(FooterPage.footer).not.toBeDisplayed();
  });
});

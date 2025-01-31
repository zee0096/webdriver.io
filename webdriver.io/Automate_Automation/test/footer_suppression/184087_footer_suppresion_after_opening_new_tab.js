const SidebarPage = require('../../pages/sidebar.page');
const FooterPage = require('../../pages/footer.page');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(!FooterPage.hasFooter)(`${SidebarPage.RETAILER} Footer Suppression`, () => {
  it('C184087 Open some tabs', () => {
    speclib.addTestId('184087');
    speclib.addModule(speclib.ALLURE.module.footer);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addStepAutoNumber('Open salesfloor.net');
    browser.url('http://www.salesfloor.net');
    speclib.addStepAutoNumber('Open google.ca in a new window');
    browser.newWindow('http://www.google.ca');
    speclib.addStepAutoNumber('Open footer page');
    FooterPage.openFooterPage();
    speclib.addStepAutoNumber('Verify footer is displayed');
    expect(FooterPage.footer).toBeDisplayed();
    speclib.addStepAutoNumber('Wait for footer suppression');
    FooterPage.waitForFooterSuppression();
    speclib.addStepAutoNumber('Open sidebar page');
    SidebarPage.openSidebarPage();
    speclib.addStepAutoNumber('Verify footer is not displayed');
    expect(FooterPage.footer).not.toBeDisplayed();
  });
});

const speclib = require('../../lib/speclib');
const SidebarPage = require('../../pages/sidebar.page');
const FooterPage = require('../../pages/footer.page');

speclib.descSkipIf(!FooterPage.hasFooter)(`${SidebarPage.RETAILER} Footer Suppression`, () => {
  it('184088 Footer Present', () => {
    speclib.addModule(speclib.ALLURE.module.footer);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184088');
    speclib.addStepAutoNumber('Open footer page');
    FooterPage.openFooterPage();
    speclib.addStepAutoNumber('Verify footer is displayed');
    expect(FooterPage.footer).toBeDisplayed();
    speclib.addStepAutoNumber('Wait for footer suppression');
    FooterPage.waitForFooterSuppression();
    speclib.addStepAutoNumber('Refresh the page');
    FooterPage.refreshPage();
    speclib.addStepAutoNumber('Verify footer is displayed');
    expect(FooterPage.footer).toBeDisplayed();
    speclib.addStepAutoNumber('Refresh the page');
    FooterPage.refreshPage();
    speclib.addStepAutoNumber('Open sidebar page');
    SidebarPage.openSidebarPage();
    speclib.addStepAutoNumber('Verify footer is not displayed');
    expect(FooterPage.footer).not.toBeDisplayed();
  });
});

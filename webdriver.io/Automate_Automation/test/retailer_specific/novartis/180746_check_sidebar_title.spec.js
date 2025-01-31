const SidebarPage = require('../../../pages/sidebar.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(SidebarPage.RETAILER !== 'novartis')(`${SidebarPage.RETAILER} 
  Sidebar title verification`, () => {
  it(`C180746 As a Customer, I should see Representative Name on 
    tagline displayed on Sidebar widget in single line`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('180746');

    speclib.addStepAutoNumber(`Open sidebar page for lang=${SidebarPage.LOCALE}`);
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();

    speclib.addStepAutoNumber('Verify sidebar title');
    const textToCheck = {
      en_US : 'Connect with a Scientific Engagement Manager',
      fr_CA : 'Сontacter un chargé d’engagement scientifique'
    };
    expect(SidebarPage.sidebarTitle.getText()).toEqual(textToCheck[`${SidebarPage.LOCALE}`]);
  });
});

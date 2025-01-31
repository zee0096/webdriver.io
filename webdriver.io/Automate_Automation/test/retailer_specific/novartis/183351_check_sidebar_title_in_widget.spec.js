const SidebarPage = require('../../../pages/sidebar.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(SidebarPage.RETAILER !== 'novartis')(`${SidebarPage.RETAILER} 
  Sidebar title landing page verification`, () => {
  it(`C183351 As a Customer, i should see "Therapeutic Expert" text 
  as Representative name when opening the sidebar landing page`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('183351');

    speclib.addStepAutoNumber(`Open sidebar page for lang=${SidebarPage.LOCALE}`);
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();

    speclib.addStepAutoNumber('Click on widget');
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Verify sidebar title landing page');

    SidebarPage.selectFindStoreFrame();

    const sidebarSubTitleInWidgetSel = $('h2.landing-page__sub-title');
    const textToCheck = {
      en_US : 'Let\'s connect you with a Scientific Engagement Manager.',
      fr_CA : 'Laissez-nous vous connecter avec notre chargé d’engagement scientifique.'
    };
    expect(sidebarSubTitleInWidgetSel.getText()).toEqual(textToCheck[`${SidebarPage.LOCALE}`]);
  });
});

const SidebarPage = require('../../../pages/sidebar.page');
const speclib = require('../../../lib/speclib');
const EmailMe = require('../../../lib/emailme');

speclib.descSkipIf(SidebarPage.RETAILER !== 'novartis')(`${SidebarPage.RETAILER} 
  Email Me from Sidebar title verification`, () => {
  it(`C183354 As a Customer, I should see "Therapeutic Expert" text 
  as Representative name when initiating a "Contact Me" request from the sidebar`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('183354');

    speclib.addStepAutoNumber(`Open sidebar page for lang=${SidebarPage.LOCALE}`);
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();

    speclib.addStepAutoNumber('Click on widget');
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Click on email me option');
    EmailMe.clickOnEmailMeOpt();

    speclib.addStepAutoNumber('Verify Contact Me text');
    const title = $('h1#AtQuestionTitle');
    title.waitForExist();

    const textToCheck = {
      en_US : 'Contact a Scientific Engagement Manager',
      fr_CA : 'Contacter votre chargé d’engagement scientifique'
    };

    expect(title.getText()).toContain(textToCheck[`${SidebarPage.LOCALE}`]);
  });
});
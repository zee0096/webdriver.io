const StorefrontPage = require('../../../pages/storefront.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(StorefrontPage.RETAILER !== 'novartis')(`${StorefrontPage.RETAILER} 
  Email Me from Storefront title verification`, () => {
  it(`C183349 As a Customer, I should see "Therapeutic Expert" text 
    as Representative name when initiating a "Contact Me" request from the storefront`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('183349');

    speclib.addStepAutoNumber(`Open storefront page for lang=${StorefrontPage.LOCALE}`);
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, true);

    speclib.addStepAutoNumber('Verify Contact Me text');
    StorefrontPage.clickOnEmailMeLnk();

    const title = $('h1#AtQuestionTitle');
    title.waitForExist();

    const textToCheck = {
      en_US : 'Contact a Scientific Engagement Manager',
      fr_CA : 'Contacter votre chargé d’engagement scientifique'
    };

    expect(title.getText()).toContain(textToCheck[`${StorefrontPage.LOCALE}`]);
  });
});

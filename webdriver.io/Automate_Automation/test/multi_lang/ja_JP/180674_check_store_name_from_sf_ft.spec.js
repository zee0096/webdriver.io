const StorefrontPage = require('../../../pages/storefront.page');
const FooterPage = require('../../../pages/footer.page');
const ChangeRepPage = require('../../../pages/sidebar/changeRep.page');
const { MULTILANGUAGES } = require('../../../lib/defaultconstantslib');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(StorefrontPage.LOCALE !== MULTILANGUAGES.ja_JP || !StorefrontPage.isTeamMode)
(`${StorefrontPage.RETAILER} Store name from Storefront and Footer verification`, () => {
  it('C180674 Validate that, store name to be display in the same case as sent by the client', () => {
    speclib.addModule(speclib.ALLURE.module.multiLang);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('180674');

    speclib.addStepAutoNumber(`Open Storefront page for lang=${StorefrontPage.LOCALE}`);
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);

    speclib.addStepAutoNumber('Verify Store text in Storefront');

    expect(StorefrontPage.repStoreNameInSF.getText().toUpperCase()).toEqual(ChangeRepPage.storeName);

    speclib.addStepAutoNumber(`Open Footer page for lang=${StorefrontPage.LOCALE}`);
    FooterPage.openFooterPage();

    speclib.addStepAutoNumber('Verify Store text in Footer');
    FooterPage.repNameDisplayedInFooter();

    expect(FooterPage.repStoreNameInFooter.getText().toUpperCase()).toEqual(ChangeRepPage.storeName);
  });
});

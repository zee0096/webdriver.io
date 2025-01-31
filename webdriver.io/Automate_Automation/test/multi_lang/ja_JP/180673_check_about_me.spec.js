const StorefrontPage = require('../../../pages/storefront.page');
const speclib = require('../../../lib/speclib');
const { MULTILANGUAGES } = require('../../../lib/defaultconstantslib');

speclib.descSkipIf(StorefrontPage.LOCALE !== MULTILANGUAGES.ja_JP
  || StorefrontPage.isTeamMode)(`${StorefrontPage.RETAILER} About Me from Storefront verification`, () => {
  it(`C180673 Validate that, The japanese translation under about me section is correct
   in the storefront`, () => {
    speclib.addModule(speclib.ALLURE.module.multiLang);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('180673');

    speclib.addStepAutoNumber(`Open storefront page for lang=${StorefrontPage.LOCALE}`);
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);

    speclib.addStepAutoNumber('Open About Me');
    StorefrontPage.clickAboutMe();

    speclib.addStepAutoNumber('Verify About Me text');

    const textToCheck = '担当エリア';

    const mySpecialtiesSel = $('h4.service__label');
    mySpecialtiesSel.waitForExist();

    expect(mySpecialtiesSel.getText()).toEqual(textToCheck);
  });
});

const FooterPage = require('../../pages/footer.page');
const StorefrontPage = require('../../pages/storefront.page');
const ChangeRepPage = require('../../pages/sidebar/changeRep.page');
const speclib = require('../../lib/speclib');

describe(`${FooterPage.RETAILER} Footer`, () => {
  before(() => {
    speclib.addStepAutoNumber('Before all step - Open footer');
    FooterPage.openFooterPage();
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.footer);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  // We check for an element in the shopping page to confirm if shopping page is shown. We have
  // given up trying to make this work with Retailer's QA sites...
  speclib.itSkipIf(!FooterPage.isProdEnv)('C184124 Shopping Page Is Displayed Test', () => {
    speclib.addTestId('184124');
    speclib.addStepAutoNumber('Verify Footer URL');
    expect(browser).toHaveUrlContaining(FooterPage.getFooterUrl());

    speclib.addStepAutoNumber('Verify Footer is displayed');
    if (FooterPage.hasFooter) {
      expect(FooterPage.footer).toBeDisplayed();
    } else {
      expect(FooterPage.footer).not.toBeDisplayed();
    }
  });

  if (!FooterPage.hasFooter) {
    it('C184125 Page Footer Is Not Displayed Test', () => {
      speclib.addTestId('184125');
      speclib.addStepAutoNumber('Verify Footer is not displayed');
      expect(FooterPage.footer).not.toBeDisplayed();
    });
  } else {
    it('C184126 Footer page and Iframe are displayed', () => {
      speclib.addSeverity(speclib.ALLURE.severity.blocker);

      speclib.addTestId('184126');
      speclib.addStepAutoNumber('Verify Footer URL');
      expect(browser).toHaveUrlContaining(FooterPage.getFooterUrl().toLowerCase());
      speclib.addStepAutoNumber('Verify Footer iframe is displayed');
      FooterPage.switchToFooterIframe();
      expect(FooterPage.repStoreNameInFooter).toBeDisplayed({ message : 'The Footer Iframe is NOT visible' });
    });

    it('C184127 Rep Name/Store Is Displayed Correctly', () => {
      speclib.addTestId('184127');
      speclib.addStepAutoNumber('Verify Rep Name/Store Is Displayed');
      if (FooterPage.isTeamMode) {
        expect(FooterPage.repNameDisplayedInFooter()).toContain(ChangeRepPage.storeName);
      } else {
        expect(FooterPage.repNameDisplayedInFooter().length).toBeGreaterThanOrEqual(5);
      }
    });

    it('C184128 Click rep\'s name link is redirected to storefront', () => {
      speclib.addTestId('184128');
      speclib.addStepAutoNumber('Click Rep Name/Store link on Footer');
      FooterPage.clickOnRepNameInFooter();
      speclib.addStepAutoNumber('Verify Rep Name/Store link Is Displayed');
      expect(StorefrontPage.jumbotron).toBeDisplayed();
    });

    speclib.itSkipIf(FooterPage.isTeamMode)('C184131 Rep Image Is Displayed Correctly Test', () => {
      speclib.addTestId('184131');
      speclib.addStepAutoNumber('Back to the Footer page');
      FooterPage.openFooterPage();
      FooterPage.footer.waitForDisplayed();
      speclib.addStepAutoNumber('Verify Rep image is displayed');
      expect(FooterPage.repImageIsOk()).toBeTruthy();
    });

    speclib.itSkipIf(FooterPage.isTeamMode)('C184129 Click avatar profile link is redirected to storefront', () => {
      speclib.addTestId('184129');
      speclib.addStepAutoNumber('Click Rep avatar on Footer');
      FooterPage.clickOnRepAvatarInFooter();
      speclib.addStepAutoNumber('Verify Rep image is displayed');
      expect(StorefrontPage.repPictureImg).toBeDisplayed();
    });
  }
});

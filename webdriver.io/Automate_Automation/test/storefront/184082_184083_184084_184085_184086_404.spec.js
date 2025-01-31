const StorefrontPage = require('../../pages/storefront.page');
const speclib = require('../../lib/speclib');

describe(`${StorefrontPage.RETAILER} Storefront 404 Page`, () => {
  before(() => {
    // If we don't enter a rep name, the 404 will be in English. Need a name for the fr_CA to work
    StorefrontPage.setBrowserSize();
    // trying to open an invalid page (404 page)
    speclib.addStepAutoNumber('Open a invalid page (404)');
    StorefrontPage.openWebPage(`${StorefrontPage.getBackofficeUrl}/${StorefrontPage.LOCALE}/hrthsrthrsthtrht`);
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.storefront);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  it('C184082 Jumbotron is not visible', () => {
    speclib.addTestId('184082');

    speclib.addStepAutoNumber('Validate Jumboron is not visible on 404 page');
    expect(StorefrontPage.jumbotron).not.toBeDisplayed();
  });

  speclib.itSkipIf(!StorefrontPage.hasHeaderLinks)('C184083 404 Header menu ', () => {
    speclib.addTestId('184083');

    speclib.addStepAutoNumber('Validate menu has more than 0 items');
    expect(StorefrontPage.menuItems.length).toBeGreaterThan(0);
  });

  speclib.itSkipIf(!StorefrontPage.hasFooterLinks)('C184084 404 footer menu validation', () => {
    speclib.addTestId('184084');
    speclib.addStepAutoNumber('Validate footer menu has more than 0 items');
    expect(StorefrontPage.footerLinks.length).toBeGreaterThan(0);
  });

  it('C184085 URL Validation', () => {
    speclib.addTestId('184085');

    speclib.addStepAutoNumber('Validate the URL contains "/404" text');
    expect(browser).toHaveUrlContaining('/404');
  });

  it('C184086 Link to main site', () => {
    speclib.addTestId('184086');

    speclib.addStepAutoNumber('Click on continue button');
    StorefrontPage.link404.click();
    speclib.addStepAutoNumber('Validate The retailer prod page is displayed');
    StorefrontPage.waitForLoadingIconDisappear();
    expect(StorefrontPage.productPageLink).toBeExisting();
  });
});

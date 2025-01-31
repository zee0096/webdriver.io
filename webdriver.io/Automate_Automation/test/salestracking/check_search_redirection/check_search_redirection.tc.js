const speclib = require('../../../lib/speclib');
const StorefrontPage = require('../../../pages/storefront.page');

class CheckSearchRedirection {
  /**
   * @param {object} tcProp - Object contain test case parameters
   */
  constructor(tcProp = {}) {
    speclib.addModule(tcProp.module);
    speclib.addSeverity(tcProp.severity);
    speclib.addTestId(tcProp.id);
  }

  verifyRedirectionFromSF() {
    speclib.addStepAutoNumber('Open storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);

    const productForSearch = 'shirt';
    speclib.addStepAutoNumber(`Search for product='${productForSearch}'`);
    StorefrontPage.searchForProduct(productForSearch);

    speclib.addStepAutoNumber('Verify the retailer ecom website search page');
    StorefrontPage.productPageLink.waitForExist();

    let urlToCheck = StorefrontPage.searchTrackingUrl.replace('#REP_NAME', StorefrontPage.REP_NAME);
    urlToCheck = urlToCheck.replace('#STORE_ID', StorefrontPage.STORE_ID);
    expect(browser).toHaveUrlContaining(urlToCheck);
  }
}

module.exports = CheckSearchRedirection;

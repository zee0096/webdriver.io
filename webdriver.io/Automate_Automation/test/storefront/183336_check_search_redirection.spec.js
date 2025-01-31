const StorefrontPage = require('../../pages/storefront.page');
const speclib = require('../../lib/speclib');
const CheckSearchRedirectionTC = require('../salestracking/check_search_redirection/check_search_redirection.tc');

speclib.descSkipIf(StorefrontPage.searchTrackingUrl === '')(`${StorefrontPage.RETAILER} 
  Searching on a rep storefront redirects verification`, () => {
  it(`C183336 As a Customer I should see correct URL parameter value, when 
    redirecting to Retailer's website after keyword search`, () => {
    const testCase = new CheckSearchRedirectionTC({
      module   : speclib.ALLURE.module.salestracking,
      severity : speclib.ALLURE.severity.minor,
      id       : '183336'
    });
    testCase.verifyRedirectionFromSF();
  });
});

const speclib = require('../../../lib/speclib');
const CheckSearchRedirectionTC = require('./check_search_redirection.tc');

speclib.descSkipIf(speclib.RETAILER !== 'bloom')(`${speclib.RETAILER} 
  Searching on a rep storefront redirects verification`, () => {
  it(`C183801 Searching on a rep storefront 
    redirects the search to the retailer ecom website search page`, () => {
    const testCase = new CheckSearchRedirectionTC({
      module   : speclib.ALLURE.module.salestracking,
      severity : speclib.ALLURE.severity.minor,
      id       : '183801'
    });
    testCase.verifyRedirectionFromSF();
  });
});

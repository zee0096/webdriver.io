const speclib = require('../../../lib/speclib');
const CheckSearchRedirectionTC = require('./check_search_redirection.tc');

speclib.descSkipIf(speclib.RETAILER !== 'chicos')(`${speclib.RETAILER} 
  Searching on a rep storefront redirects verification`, () => {
  it(`C183805 Searching on a rep storefront 
    redirects the search to the retailer ecom website search page`, () => {
    const testCase = new CheckSearchRedirectionTC({
      module   : speclib.ALLURE.module.salestracking,
      severity : speclib.ALLURE.severity.minor,
      id       : '183805'
    });
    testCase.verifyRedirectionFromSF();
  });
});

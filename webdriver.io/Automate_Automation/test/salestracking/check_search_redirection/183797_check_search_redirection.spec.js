const speclib = require('../../../lib/speclib');
const CheckSearchRedirectionTC = require('./check_search_redirection.tc');

speclib.descSkipIf(speclib.RETAILER !== 'allenedmonds')(`${speclib.RETAILER} 
  Searching on a rep storefront redirects verification`, () => {
  it(`C183797 Searching on a rep storefront 
    redirects the search to the retailer ecom website search page`, () => {
    const testCase = new CheckSearchRedirectionTC({
      module   : speclib.ALLURE.module.salestracking,
      severity : speclib.ALLURE.severity.minor,
      id       : '183797'
    });
    testCase.verifyRedirectionFromSF();
  });
});

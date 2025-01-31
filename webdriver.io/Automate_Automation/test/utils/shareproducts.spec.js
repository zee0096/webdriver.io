const ProductPage = require('../../pages/backoffice/messagecenter/product.page');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(ProductPage.isProdEnv || !ProductPage.hasShareProd || !ProductPage.hasProducts)(`${ProductPage.RETAILER} share products`, () => {
  it('C99999 Share products from backoffice', () => {
    ProductPage.openBoAndLoginByRole(ProductPage.ROLE.rep, false);

    for (let productIndex = 0; productIndex < 8; productIndex++) {
      for (let timesShared = 0; timesShared < 8; timesShared++) {
        ProductPage.share('product', productIndex);
        browser.pause(500);
      }
    }
  });
});

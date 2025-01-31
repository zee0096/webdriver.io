const speclib = require('../../../lib/speclib');
const ProductPage = require('../../../pages/backoffice/messagecenter/product.page');

speclib.descSkipIf(
  (ProductPage.isProdEnv && ProductPage.isTeamMode)
  || !ProductPage.hasShareProd
  || !ProductPage.hasProducts,
)(`${ProductPage.RETAILER} Share Product`, () => {
  it('C112211 Share product from Home page', () => {
    speclib.addTestId('112211');
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber('Login BO page as rep');
    ProductPage.openBoAndLoginByRole(ProductPage.ROLE.rep, false);

    expect(ProductPage.share('product')).toBeTruthy();
  });
});

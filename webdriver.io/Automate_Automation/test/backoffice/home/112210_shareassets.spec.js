const speclib = require('../../../lib/speclib');

const ProductPage = require('../../../pages/backoffice/messagecenter/product.page');

speclib.descSkipIf(
  !ProductPage.hasAssets
  || (ProductPage.isProdEnv && ProductPage.isTeamMode)
)(`${ProductPage.RETAILER} Share Product`, () => {
  it('C112210 Share asset', () => {
    speclib.addTestId('112210');
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber('Login BO page as rep');
    ProductPage.openBoAndLoginByRole(ProductPage.ROLE.rep, false);

    expect(ProductPage.share('asset')).toBe(true);
  });
});

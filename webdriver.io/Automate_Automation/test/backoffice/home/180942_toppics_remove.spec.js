const speclib = require('../../../lib/speclib');
const ProductPage = require('../../../pages/backoffice/messagecenter/product.page');
const EditSectionPage = require('../../../pages/backoffice/home/editsection.page');

speclib.descSkipIf(
  EditSectionPage.tpProductCount === 0
  || (ProductPage.isTeamMode && ProductPage.isProdEnv),
)(`${ProductPage.RETAILER} Back Office Product`, () => {
  it('C180942 Backoffice: can Remove products (Top Picks)', () => {
    speclib.addTestId('180942');
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber('Login BO page as rep');
    ProductPage.openBoAndLoginByRole(ProductPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Click on Top Picks edit button');
    EditSectionPage.clickOnEditBtnOnTopPicks();

    speclib.addStepAutoNumber('Select products');
    EditSectionPage.selectProds(
      EditSectionPage.HOME_PAGE_SECTIONS.topPicks,
      EditSectionPage.EDIT_OPTIONS.remove
    );
    EditSectionPage.checkProducts();

    speclib.addStepAutoNumber('Click on remove button');
    EditSectionPage.clickOnRemoveBtn();

    speclib.addStepAutoNumber('Verify products were removed in Top Picks');
    expect(EditSectionPage.verifyProductsChangedAfterAction()).toBeTruthy();
  });
});

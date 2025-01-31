const speclib = require('../../../lib/speclib');
const ProductPage = require('../../../pages/backoffice/messagecenter/product.page');
const EditSectionPage = require('../../../pages/backoffice/home/editsection.page');

speclib.descSkipIf(
  EditSectionPage.tpProductCount === 0
  || (ProductPage.isTeamMode && ProductPage.isProdEnv),
)(`${ProductPage.RETAILER} Back Office Product`, () => {
  it('C180945 Backoffice: can Change products (Top Picks)', () => {
    speclib.addTestId('180945');
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.critical);

    speclib.addStepAutoNumber('Login BO page as rep');
    ProductPage.openBoAndLoginByRole(ProductPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Click on Top Picks edit button');
    EditSectionPage.clickOnEditBtnOnTopPicks();
    EditSectionPage.selectProds(
      EditSectionPage.HOME_PAGE_SECTIONS.topPicks,
      EditSectionPage.EDIT_OPTIONS.change
    );
    EditSectionPage.checkProducts();

    speclib.addStepAutoNumber('Click on change button');
    EditSectionPage.clickOnChangeBtn();

    speclib.addStepAutoNumber('Select a product in prod lib');
    EditSectionPage.selectProds(
      EditSectionPage.HOME_PAGE_SECTIONS.topPicks,
      EditSectionPage.EDIT_OPTIONS.change
    );

    speclib.addStepAutoNumber('Add a new random product to be changed');
    ProductPage.selectProduct();

    speclib.addStepAutoNumber('Verify product was replaced/changed in To Picks');
    expect(EditSectionPage.verifyProductsChangedAfterAction()).toBeTruthy();
  });
});

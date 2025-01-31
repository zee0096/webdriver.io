const speclib = require('../../../lib/speclib');
const ProductPage = require('../../../pages/backoffice/messagecenter/product.page');
const EditSectionPage = require('../../../pages/backoffice/home/editsection.page');

speclib.descSkipIf(
  EditSectionPage.naProductCount === 0
  || (ProductPage.isTeamMode && ProductPage.isProdEnv)
)(`${ProductPage.RETAILER} Back Office Product`, () => {
  it('C184186 Backoffice: can Change products (New Arrival)', () => {
    speclib.addTestId('184186');
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.critical);

    speclib.addStepAutoNumber('Login BO page as rep');
    ProductPage.openBoAndLoginByRole(ProductPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Click on New Arrivals edit button');
    EditSectionPage.clickOnEditBtnOnNewArrivals();

    speclib.addStepAutoNumber('Select a product to be changed');
    EditSectionPage.selectProds(
      EditSectionPage.HOME_PAGE_SECTIONS.newArrivals,
      EditSectionPage.EDIT_OPTIONS.change
    );
    EditSectionPage.checkProducts();

    speclib.addStepAutoNumber('Click on change button');
    EditSectionPage.clickOnChangeBtn();

    speclib.addStepAutoNumber('Add a new random product to be changed');
    ProductPage.selectProduct();

    speclib.addStepAutoNumber('Verify product was replaced/changed in New Arrivals');
    expect(EditSectionPage.verifyProductsChangedAfterAction()).toBeTruthy();
  });
});

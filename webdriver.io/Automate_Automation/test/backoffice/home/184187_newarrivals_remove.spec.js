const speclib = require('../../../lib/speclib');
const ProductPage = require('../../../pages/backoffice/messagecenter/product.page');
const EditSectionPage = require('../../../pages/backoffice/home/editsection.page');

speclib.descSkipIf(
  EditSectionPage.naProductCount === 0
  || (ProductPage.isTeamMode && ProductPage.isProdEnv),
)(`${ProductPage.RETAILER} Back Office Product`, () => {
  it('C184187 Backoffice: can Remove products (New Arrival)', () => {
    speclib.addTestId('184187');
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber('Login BO page as rep');
    ProductPage.openBoAndLoginByRole(ProductPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Click on New Arrivals edit button');
    EditSectionPage.clickOnEditBtnOnNewArrivals();

    speclib.addStepAutoNumber('Select products');
    EditSectionPage.selectProds(
      EditSectionPage.HOME_PAGE_SECTIONS.newArrivals,
      EditSectionPage.EDIT_OPTIONS.remove
    );
    EditSectionPage.checkProducts();

    speclib.addStepAutoNumber('Click on remove button');
    EditSectionPage.clickOnRemoveBtn();

    speclib.addStepAutoNumber('Verify products were removed in New Arrivals');
    expect(EditSectionPage.verifyProductsChangedAfterAction()).toBeTruthy();
  });
});

const speclib = require('../../../lib/speclib');
const ProductPage = require('../../../pages/backoffice/messagecenter/product.page');
const EditSectionPage = require('../../../pages/backoffice/home/editsection.page');
const StorefrontPage = require('../../../pages/storefront.page');

speclib.descSkipIf(
  EditSectionPage.naProductCount === 0 || ProductPage.isTeamMode,
)(`${ProductPage.RETAILER} Back Office Product`, () => {
  it(`C184188 Products match between backoffice and storefront
   in New Arrival section`, () => {
    speclib.addTestId('184188');
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber('Login BO page as rep');
    ProductPage.openBoAndLoginByRole(ProductPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Taking the product list in New Arrivals from BO');
    EditSectionPage.waitForLoadingIconDisappear();
    EditSectionPage.listOfProdsInBo(
      EditSectionPage.HOME_PAGE_SECTIONS.newArrivals
    );

    speclib.addStepAutoNumber('Open the storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);
    EditSectionPage.waitForLoadingIconDisappear();

    speclib.addStepAutoNumber('Taking the product list in New Arrivals from SF');
    EditSectionPage.listOfProdsInSf(
      EditSectionPage.HOME_PAGE_SECTIONS.newArrivals
    );

    speclib.addStepAutoNumber('Verify descriptions are the same in New Arrivals section between BO and SF');
    expect(EditSectionPage.bolistOfProducts)
      .toEqual(EditSectionPage.sflistOfProducts);
  });
});

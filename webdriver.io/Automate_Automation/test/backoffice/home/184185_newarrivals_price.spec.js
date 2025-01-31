const speclib = require('../../../lib/speclib');
const ProductPage = require('../../../pages/backoffice/messagecenter/product.page');
const EditSectionPage = require('../../../pages/backoffice/home/editsection.page');
const StorefrontPage = require('../../../pages/storefront.page');

speclib.descSkipIf(
  EditSectionPage.naProductCount === 0
  || (ProductPage.isTeamMode && ProductPage.isProdEnv),
)(`${ProductPage.RETAILER} Back Office Product Price validations`, () => {
  it(`C184185 checking regular and sales prices match in NEW ARRIVALS section 
    between backoffice and storefront`, () => {
    speclib.addTestId('184185');
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber('Login BO page as rep');
    ProductPage.openBoAndLoginByRole(ProductPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Taking the price list in New Arrivals from BO');
    EditSectionPage.waitForLoadingIconDisappear();
    EditSectionPage.listOfPricesInBo(
      EditSectionPage.HOME_PAGE_SECTIONS.newArrivals
    );

    speclib.addStepAutoNumber('Open storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);
    EditSectionPage.waitForLoadingIconDisappear();

    speclib.addStepAutoNumber('Taking the price list in New Arrivals from SF');
    EditSectionPage.listOfPricesInSf(
      EditSectionPage.HOME_PAGE_SECTIONS.newArrivals
    );

    speclib.addStepAutoNumber(`Verify prices are the same in New Arrivals section
      into BO and SF`);
    expect(EditSectionPage.bolistOfProducts.length).toBeGreaterThan(0);

    speclib.addStepAutoNumber(`Verify prices are the same in New Arrivals section
      into BO and SF`);
    expect(EditSectionPage.bolistOfProducts)
      .toEqual(EditSectionPage.sflistOfProducts);
  });
});

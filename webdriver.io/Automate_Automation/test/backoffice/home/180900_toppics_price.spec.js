const speclib = require('../../../lib/speclib');
const ProductPage = require('../../../pages/backoffice/messagecenter/product.page');
const EditSectionPage = require('../../../pages/backoffice/home/editsection.page');
const StorefrontPage = require('../../../pages/storefront.page');

speclib.descSkipIf(
  EditSectionPage.tpProductCount === 0
  || (ProductPage.isTeamMode && ProductPage.isProdEnv),
)(`${ProductPage.RETAILER} Back Office Product Price validations`, () => {
  it(`C180900 checking regular and sales prices match between backoffice 
    and storefront on Top Picks section`, () => {
    speclib.addTestId('180900');
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber('Login BO page as rep');
    ProductPage.openBoAndLoginByRole(ProductPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Taking the price list in Top Picks from BO');
    EditSectionPage.waitForLoadingIconDisappear();
    EditSectionPage.listOfPricesInBo(
      EditSectionPage.HOME_PAGE_SECTIONS.topPicks
    );

    speclib.addStepAutoNumber('Open the storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);
    EditSectionPage.waitForLoadingIconDisappear();

    speclib.addStepAutoNumber('Taking the price list in Top Picks from SF');
    EditSectionPage.listOfPricesInSf(
      EditSectionPage.HOME_PAGE_SECTIONS.topPicks
    );

    speclib.addStepAutoNumber(`Verify prices are the same in Top Picks section
      into BO and SF`);
    expect(EditSectionPage.bolistOfProducts.length).toBeGreaterThan(0);

    speclib.addStepAutoNumber(`Verify prices are the same in Top Picks section
      into BO and SF`);
    expect(EditSectionPage.bolistOfProducts)
      .toEqual(EditSectionPage.sflistOfProducts);
  });
});

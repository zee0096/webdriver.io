const speclib = require('../../../lib/speclib');
const ProductPage = require('../../../pages/backoffice/messagecenter/product.page');
const EditSectionPage = require('../../../pages/backoffice/home/editsection.page');
const StorefrontPage = require('../../../pages/storefront.page');

speclib.descSkipIf(
  EditSectionPage.tpProductCount === 0
  || (ProductPage.isTeamMode && ProductPage.isProdEnv),
)(`${ProductPage.RETAILER} Back Office Product`, () => {
  it(`C180900 Products match between backoffice and storefront
   in Top Picks section`, () => {
    speclib.addTestId('180900');
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber('Login BO page as rep');
    ProductPage.openBoAndLoginByRole(ProductPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Taking the product list in Top Picks from BO');
    EditSectionPage.waitForLoadingIconDisappear();
    EditSectionPage.listOfProdsInBo(
      EditSectionPage.HOME_PAGE_SECTIONS.topPicks
    );

    speclib.addStepAutoNumber('Open the storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, false);
    EditSectionPage.waitForLoadingIconDisappear();

    speclib.addStepAutoNumber('Taking the product list in Top Picks from SF');
    EditSectionPage.listOfProdsInSf(
      EditSectionPage.HOME_PAGE_SECTIONS.topPicks
    );

    speclib.addStepAutoNumber(`Verify descriptions are the same in Top Picks
     section between BO and SF`);
    expect(EditSectionPage.bolistOfProducts)
      .toEqual(EditSectionPage.sflistOfProducts);
  });
});

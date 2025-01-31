/* eslint-disable mocha/no-top-level-hooks */
const ProductPage = require('../../../pages/backoffice/messagecenter/product.page');
const ComposePage = require('../../../pages/backoffice/messagecenter/compose.page');
const speclib = require('../../../lib/speclib');

let brandName;
let priceRange;

speclib.descSkipIf(!ComposePage.hasProducts || !ComposePage.hasMessageCenter)(`${ComposePage.RETAILER} Product Search`, () => {
  before(() => {
    speclib.addStepAutoNumber('Open back office and log in as test rep');
    ComposePage.openBoAndLoginByRole(ComposePage.ROLE.rep, false);
    speclib.addStepAutoNumber('Click on message center and compose message option');
    ComposePage.clickOnMsgCenterComposeMsgOpt();

    speclib.addStepAutoNumber('Click insert product button');
    ComposePage.insertProductBtn.click();
    ProductPage.searchButton.waitForEnabled();
    speclib.addStepAutoNumber('Click search button');
    ProductPage.searchButton.click();
    ProductPage.waitForLoaderToDisappear();
    speclib.addStepAutoNumber('Click all products category');
    ProductPage.allProductsCategory.click();
    ProductPage.waitForLoaderToAppear();
    ProductPage.waitForLoaderToDisappear();
    browser.pause(1000);
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  it('C184251 Product search by brand name', function () {
    speclib.addTestId('184251');
    speclib.addStepAutoNumber('Filter product results by random brand');
    brandName = ProductPage.filterProductResultByRandomBrand();
    speclib.addStepAutoNumber('Verify products are filtered correctly');
    if (!brandName) {
      this.skip();
    }
    expect(ProductPage.findBrandName(brandName).length).toEqual(ProductPage.availableArticles.length);
  });

  it('C184252 Product filtered by L1 category', function () {
    if (!brandName) {
      this.skip();
    }
    speclib.addTestId('184252');
    speclib.addStepAutoNumber('Filter product results by l1 category');
    ProductPage.filterProductResultByCategory(ProductPage.l1Category);
    speclib.addStepAutoNumber('Verify products are filtered correctly');
    expect(ProductPage.findBrandName(brandName).length).toBeGreaterThan(0);
  });

  it('C184253 Product filtered by L2 category', function () {
    if (!brandName) {
      this.skip();
    }
    speclib.addTestId('184253');
    speclib.addStepAutoNumber('Filter product results by l2 category');
    ProductPage.filterProductResultByCategory(ProductPage.l2Category);
    speclib.addStepAutoNumber('Verify products are filtered correctly');
    expect(ProductPage.findBrandName(brandName).length).toBeGreaterThan(0);
  });

  it('C180947 As a Rep, I can search for products using the web back office by price range', () => {
    speclib.addTestId('180947');
    speclib.addStepAutoNumber('Click clear all filter button');
    ProductPage.clearAllFilter();
    browser.pause(1500);
    speclib.addStepAutoNumber('Filter products by random price');
    priceRange = ProductPage.filterProductResultByRandomPrice();
    browser.pause(500);
    speclib.addStepAutoNumber('Verify products are filtered correctly');
    expect(ProductPage.checkPrinceIntoRange(ProductPage.pricesNotHidden, priceRange)).toBeTruthy();
  });

  it('C180948 As a Rep, I can search for products using the web backoffice by key words', function () {
    if (!brandName) {
      this.skip();
    }
    speclib.addTestId('180948');
    speclib.addStepAutoNumber('Click clear all filter button');
    ProductPage.clearAllFilter();
    speclib.addStepAutoNumber('Click search button');
    ProductPage.searchButton.click();
    ProductPage.waitForLoaderToAppear();
    browser.pause(500);
    speclib.addStepAutoNumber('Search by product name');
    ProductPage.searchByProductName(brandName);
    browser.pause(700);
    speclib.addStepAutoNumber('Verify products are filtered correctly');
    expect(ProductPage.findBrandName(brandName).length).toBeGreaterThan(0);
  });

  it('C184254 As a Rep, I can search for products and filter the results by price', function () {
    if (!brandName) {
      this.skip();
    }
    speclib.addTestId('184254');
    speclib.addStepAutoNumber('Search by product name');
    ProductPage.searchByProductName(brandName);
    browser.pause(1000);
    speclib.addStepAutoNumber('Filter products by random price');
    priceRange = ProductPage.filterProductResultByRandomPrice();
    speclib.addStepAutoNumber('Verify products are filtered correctly');
    expect(ProductPage.checkPrinceIntoRange(ProductPage.pricesNotHidden, priceRange)).toBeTruthy();
  });
});

const config = require('config');
const BackOfficePage = require('../../backoffice.page');

/**
 * BackOfficeProductPage Class page
 *
 * @class
 * @classdesc Library of BackOfficeProductPage page
 * @extends BackOfficePage
 */
class ProductPage extends BackOfficePage {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**  @type {cssSelectorArr} */
  get hasShareProd() { return config.get('share'); }

  /** @type {cssSelectorObj} */
  get backOfficeProof() { return $('.my-back-office'); }

  /**  @type {cssSelectorArr} */
  get editButton() { return $$('.btn.bo-btn-type-3.icon-arrow-swoosh-down.fn-trigger-isolate'); }

  /** @type {cssSelectorObj} */
  get shareTitle() { return $('.fn-share-content'); }

  /** @type {cssSelectorObj} */
  get insertProductLink() { return $('.icon-paper-clip.add-product.fn-trigger-add-product'); }

  /** @type {cssSelectorObj} */
  get insertAssetLink() { return $('.icon-add-file.add-asset.fn-trigger-add-post'); }

  /** @type {cssSelectorObj} */
  get shareButton() { return $('div.form-field-wrapper button.btn.bo-btn-type-1'); }

  /** @type {cssSelectorObj} */
  get shareSuccessMessage() { return $('.message-box.message-box-success.fn-message-box'); }

  /** @type {cssSelectorObj} */
  get searchButton() { return $('#searchProduct + button'); }

  /** @type {cssSelectorObj} */
  get searchContent() { return $('#searchProduct'); }

  /** @type {cssSelectorObj} */
  get brandFilter() { return $('select.filter-select.fn-filter-select'); }

  /** Remove button enable in editable section, doesn't matter which
   * @type {cssSelectorObj} */
  get removeEnableButton() { return $('section.is-editable li > a.fn-trigger-edit-remove:not(.is-disabled)'); }

  /** Remove button is disabled in editable section, doesn't matter which
   * @type {cssSelectorObj} */
  get removeDisableButton() { return $('section.is-editable li > a.fn-trigger-edit-remove.is-disabled'); }

  // prodcut Library
  /** list of icons of available articles coming from product Library
   * @type {cssSelectorArr} */
  get prodLibIcons() { return $$('fieldset.fn-product-panel i.icon-check'); }

  /** list of descriptions of available articles coming from product Library
   * @type {cssSelectorArr} */
  get prodLibDesc() { return $$('fieldset.fn-product-panel article header h1'); }

  // departments

  /** @type {cssSelectorObj} */
  get allProductsCategory() { return $('li>a[data-name="All products"]'); }

  // Filter by Session
  /** @type {cssSelectorObj} */
  get clearFilter() { return $('a.fn-clear-filter=clear'); }

  /** @type {cssSelectorObj} */
  get brandsSelector() { return $('select[data-filter-type="brands"]'); }

  /** Data Library section
   * @type {cssSelectorTxt} */
  get dataLibrary() { return '[data-library="deals"]'; }

  /**  @type {cssSelectorArr} */
  get pricesNotHidden() { return $$('article:not(.is-hidden) p.price:not(.special)'); }

  /**  @type {cssSelectorArr} */
  get availableArticles() { return $$('article:not(.is-hidden)'); }

  /** clear search button inside of search field.
   * It is visible only when the search field has some text
   * @type {cssSelectorObj} */
  get clearSearchBtn() { return $('form.fn-search-form div.fn-clear-search'); }

  /**  @type {cssSelectorObj} */
  get btnApply() { return $('button.filters-btn'); }

  /**  @type {cssSelectorObj} */
  get l1Category() { return $('li:nth-of-type(2) a.category'); }

  /**  @type {cssSelectorObj} */
  get l2Category() { return $('li a.sub-category'); }

  /**
   * Returns array of products by its name
   * Sometimes actual brand name in html is a part of full product name
   * e.g. 'My Clarnis' => 'Clarnis'. In this case brand name is splat
   * and the function looks for each work in it
   *
   * @param {string} brandName product name
   * @returns {array.object} article with name received on parameter
   */
  findBrandName(brandName) {
    if (this.getProductsArrayByBrandName(brandName).length > 0) {
      return this.getProductsArrayByBrandName(brandName);
    }

    const splatBrandNames = brandName.split(' ');
    let result = [];
    splatBrandNames.forEach((name) => {
      const foundProducts = this.getProductsArrayByBrandName(name);
      if (foundProducts.length > 0) {
        result = foundProducts;
      }
    });
    return result;
  }

  /**
   * Returns array of products by its name
   * @param name product name
   * @returns array of products
   */
  getProductsArrayByBrandName(name) {
    return $$(`h1*=${name}`);
  }

  /**
   * waitForLoaderToDisappear() waits for the products spinner to disappear
   */
  waitForLoaderToDisappear(timeout = 20000) {
    super.waitForLoadingIconDisappear(timeout);
  }

  /**
   * waitForLoaderToAppear() waits for the products spinner to appear
   */
  waitForLoaderToAppear() {
    const pollInterval = 50;
    let counter = 0;
    const iterations = 50; // wait for 2500
    while (counter < iterations) {
      if (this.loadingPage.isDisplayed()) {
        break;
      } else {
        browser.pause(pollInterval);
        counter += 1;
      }
    }
    browser.pause(500);
  }

  /**
   * Share Update with a Product or Asset
   * @param {string} updateType
   * @param {number} index product index
   * @returns {boolean}
   */
  share(updateType, index = undefined) {
    this.shareTitle.waitForDisplayed();
    this.shareTitle.click();
    this.shareTitle.setValue(`QA Shared ${updateType} from Backoffice`);
    if (updateType === 'product') {
      this.insertProductLink.click();
    } else {
      this.insertAssetLink.click();
    }
    this.waitForLoadingIconDisappear(15000);
    this.selectProduct(updateType === 'product', index);
    this.waitForLoadingIconDisappear(20000);
    this.shareButton.click();
    this.waitForLoadingIconDisappear(20000);
    return this.shareSuccessMessage.waitForDisplayed({ timeout : 10000 });
  }

  /**
   * filter products search results by level 2 category
   * @param {cssSelectorObj} category the level can be l1 or l2
   */
  filterProductResultByCategory(category) {
    browser.pause(800);
    this.allProductsCategory.scrollIntoView();
    category.waitForDisplayed();
    category.click();
    this.waitForLoaderToDisappear();
    browser.pause(500);
  }

  /**
   * filter products search results by brand
   * @returns {string} name of selected brand
   * If there are no brands to filter returns undefined
   */
  filterProductResultByRandomBrand() {
    this.brandFilter.click();
    const allBrands = this.brandsSelector.$$('option');
    if (allBrands.length === 1 && allBrands[0].getText() === 'Select brands') {
      return undefined; // If there are no brands to filter returns undefined
    }
    const chosenBrand = allBrands[this.randomNumber(allBrands.length, 1)];
    const brandName = chosenBrand.getText();
    chosenBrand.click();
    this.brandFilter.click();
    this.clickOnApplyButton();
    return brandName;
  }

  /**
   * filter products search results by price
   * @param {String} price is the product's price range configured in retailer's config file
   */
  filterProductResultByRandomPrice() {
    const prices = $$('[data-filter-type="prices"]');
    const randomPrice = prices[this.randomNumber(prices.length)];
    const priceRange = randomPrice.getValue();
    randomPrice.click();
    browser.pause(500);
    this.clickOnApplyButton();
    return priceRange;
  }

  /**
   * Clear search field and all filters applied to products filtered
   * the category is reset also to all Products
   */
  clearAllFilter() {
    if (this.clearSearchBtn.isDisplayed()) {
      this.clearSearchBtn.click();
      this.waitForLoaderToDisappear();
      this.searchButton.click();
      this.searchButton.click();
      this.waitForLoaderToAppear();
    } else if (this.clearFilter.isDisplayed()) {
      this.clearFilter.click();
      this.clickOnApplyButton();
    }
    this.waitForLoaderToDisappear();
    browser.pause(1000);
  }

  /**
   * filter products search results by product name
   * @param {String} [name=''] is the product's name configured in retailer's config file
   */
  searchByProductName(name = '') {
    this.searchContent.setValue(name);
    this.searchButton.click();
    this.waitForLoaderToAppear();

    this.waitForLoaderToDisappear();
  }

  /**
   * clickOnApplyButton() - ensure the element is visible and click, for avoid issue 'element not interactable'
   */
  clickOnApplyButton() {
    this.btnApply.scrollIntoView();
    this.btnApply.click();
    this.waitForLoaderToAppear();
    this.waitForLoaderToDisappear();
    browser.pause(2500);
  }

  /**
   *
   *
   * @param {Array} prices list of prices
   * @param {String} range usual format $50 - $200
   * @returns {Boolean}
   */
  checkPrinceIntoRange(prices, range) {
    // create an array with range of price and converted from string to number
    const priceRange = range.match(/\d+/g).map((x) => Number(x));
    // convert the prices from string to Number
    const integerPrices = prices.map((x) => this.returnIntegerPrice(x.getText()));

    if (priceRange.length === 1) {
      // only price start from (ex. +$2000)
      return (integerPrices.every((p) => p >= priceRange[0]));
    }
    return (integerPrices.every((p) => p >= priceRange[0] && p <= priceRange[1]));
  }

  /**
   * return the prince with Integer format and remove currency signal also
   * @param {String} price Example: $1,000.00
   * @returns {integer} price without currency signal and no decimals ex. 1000
   */
  returnIntegerPrice(price) {
    return (Number(price.match(/(?:\d|,)+(?:)?/).toString().replace(/,/, '')));
  }
}
module.exports = new ProductPage();

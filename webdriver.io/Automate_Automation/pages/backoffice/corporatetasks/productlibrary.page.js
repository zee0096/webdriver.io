const Page = require('../../page');

/**
 * ProductLibrary Class page
 *
 * @class
 * @classdesc Library of ProductLibrary page
 * @extends Page
 */
class ProductLibrary extends Page {
  /**
   *Creates an instance of NEW Back Office Page.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /*
  * product library
  * acronyms
  * categ = category / categories
  */
  /**  @type {cssSelectorObj} */
  get searchField() { return $('input[name="search"]'); }

  /**  @type {cssSelectorObj} */
  get clearSearch() { return $('div.action-search__clear'); }

  /**  @type {cssSelectorObj} */
  get cancelProductBtn() { return $('button.bo-button--is-secondary[ng-click="onCancelClick()"]'); }

  /**  @type {cssSelectorObj} */
  get addProductBtn() { return $('button[ng-click="attachProducts()"]'); }

  // works for current category in level 1 and 2
  /**  @type {cssSelectorArr} */
  get categoryList() { return $$('li[ng-repeat="category in categories"] a'); }

  // images of products
  /**  @type {cssSelectorArr} */
  get productList() { return $$('div.products-list__element'); }

  /**  @type {cssSelectorObj} */
  get emptyState() { return $('div.empty-state__text'); }

  /**
   * method for searching products
   * @param {String} str
   */
  searchProductsByField(str) {
    this.searchField.setValue(str);
    browser.keys('\uE007'); // click 'Enter' button
    this.waitForLoadingIconDisappear(); // wait spinner to disappear

    const hideSearch = $('[ng-click="hideAutoComplete()"]');
    hideSearch.click(); // for hide search
  }
}
module.exports = new ProductLibrary();

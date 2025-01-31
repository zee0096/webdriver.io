const config = require('config');
const BackOfficePage = require('../../backoffice.page');

/**
 * EditSection Class page
 *
 * @class
 * @classdesc Edit products from Home page in different sections (top picks, new arrivals )
 * @extends BackOfficePage
 */
class EditSectionPage extends BackOfficePage {
  /**
   * Edit products from Home page in different sections (top picks, new arrivals )
   * @constructor
   */
  constructor() {
    super();

    /** EDIT_OPTIONS
    * @typedef EDIT_OPTIONS
    * @type {object<string>}
    * @property {number} remove='remove'
    * @property {number} change='change'
    * @property {number} save='save'
    * @property {number} cancel='cancel'
    */
    this.EDIT_OPTIONS = Object.freeze({
      remove : 'remove',
      change : 'change',
      save   : 'save',
      cancel : 'cancel',
    });

    /** HOME_PAGE_SECTIONS
    * @typedef HOME_PAGE_SECTIONS
    * @type {object<number>}
    * @property {number} topPicks=0
    * @property {number} newArrivals=1
    */
    this.HOME_PAGE_SECTIONS = Object.freeze({
      topPicks    : 0,
      newArrivals : 1,
    });
  }

  /** total of products on Top Picks section
   * @type {number} */
  get tpProductCount() { return config.get('bo.product.tpProductCount'); }

  /** total of products on Nw Arrivals section
   * @type {number} */
  get naProductCount() { return config.get('bo.product.naProductCount'); }

  /** Existence of rep comments on sf
   * @type {boolean} */
  get hasRepComments() { return config.get('sf.hasRepComments'); }

  /** Returns selector of top pics product title
   * @type {string} */
  get topPicsProductTitleSel() { return config.get('bo.product.tpProductTitleSel'); }

  /**
  * @type {cssSelectorObj} */
  get editTopPicsIcon() { return $('div.btn-edit--top-picks>a, section.fn-product-edit:nth-child(1) div.btn-edit > a'); }

  /** return a list of description of products displayed
  * @type {cssSelectorArr} */
  get productDescriptionTxt() { return $$('section.is-editable .product__description, section.is-editable .product-item__content__title '); }

  /** return a list of Img URL of products displayed
  * @type {cssSelectorArr} */
  get productImgLnk() { return $$('section.is-editable img'); }

  /**
   * @type {cssSelectorObj} */
  get removeBtn() { return $('section.is-editable li > a.fn-trigger-edit-remove'); }

  /**
   * @type {cssSelectorObj} */
  get changeEnableButton() { return $('section.is-editable li > a.fn-trigger-manage:not(.is-disabled)'); }

  /* *************************
  *      prod Description
  * ************************** */

  /** list of all description products in top picks section in BO page
   * @type {cssSelectorArr} */
  get listOfTopPicsArticlesInBo() {
    return $$('section:not([data-library="deals"], .identity-ctn, .recommendations-panel) article');
  }

  /** list of all description products in top picks section in SF page
   * @type {cssSelectorArr} */
  get listOfTopPicsArticlesInSf() {
    return $$('#AtTopPicks article, #my-deals article');
  }

  /** list of all description products in new arrivals  section in BO page
   * @type {cssSelectorArr} */
  get listOfNewArrivalsArticlesInBo() {
    return $$('section[data-library=deals] article');
  }

  /** list of all description products in new arrivals  section in SF page
   * @type {cssSelectorArr} */
  get listOfNewArrivalsArticlesISf() {
    return $$('#AtNewArrivals article, #my-featured-items article');
  }

  /** list of all description products in top picks section ( No inside edit page) in BO page
   * @type {cssSelectorArr} */
  get listOfTopPicksProductDescriptionsBo() {
    return $$(this.topPicsProductTitleSel);
  }

  /** list of all description products in NEW ARRIVALS section ( No inside edit page) in BO Page
    * @type {cssSelectorArr} */
  get listOfNewArrivalsProductDescriptionsBo() {
    return $$(
      'section[data-library="deals"] article h3,'
       + ' section[data-library="deals"]  article h2.product-item__content__title',
    );
  }

  /** list of all description products in TOP PICS  section ( No inside edit page) in STOREFRONT page
   * @type {cssSelectorArr} */
  get listOfTopPicsProductDescriptionsSf() {
    return $$(`#AtTopPicks ${config.get('sf.articles.prdDescCss')}`);
  }

  /** list of all description products in NEW ARRIVES section ( No inside edit page) in STOREFRONT page
   * @type {cssSelectorArr} */
  get listOfNewArrivalsProductDescriptionsSf() {
    return $$(`#AtNewArrivals ${config.get('sf.articles.prdDescCss')}`);
  }

  // NEW ARRIVALS Properties

  /**
   * Edit button in new arrivals section
   * @type {cssSelectorObj} */
  get editNewArrivalsBtn() { return $('section[data-library="deals"] div.btn-edit a'); }

  /**
   * clickOnEditBtnOnTopPicks() edit button in top pics section in BO
   */
  clickOnEditBtnOnTopPicks() {
    this.editTopPicsIcon.moveTo();
    this.editTopPicsIcon.click();
    browser.pause(500);
  }

  /**
   * clickOnEditBtnOnNewArrivals() edit button in new arrivals section in BO
   */
  clickOnEditBtnOnNewArrivals() {
    this.editNewArrivalsBtn.waitForClickable();
    this.editNewArrivalsBtn.click();
    this.waitForLoadingIconDisappear(10000);
  }

  /**
   * selectProds Select products ramdomly (1 for change and 2 for remove products) that should be changed/removed
   * update the class property that will be used after
   * @param {HOME_PAGE_SECTIONS}
   * @param {EDIT_OPTIONS}
  */
  selectProds(section, action) {
    if (action === this.EDIT_OPTIONS.change) {
      // change select only one product
      this.listOfProd2Del = [1];
    } else {
      let productsCount;
      if (section === this.HOME_PAGE_SECTIONS.topPicks) {
        productsCount = this.tpProductCount - 1;
      } else {
        productsCount = this.naProductCount - 1;
      }
      this.listOfProd2Del = [0, Math.ceil(productsCount / 2)];
    }

    this.prodDescBeforeDel = this.listOfProd2Del.map((i) => this.getArticleDescription(i));
    this.prodImgBeforeDel = this.listOfProd2Del.map((i) => this.getArticleImageLnk(i));
  }

  /**
   * getArticleDescription return the description of an item send by parameter of
   * the products displayed
   * @param {number} item - the item of product displayed to get the description of product
   * @return {string} description of product
  */
  getArticleDescription(item) {
    return this.productDescriptionTxt[item].getText();
  }

  /**
   * getArticleImageLnk return the URL of image send by parameter of
   * the products displayed
   * @param {number}  item - the item of product displayed to get the URL/Link of product
   * @return {urlAddress} - url Address of product image
  */
  getArticleImageLnk(item) {
    return this.productImgLnk[item].getAttribute('src');
  }

  /**
   * checkProducts() - select products based on the provided items into selected section.
   */
  checkProducts() {
    const availableArticles = this.productImgLnk;
    this.listOfProd2Del.forEach((item) => {
      browser.pause(50);
      availableArticles[item].click();
    });
    browser.pause(400);
  }

  /** clickOnRemoveBtn - click on remove button in edit mode
  */
  clickOnRemoveBtn() {
    if (!this.removeBtn.isClickable()) {
      this.removeBtn.scrollIntoView();
      browser.pause(1000);
    }
    this.removeBtn.click();

    this.removeBtn.waitUntil(() => this.removeBtn.getAttribute('class').includes('is-disabled'), {
      timeout    : 10000,
      timeoutMsg : 'It took more than 10 seconds to remove items! ',
    });

    browser.pause(500);
  }

  /**
   * compare previous descriptions and images to current and chech if they are the equals
   *
   * @returns {boolean} if products were changed
  */
  verifyProductsChangedAfterAction() {
    return browser.waitUntil(() => {
      const prodDescAfterDel = this.listOfProd2Del.map((i) => this.getArticleDescription(i));
      const prodImgAfterDel = this.listOfProd2Del.map((i) => this.getArticleImageLnk(i));

      const productsCheck = this.prodDescBeforeDel.every((v, i) => this.compareProdDesc(v, prodDescAfterDel[i]));
      const prodImgCheck = this.prodImgBeforeDel.every((v, i) => this.compareProdDesc(v, prodImgAfterDel[i]));
      return !productsCheck || !prodImgCheck;
    }, {
      timeout    : 15000,
      timeoutMsg : 'Products are not changed after action',
    });
  }

  /**
   * compareProdDesc() - compares the provided two String
   *
   * @param {string} firstElem the element from the first array
   * @param {string} secondElem the element from the second array
   * @returns {boolean}  if the elements match
   */
  compareProdDesc(firstElem, secondElem) {
    return firstElem === secondElem;
  }

  /** clickOnChangeBtn - click on change button in edit mode
  */
  clickOnChangeBtn() {
    // necessary to check if the button is clickable and move to button
    // into viewport
    if (!this.changeEnableButton.isClickable()) {
      this.changeEnableButton.scrollIntoView();
      browser.pause(500);
    }
    this.changeEnableButton.click();
    browser.pause(500);
  }

  /**
   * Gets list of products in BO
   * @param section new arrivals or top pics
   */
  listOfProdsInBo(section) {
    browser.pause(2000);
    if (section === this.HOME_PAGE_SECTIONS.topPicks) {
      this.bolistOfProducts = this.listOfTopPicksProductDescriptionsBo.map((element) => element.getText().toUpperCase());
    } else if (section === this.HOME_PAGE_SECTIONS.newArrivals) {
      this.bolistOfProducts = this.listOfNewArrivalsProductDescriptionsBo.map((element) => element.getText().toUpperCase());
    }
  }

  /**
   * Gets list of products in SF
   * @param section new arrivals or top pics
   */
  listOfProdsInSf(section) {
    if (section === this.HOME_PAGE_SECTIONS.topPicks) {
      this.sflistOfProducts = this.listOfTopPicsProductDescriptionsSf.map((element) => element.getText().toUpperCase());
    } else if (section === this.HOME_PAGE_SECTIONS.newArrivals) {
      this.sflistOfProducts = this.listOfNewArrivalsProductDescriptionsSf.map((element) => element.getText().toUpperCase());
    }
  }

  /**
   * This methods gets list of prices of elements from top pics or new arrivals section in BO and saves them into bolistOfProducts variable
   * @param section {string} top pics or new arrivals
   */
  listOfPricesInBo(section) {
    if (section === this.HOME_PAGE_SECTIONS.topPicks) {
      this.bolistOfProducts = this.getPricesFromListOfProducts(this.listOfTopPicsArticlesInBo);
    } else if (section === this.HOME_PAGE_SECTIONS.newArrivals) {
      this.bolistOfProducts = this.getPricesFromListOfProducts(this.listOfNewArrivalsArticlesInBo);
    }
  }

  /**
   * This methods gets list of prices of elements from top pics or new arrivals section in SF and saves them into sflistOfProducts variable
   * @param section {string} top pics or new arrivals
   */
  listOfPricesInSf(section) {
    if (section === this.HOME_PAGE_SECTIONS.topPicks) {
      this.sflistOfProducts = this.getPricesFromListOfProducts(this.listOfTopPicsArticlesInSf);
    } else if (section === this.HOME_PAGE_SECTIONS.newArrivals) {
      this.sflistOfProducts = this.getPricesFromListOfProducts(this.listOfNewArrivalsArticlesISf);
    }
  }

  /**
   * This elements returns array of prices from articles using a regular expression
   * @param elements {cssSelectorArr}
   * @returns {array} list of prices
   */
  getPricesFromListOfProducts(elements) {
    browser.pause(3000);
    const productPriceRegExp = new RegExp(`[${this.currency}]{0,}[\\d,.]{2,}`, 'g');
    return elements.map((element) => element.getText().match(productPriceRegExp)).flat(2).sort().map((price) => price.match(/\d+/g));
  }
}
module.exports = new EditSectionPage();

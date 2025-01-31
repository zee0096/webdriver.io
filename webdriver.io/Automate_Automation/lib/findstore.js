const config = require('config');
const Widget = require('./widget');

/**
 * SidebarPage Class page
 *
 * @class FindStore
 * @classdesc Find store page inside mainpage of widget open a new page
 * @extends Widget
 */

class FindStore extends Widget {
  /**
   *Creates an instance .
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /** get the name of city of store
   *  @type {String} */
  get changedStoreCityName() { return config.get('changedStoreCity'); }

  /** @type {cssSelectorTxt} */
  get firstStoreInSearchResult() { return '.pac-item:nth-child(1)'; }

  /** search field for store location
   *  @type {cssSelectorObj} */
  get findStoreLocationFld() { return $('#findStorePlaceInput'); }

  /** show the visit storefront link/button
   *  @type {Boolean} */
  get hasVisitStorefrontBtn() { return config.get('lp.visitStorefront'); }

  /** @type {cssSelectorTxt} */
  get mapStoreImageSel() { return 'a.fn-google-map > img'; }

  // Selectors

  /**  @type {cssSelectorArr} */
  get hideMapBtn() { return $$('div.findstore__store-item > a.fn-display-map:not(.findstore__store-item__link--is-hidden)'); }

  /** @type {cssSelectorObj} */
  get mapImage() { return $('a.fn-google-map > img'); }

  /**  @type {cssSelectorArr} */
  get showMapBtn() { return $$('div.findstore__store-item > a.fn-display-map:not(.findstore__store-item__link--is-hidden)'); }

  /**  @type {cssSelectorArr} */
  get storeChooseButtons() { return $$('button.findstore__store-item__button'); }

  /** @type {cssSelectorObj} */
  get storeNameLandingPage() { return $('.landing-page__carousel__location--is-link'); }

  /**  list of visit Store links
   * @type {cssSelectorArr} */
  get visitThisStoreLnk() { return $$('a.findstore__store-item__team-link'); }

  /**
   * clickOnVisitThisStoreLnk() click on store name to changes the store location
   */
  clickOnVisitThisStoreLnk(item = 0) {
    this.switchToServicesLandingFrameId();
    this.visitThisStoreLnk[item].click();
    browser.pause(1000);
    this.tempWindowId = this.getWindowIdFromNewWindow();
    browser.switchToWindow(this.tempWindowId);
  }

  /** get the N visit this Store selector
   * @returns {cssSelectorObj}
  */
  storeNameInVisitThisStoreLnk(item = 0) {
    this.switchToServicesLandingFrameId();
    return (this.visitThisStoreLnk[item]);
  }

  /**
   * clickOnShowOnMapLnk() shows the map for the specified store (by index, first being 0)
   *
   * @param {integer} [numlist=0] the index of the Show Map link to click on
   */
  clickOnShowOnMapLnk(numlist = 0) {
    this.switchToServicesLandingFrameId();
    browser.waitUntil(() => this.showMapBtn.length > 0, { timeout : 3000, interval : 500 });
    this.showMapBtn[numlist].waitForExist();
    this.showMapBtn[numlist].click();
    this.mapImage.waitForDisplayed();
  }

  /**
   * hides the map for the specified store (by index, first being 0) - Not check is done
   * to see if map was showing or not
   *
   * @param {integer} [numlist=0] the index of the Hide Map link to click on
   */
  clickOnHideStoreMapLnk(numlist = 0) {
    this.hideMapBtn[numlist].click();
  }

  /**
   * changeStoreBySearchField() changes store using the input search field and
   * put the content of changedStoreCity variable (config-stg)
   */
  changeStoreBySearchField() {
    this.switchToServicesLandingFrameId();
    this.findStoreLocationFld.setValue(this.changedStoreCityName);
    $(this.firstStoreInSearchResult).waitForDisplayed({ timeout : 5000 });
    // selecting the 1st city available in dropdown list in search field
    $(this.firstStoreInSearchResult).click();
    browser.pause(1000);
    this.storeChooseButtons[0].click();
  }
}
module.exports = new FindStore();

const config = require('config');
const PageLib = require('../../lib/pagelib');

/**
 * SidebarPage Class page
 *
 * @class ChangeRep
 * @classdesc Library of storefront page
 * @extends PageLib
 */

class ChangeRepPage extends PageLib {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.title = 'changerep class';
  }
  // eslint-disable-next-line no-unused-vars

  /** @type {string} */
  get ChangedChatStore() { return config.get('changedChatStore'); }

  /** show the visit storefront link/button
   *  @type {boolean} */
  get hasVisitStorefrontBtn() { return config.get('lp.visitStorefront'); }

  /**  @type {cssSelectorTxt} */
  get repPictures() { return 'img.carousel__picture, #rep-pictures > img'; }

  /** @type {cssSelectorObj} */
  get sidebarLogoImg() { return $(this.widgetLogoCss); }

  /** Store name
     * @type {string} */
  get storeName() { return config.get('store'); }

  // Selectors

  /** Dropbox of store city
   * @type {cssSelectorObj} */
  get chatStoreCityDrp() { return $('#store option[selected], #storeDropdown option[selected]'); }
  // eslint-enable-next-line no-unused-vars

  /**  @type {cssSelectorArr} */
  get visitStoreButtons() { return $$('a.findstore__store-item__team-link'); }

  /** @type {cssSelectorTxt} */
  get widgetLogoCss() { return 'div.sidebar  img'; }

  /**
   * getChatStoreCity() returns the store/city from the chat service window
   *  @return {string} the store/city from the chat service window
   */
  getChatStoreCity() {
    return this.chatStoreCityDrp;
  }

  /**
   * visitStore() goes to the specified storefront (by index, first being 0). Only for Team mode
   * @param {number} numlist the index of the Visit Store link to click on
   * @return {urlAddress} the URL of the loaded storefront
   */
  visitStore(numlist) {
    browser.pause(200);
    this.visitStoreButtons[numlist].click();
    browser.switchToFrame();
    const newTabList = browser.getTabIds();
    browser.switchTab(newTabList[newTabList.length - 1]);
    // StorefrontPage.jumbotron.waitForDisplayed();
    return (browser.getUrl());
  }
}
module.exports = new ChangeRepPage();

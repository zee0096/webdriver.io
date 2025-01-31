const config = require('config');

const Frontend = require('../../lib/frontend');

/**
 * ShoppingPage Class page
 *
 * @class ShoppingPage
 * @classdesc Library of storefornt page
 * @extends Frontend
 */
class ShoppingPage extends Frontend {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /** @type {cssSelectorObj} */
  get footer() { return $('#sf-footer-companion-wrapper'); }

  /** return the string of shoppingUrl using LOCALE
   * @type {urlAddress} */
  get getShoppingUrl() { return config.get(`lang.${this.LOCALE}.shoppingUrl`); }

  get getShoppingIp() { return config.get(`lang.${this.LOCALE}.shoppingIp`); }

  /** @type {cssSelectorObj} */
  get jumbotron() { return $('div.jumbotron__content'); }

  /**
   * clickProduct() clicks the first product on the page to move from Storefront to Shopping page
   */
  clickProduct() {
    this.waitForLoadingIconDisappear();
    this.products[0].$('a').click();
    // bloom has a pop over window that needs to be cleared before proceeding...
    if (this.RETAILER === 'bloom') {
      if ($('.lightbox_close').isDisplayed()) {
        $('.lightbox_close').click();
      }
    }
  }

  /**
   * openShoppingPage() opens the shopping webpage
   * @param {boolean} [comex=false]
   */
  openShoppingPage(comex = false) {
    this.setBrowserSize();
    let storeRepName = (this.isTeamMode) ? `sf_store=${config.get('storeAPIValue')}` : `sf_rep=${this.REP_NAME}`;
    const shoppingIp = this.getShoppingIp;
    if (this.isProdEnv) {
      this.openWebPage(`${this.getBackofficeUrl}/${this.REP_NAME}`);
      this.openWebPage(this.insertWidgetsOnUrl(`${this.getBackofficeUrl}/tests/desktop?${storeRepName}`));
    } else {
      if (comex) {
        storeRepName += '&page=comex';
      }
      const url = this.getShoppingUrl;
      if (url.includes('?')) {
        this.openWebPage(`${url}&${storeRepName}`);
      } else if (shoppingIp.includes('?sf_ip')) {
        this.openWebPage(`${url}${shoppingIp}`);
      } else {
        this.openWebPage(`${url}?${storeRepName}`);
      }
    }
    this.clearPopUps();
  }

  /**
   * insertWidgetsOnUrl() insert the word widgets on urlAddress after ://
   * the it is not necessary to create another variable
   *
   * @param {urlAddress} url Address the urlAddress that need be added widgets into
   * @return {urlAddress} url with widgets text added after :// on original url
   */
  insertWidgetsOnUrl(url) {
    return (url.replace('://', '://widgets.'));
  }
}
module.exports = new ShoppingPage();

const config = require('config');
const Frontend = require('../lib/frontend');

/**
 * FooterPage Class page
 *
 * @class FooterPage
 * @classdesc Library of footerpage page
 * @requires Frontend
 */

class FooterPage extends Frontend {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    /** windows ID list
     * @type {string[]}
     */
    this.windowsList = [];
    /** sidebar tab id
     * @type {string}
     */
    this.sbTabId = '';
    /** backoffice tab id
     * @type {string}
     */
    this.boTabId = '';
  }

  /** return the string of shoppingUrl using LOCALE
  /** return the string of footer urlAddress using LOCALE
   * @type {urlAddress} */
  get footerUrl() { return config.get(`lang.${this.LOCALE}.shoppingUrl`); }

  /** return the footer true/false
   * @type {boolean} */
  get hasFooter() { return config.get('hasFooter'); }

  /** Footer page has email me request
   * @type {boolean} */
  get hasEmailMeRequest() { return config.get('ft.hasEmailMeRequest'); }

  /** Footer page has appointment request
   * @type {boolean} */
  get hasAppointmentRequest() { return config.get('ft.hasAppointmentRequest'); }

  /** Footer page has live chat
   * @type {boolean} */
  get hasLiveChat() { return config.get('ft.hasLiveChat'); }

  /** return the string of footer url using LOCALE
   * @type {cssSelectorTxt} */
  get footerPageIframeId() { return 'iframe[id="sf-footer-companion"]'; }

  /** return the string of footer url using LOCALE
    * @type {cssSelectorObj} */
  get liveChatLink() { return $('li.footer__action__chat a'); }

  /** return the string of footer url using LOCALE
    * @type {cssSelectorObj} */
  get appntRequestLnk() { return $('a[data-name="footer-appointment"]'); }

  /** return the string of footer url using LOCALE
    * @type {cssSelectorObj} */
  get personalShopperLnk() { return $('a[data-name="footer-shopper"]'); }

  /** return the string of footer url using LOCALE
    * @type {cssSelectorObj} */
  get emailMeLnk() { return $('a[data-name="footer-emailme"]'); }

  /** return the string of footer url using LOCALE
    * @type {('storefront'|'shoppingLink')} */
  get expectedAcquisition() { return this.isProdEnv ? 'storefront' : 'shoppingLink'; }

  /** repImageInFooter return the rep image in footer
   * @type {string} */
  get repImageInFooter() { return 'img.footer__profile__image'; }

  /** @type {cssSelectorObj} */
  get footer() { return $('#sf-footer-companion-wrapper'); }

  /** @type {cssSelectorObj} */
  get chatAvailable() { return $('.is-available'); }

  /**
   * openSidebarpage() opens the Sidebar webpage and save the windowsId
   * @type {object}  argsObj - Object that will receive the parameters
   * @prop {boolean} [argsObj.openNewWindow=false] - Open footer in new window
   */
  openFooterPage(argsObj = {}) {
    // eslint-disable-next-line no-param-reassign
    argsObj.openNewWindow = argsObj.openNewWindow ?? false;

    browser.pause(300);
    if (argsObj.openNewWindow) {
      browser.newWindow(this.getFooterUrl());
    } else {
      super.openWebPage(this.getFooterUrl());
    }

    this.sbWindowId = browser.getWindowHandle();
    this.feWindowId = browser.getWindowHandle();
    // waiting to load the widget
    browser.pause(5000);
  }

  /** return the string of sidebarUrl using LOCALE + geoIP
  * @param {boolean} [comex=false]
  * @returns {urlAddress} urlAddress of sidebar */
  getFooterUrl(comex = false) {
    let extraArgs = '';
    let urlLink = '';
    if (this.isTeamMode) {
      extraArgs = `&sf_store=${config.get('storeAPIValue')}`;
    } else {
      extraArgs = `&sf_rep=${this.REP_NAME}`;
    }

    if (comex) {
      extraArgs += '&page=comex';
    }

    urlLink = this.footerUrl;
    if (urlLink.indexOf('?') === -1) {
      urlLink = `${urlLink}?lang=${this.LOCALE.substring(0, 2)}${extraArgs}`;
    } else {
      urlLink = `${urlLink}&lang=${this.LOCALE.substring(0, 2)}${extraArgs}`;
    }

    return urlLink;
  }

  /**
  * clickLiveChatLink click on Livechat icon on footer page
   */
  clickLiveChatLnk() {
    this.switchToFooterIframe();
    this.liveChatLink.click();
    browser.pause(500);
    this.widgetWindowClient = this.getWindowIdFromNewWindow();
    browser.switchToWindow(this.widgetWindowClient);
  }

  /**
  * clickOnAppntRequestLnk click on Appoint Request icon on footer page
   */
  clickOnAppntRequestLnk() {
    this.switchToFooterIframe();
    this.appntRequestLnk.click();
    browser.pause(500);
    this.widgetWindowClient = this.getWindowIdFromNewWindow();
    browser.switchToWindow(this.widgetWindowClient);
  }

  /**
  * clickOnAppntRequestLnk click on Appoint Request icon on footer page
   */
  clickOnMailMeLnk() {
    this.switchToFooterIframe();
    this.emailMeLnk.click();
    browser.pause(500);
    this.widgetWindowClient = this.getWindowIdFromNewWindow();
    browser.switchToWindow(this.widgetWindowClient);
  }

  /**
  * clickOnPersonalShopperLnk click on Personal Shopper icon/link on footer page
   */
  clickOnPersonalShopperLnk() {
    this.switchToFooterIframe();
    this.personalShopperLnk.click();
    browser.pause(500);
    this.widgetWindowClient = this.getWindowIdFromNewWindow();
    browser.switchToWindow(this.widgetWindowClient);
  }

  /**
   * switchTosidebarWindow switch the windows to sidebar page
   */
  switchToFooterWindow() {
    browser.switchToWindow(this.sbWindowId);
    browser.pause(300);
  }

  /**
   * change the focus to footer Iframe
   */
  switchToFooterIframe() {
    this.selectIFrame(this.footerPageIframeId, { hasParentFrame : true });
  }

  /**
   * repNameDisplayedInFooter() return the rep/store name displayed in the footer
   * @return {string} Rep/Store name
   */
  repNameDisplayedInFooter() {
    this.switchToFooterIframe();
    browser.pause(300);
    return this.repStoreNameInFooter.getText();
  }

  /**
   * click On Rep Name In Footer */
  clickOnRepNameInFooter() {
    this.switchToFooterIframe();
    this.repStoreNameInFooter.click();
    browser.pause(500);
  }

  /**
   * click On Rep Avatar In Footer */
  clickOnRepAvatarInFooter() {
    browser.pause(500);
    this.switchToFooterIframe();
    $(this.repImageInFooter).click();
    browser.pause(500);
  }

  /**
   * repImageIsOk() verifies that the rep's image in the footer is correctly displayed
   * @return {boolean} Rep Images is Ok
   */
  repImageIsOk() {
    return (this.isRealImage(this.repImageInFooter));
  }

  /**
   * Footer Suppression requires about 30 seconds to function, so we wait
   * slightly longer and do some housecleaning on the page, if required.
   */
  waitForFooterSuppression() {
    browser.pause(35000);
  }

  /**
   * is Chat Available
   * @returns {boolean} is chatavailble is displayed */
  waitForLiveChatAvailable() {
    this.selectIFrame(this.footerPageIframeId);

    this.chatAvailable.waitForDisplayed();
    browser.switchToParentFrame();
  }
}
module.exports = new FooterPage();

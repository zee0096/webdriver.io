const config = require('config');
const Frontend = require('../lib/frontend');

/**
 * StorefrontPage Class page
 *
 * @class StorefrontPage
 * @classdesc Library of storefront
 * @extends Frontend
 */
class StorefrontPage extends Frontend {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  constructor() {
    super();
    /** save window ID of storefront page
     * @type {string}
     */
    this.sfWindowId = '';

    /** Modal window
     * @type {string}
     */
    this.widgetWindowClient = '';
  }

  /** Storefront page has live chat
   * @type {boolean} */
  get hasLiveChat() { return config.get('sf.mainPage.hasLiveChat'); }

  /** @type {cssSelectorArr} */
  get menuItems() { return $$(config.get('sf.menuItems')); }

  /** @type {cssSelectorArr} */
  get footerLinks() { return $$(config.get('sf.page404.footerLinks')); }

  /** @type {cssSelectorArr} */
  get repComments() { return $$(config.get('sf.repComments')); }

  /** @type {cssSelectorObj} */
  get aboutMeLink() { return $('.jumbotron__social-list__link[data-open="profileModal"]'); }

  /** @type {cssSelectorObj} */
  get updatesLink() { return $(config.get('sf.updatesLink')); }

  /** @type {boolean} */
  get hasUpdatesLink() { return config.get('sf.updatesLink') !== ''; }

  /** has email me request
   * @type {boolean} */
  get hasEmailMeRequest() { return config.get('sf.mainPage.hasEmailMeRequest'); }

  /** has appointment request
   * @type {boolean} */
  get hasAppointmentRequest() { return config.get('sf.mainPage.hasAppointmentRequest'); }

  /** @type {cssSelectorObj} */
  get link404() { return $(config.get('sf.page404.link404')); }

  /**  @type {string} */
  get availableRepText() { return config.get(`lang.${this.LOCALE}.sf.availableRepText`); }

  /** return the title of 404 page following the language selected
   * @type {string} */
  get sfHtmlTitle() { return config.get(`lang.${this.LOCALE}.sf.htmlTitle`); }

  /** @type {string} */
  get searchTrackingUrl() { return config.get(`lang.${this.LOCALE}.sf.searchTrackingUrl`); }

  /** @type {boolean} */
  get hasHeaderLinks() { return config.get('sf.menuItems') !== ''; }

  /** @type {boolean} */
  get hasFooterLinks() { return config.get('sf.page404.footerLinks') !== ''; }

  /** @type {number} */
  get expectedFooterCount() { return config.get(`lang.${this.LOCALE}.sf.footerContent`).length; }

  /** @type {number} */
  get trackingName() { return config.get('tracking'); }

  /** @type {cssSelectorObj} */
  get header() { return $('header.storefront-header'); }

  /** @type {cssSelectorObj} */
  get searchBtn() { return $('svg.storefront-header__icon--is-search,'
    + ' .js-storefront-search-btn'); }

  /** @type {cssSelectorObj} */
  get searchInput() { return $('input#searchInput'); }

  /** @type {string} */
  get pricesSelector() { return '.product__price'; }

  /** @type {cssSelectorArr} */
  get prices() { return $$(this.pricesSelector); }

  /** livechat box with available status on Rep storefront page
  * @type {cssSelectorObj} */
  get liveChatLink() { return $('#chat , div#AtChatStatus span.status__text--is-active'); }

  /** @type {cssSelectorObj} */
  get liveChatLinkUnavailable() { return $('div#AtChatStatus .js-status-is-off.status__text--is-active'); }

  /** @type {cssSelectorObj} */
  get jumbotron() { return $('div.jumbotron__content'); }

  /** @type {cssSelectorObj} */
  get repPictureImg() { return $('img.jumbotron__profile__pic'); }

  /** return the rep name (rep mode) or store name (team mode) displayed in storefront
   * @type {cssSelectorObj}
   */
  get repStoreNameInSF() { return $('h1'); }

  /** @type {cssSelectorObj} */
  get eventsHeader() { return $('#AtEventsTitle'); }

  /** @type {cssSelectorObj} */
  get chatButton() { return $('#chat , #AtChatStatus'); }

  /** this selected get the available button on sf
   *  it was in the config file before, but all retailers are using the same selector,
   *  then it was moved directly to here
   *  @type {cssSelectorObj}
   */
  get chatAvailable() { return $('#AtChatStatus span.js-status-is-on.status__text--is-active'); }

  /** @type {cssSelectorObj} */
  get appntButton() { return $('#AtAppointmentLink'); }

  /** @type {cssSelectorObj} */
  get psButton() { return $('#AtFinderLink'); }

  /** @type {cssSelectorObj} */
  get emailButton() { return $('#AtQuestionLink'); }

  /** @type {cssSelectorObj} */
  get sendButton() { return $('.js-form-btn'); }

  /** he atSpecials id is used on BRU/TRU
   * @type {cssSelectorArr} */
  get newArrivals() { return $$('#AtNewArrivals article, section[id="AtSpecials "] article'); }

  /** @type {cssSelectorArr} */
  get trendingProducts() { return $$('#AtTrendingRecs article'); }

  /** @type {cssSelectorObj} */
  get textField() { return $('#extraInfo'); }

  /** @type {cssSelectorObj} */
  get questionField() { return $('#questionField'); }

  /** @type {cssSelectorObj} */
  get smsButton() { return $('label[for="contactTextMessage"]'); }

  /** @type {cssSelectorObj} */
  get phone() { return $('#phone'); }

  /** @type {cssSelectorObj} */
  get updatesEmail() { return $('input[type="email"]'); }

  /** @type {cssSelectorObj} */
  get chatStatus() { return $('#AtChatStatus span.status__text--is-active'); }

  /** email iframe ID from storefront
   * @type {cssSelectorTxt} */
  get emailSfIframeId() { return 'iframe[id="ContactMe"]'; }

  /** Personal shopper iframe ID from storefront
  * @deprecated by personalshopper lib
  * @type {cssSelectorTxt} */
  get psSfIframeId() { return 'iframe[id="productFinder"]'; }

  /** Appointment Request iframe ID from storefront
   * @type {cssSelectorTxt} */
  get appntReqIframeId() { return 'iframe[id="bookAnAppointment"]'; }

  /**
   * openSidebarpage() opens the Sidebar webpage and save the windowsId
   * this function replaces open function
   * @param {string} repName
   * @param {boolean} [newWindow=true]
   */
  openStorefrontPage(repName, newWindow = true) {
    if (newWindow) {
      browser.newWindow(`${this.getBackofficeUrl}/${this.LOCALE}/${repName}`);
    } else {
      this.openWebPage(`${this.getBackofficeUrl}/${this.LOCALE}/${repName}`);
    }
    this.feWindowId = this.getWindowIdFromNewWindow();
    this.widgetWindowComingFrom = this.IT_IS_COMMING_FROM.storefront;
    browser.pause(1000);
  }

  /**
   * clickLiveChatLink click on Livechat icon on storefront page
   * @param {boolean} [activeLink=true]
   */
  clickLiveChatLink(activeLink = true) {
    if (activeLink) {
      this.liveChatLink.click();
    } else {
      this.liveChatLinkUnavailable.click();
    }
    browser.pause(500);
    this.widgetWindowClient = this.getWindowIdFromNewWindow();
    browser.switchToWindow(this.widgetWindowClient);
  }

  /**
   * clickOnEmailMeLnk click on Livechat icon on storefront page
   */
  clickOnEmailMeLnk() {
    browser.pause(500);
    browser.switchToParentFrame();
    this.emailButton.click();
    browser.pause(500);
    this.widgetWindowClient = this.getWindowIdFromNewWindow();
    browser.switchToWindow(this.widgetWindowClient);
    browser.pause(500);
    // this iframe is available only on storefront
    this.selectIFrame(this.emailSfIframeId);
  }

  /**
   * clickOnPersonalShopperLnk click on Personal Shopper icon on storefront page
   */
  clickOnPersonalShopperLnk() {
    this.psButton.click();
    browser.pause(500);
    this.widgetWindowClient = this.getWindowIdFromNewWindow();
    browser.switchToWindow(this.widgetWindowClient);
    this.selectIFrame(this.psSfIframeId);
    // iframe is available only on storefront
  }

  /**
   * clickOnAppntReqLnk swtich to personal shopper windows + iframe
   */
  clickOnAppntReqLnk() {
    this.appntButton.click();
    this.selectIFrame(this.appntReqIframeId);
  }

  /**
   * priceIsNotZero() verifies that a given price is not $0
   * @param {cssSelectorObj} price
   * @return {boolean} Prices are Ok or not
   */
  priceIsNotZero(price) {
    // Regex to find the price from the end of the string and flush all the rest. Picks the sale
    // price if both are shown.  Works for price listed with cents or rounded to the dollar value
    // eslint-disable-next-line no-useless-escape
    const priceRE = /(?:\d|\,)+(?:\.\d{2})?$/;
    if (price.isDisplayed()) {
      const priceText = price.getText();
      const result = priceText.substring(priceText.search(priceRE));
      if (result === '0.00' || result === '0') {
        return false;
      }
    }
    return true;
  }

  /**
   * pricesAreNotZero() verifies that we have no $0 products displayed on the Storefront pages
   * @return {boolean} Prices are Ok or not
   */
  pricesAreNotZero() {
    if (this.prices.length > 0) {
      return (this.prices.every((v) => this.priceIsNotZero(v)));
    }
    return false;
  }

  /**
   * pricesDontMatch() verifies that sale and regular prices are different for all products on sf
   * @return {boolean} true if prices are different
   */
  pricesDontMatch() {
    if (this.products.length > 0) {
      return (this.products.every((v) => this.productPriceDontMatch(v)));
    }
    return false;
  }

  /**
   * productPriceDontMatch() verifies that sale and regular price for specified product don't match
   * @param {*} products
   * @return {boolean} true if sale and regular prices are different
   */
  productPriceDontMatch(products) {
    const regPriceRE = /(?:\d|,)+(?:\.\d{2})?/g;

    if (products.$$(this.pricesSelector)[0].isDisplayed()) {
      const price = products.$$(this.pricesSelector);
      const results = price.map((value) => value.getText().match(regPriceRE));
      if (results.length !== 1) {
        if (results.length > 2 || results[0] === results[1]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * checkCommentsAreLegit() verifies that the comments are all different, and thus are real
   * @return {boolean} true if Comments are legit
   */
  checkCommentsAreLegit() {
    if (this.repComments.length > 0) {
      const testComment = this.repComments[0].getText();
      return (!(this.repComments.every((v) => v.getText() === testComment)));
    }
    return false;
  }

  /**
   * getUpdates() subscribes an email address to get Updates
   * @param {string} email to use to subscribe
   * @return {boolean} true if subscription is successful
   */
  getUpdates(email) {
    this.updatesLink.waitForExist();
    this.updatesLink.click();
    browser.pause(500);
    this.selectIFrame('inscription');
    this.updatesEmail.setValue(email);
    const subScribe = $('label[for="autoSubscribe"]');
    if (subScribe.isDisplayed()) {
      this.markPDCheckBox();
    }
    // Wait for button animation
    browser.pause(1000);
    const submitBtn = $('.btn.btn-retailer-type-1.fn-trigger-save.global-services__button.js-form-btn');
    submitBtn.waitForEnabled();
    submitBtn.click();
    const status = $('div.global-services__validation__message').waitForDisplayed();
    return status;
  }

  /**
   * Check if the chat is available/disponible
   * @returns {boolean} True = Available Now or False = Unavailable
   */
  chatAvailableStatus() {
    browser.pause(2000);
    return this.availableRepText.includes(this.chatStatus.getText().trim());
  }

  /**
   * openServicePopUp() opens the specified service pop-up window from the sidebar
   * @return {string} the window handle of the pop-up window
   */
  openServicePopUp() {
    if (this.RETAILER !== 'saks') { // due to the SF-27926
      this.chatAvailable.waitForDisplayed();
    } else {
      this.chatButton.waitForDisplayed();
    }

    this.chatButton.click();
    // mandatory this pause
    browser.pause(1500);
    return (this.selectServicePopUpWindow());
  }

  /**
   * clickLiveChatLink click on Livechat icon on storefront page
   * Don't get the ID neither changes to window
   * temporary function to be compatible with Wdio7 and new Class structure
   * @param {boolean} [activeLink=true]
   * // FIXME
   */
  clickLiveChatLinkNoSwitchWindow(activeLink = true) {
    if (activeLink) {
      this.liveChatLink.click();
    } else {
      this.liveChatLinkUnavailable.click();
    }
    browser.pause(500);
  }

  /**
   * Method for click about me link
   */
  clickAboutMe() {
    this.aboutMeLink.waitForDisplayed();
    this.aboutMeLink.click();
  }

  /**
   * Searches for product on storefront by product name
   * @param text {string}
   */
  searchForProduct(text) {
    if (!this.searchInput.isDisplayed()) {
      this.searchBtn.click();
    }
    this.searchInput.waitForExist();
    this.searchInput.setValue(text);
    browser.keys('Enter');
  }

  /**
   * switchToPsWidgetWindow swtich to personal shopper windows + iframe
   * // TODO to be reviewed with personal shopper class?
   */
  switchToPsWidgetWindow() {
    this.switchToWidgetWindow();
    browser.pause(500);
    this.switchToPsIframeId();
  }

  /**
   * switchToPsIframeId swtich to personal shopper windows + iframe
   * // TODO to be reviewed with personal shopper class?
  */
  switchToPsIframeId() {
    this.selectIFrame(this.psSfIframeId, { hasParentFrame : true, pauseTime : 500 });
  }
}

module.exports = new StorefrontPage();

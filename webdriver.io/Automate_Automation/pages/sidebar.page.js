const config = require('config');
const Frontend = require('../lib/frontend');

/**
 * SidebarPage Class page
 *
 * @class SidebarPage
 * @classdesc Library of storefront page
 * @extends Frontend
*/

class SidebarPage extends Frontend {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  constructor() {
    super();
    /** windows ID list
     * @type {string[]}
     */
    this.windowsList = [];
  }

  /** @type {boolean} */
  get hasSidebarLogo() { return this.sidebarLogo !== ''; }

  get defaultStoreLnk() { return $(config.get(`lang.${this.LOCALE}.sb.connect.defaultStoreLnk`)); }

  /** @type {cssSelectorObj} */
  get openSidebarLink() { return $('#AtSidebarCloseMobile'); }

  /** @type {cssSelectorObj} */
  get openSidebarDesktopLink() { return $('#AtSidebarCloseDesktop'); }

  /** @type {cssSelectorObj} */
  get chatButton() { return $('#AtSidebarTextbox'); }

  /** @type {cssSelectorObj} */
  get widgetLink() { return $('#rep-pictures, #logo-picture, img.sidebar__image'); }

  /** @type {cssSelectorObj} */
  get closeBtn() { return $('.sidebar__collapse-button__icon path'); }

  /** Privacy Disclaimer CheckBox or email subscriber
   * @type {cssSelectorObj} */
  get pdCheckBox() { return $('#autoSubscribe'); }

  /** Privacy Policy link
   * get the pricacy Policy link inside the text on Schedule an appointment widget
   *  @type {cssSelectorObj} */
  get privacyPolicyLink() { return $('.global-services__checkbox__text a, [for="subscribe-checkbox"] a'); }

  /** @type {cssSelectorObj} */
  get sidebarTitle() { return $('h1.sidebar__title'); }

  /** @type {boolean} */
  get hasNearByInsteadOfLocation() { return config.get('lp.nearBy'); }

  /** @type {boolean} */
  get hasCheckGeo() { return config.get('lp.hasCheckGeo'); }

  /** landing page (sidebar) has email me request
   * @type {boolean} */
  get hasEmailMeRequest() { return config.get('lp.hasEmailMeRequest'); }

  /** landing page (sidebar) has appointment request
   * @type {boolean} */
  get hasAppointmentRequest() { return config.get('lp.hasAppointmentRequest'); }

  /** landing page (sidebar) has live chat option
   * @type {boolean} */
  get hasLiveChat() { return config.get('lp.hasLiveChat'); }

  /** @type {boolean} */
  get hasPrivacyPolicyLnk() { return config.get('hasPrivacyPolicyLnk'); }

  /**
   * Returns url to sidebar product page
   * @returns {string}
   */
  get productPageUrl() { return config.get(`lang.${this.LOCALE}.productPageUrl`); }

  /** @type {string} */
  get sidebarLogo() { return config.get('lp.logoRetailerURL'); }

  /** @type {string} */
  get geoIpAddress() { return config.get('geo_ip'); }

  /** has sidebar
   * @type {boolean} */
  get hasSidebar() { return config.get('sidebar'); }

  /** has option to find the rep
   * @type {boolean} */
  get hasSearchAdvisorInSidebar() { return config.get('lp.searchAdvisorInSidebar'); }

  /*
  ********************************************
  ** comun selector for popup and container **
  ********************************************
  */

  /** @type {cssSelectorObj} */
  get transactionId() { return $('form input[name=trx_id]'); }

  /*
  **************************
  ****** CONTAINER GETS ****
  **************************
  */
  /** @type {cssSelectorObj} */
  get searchBox() { return $('#rep-search-input'); }

  /** @type {cssSelectorObj} */
  get repNames() { return $$('div div.findstore__store-item__name:first-of-type'); }

  /** @type {cssSelectorObj} */
  get emptyListText() { return $('p.findstore__empty-list__text'); }

  /** @type {cssSelectorObj} */
  get filterCategory() { return $('select#category-filter'); }

  /*
   **************************
   ********** WDIO V7 *******
   **************************
   */
  /** @type {cssSelectorTxt} */
  get widgetIframeId() { return 'iframe[id="sf-widget-companion"]'; }

  /** return the string of sidebarUrl using LOCALE + geoIP
 * @returns {urlAddress} urlAddress of sidebar */
  get getSidebarUrl() {
    let urlLink = config.get(`lang.${this.LOCALE}.sidebarUrl`);
    if (urlLink.indexOf('?') === -1) {
      urlLink = `${urlLink}?lang=${this.LOCALE.substring(0, 2)}&sf_ip=${this.geoIpAddress}`;
    } else {
      urlLink = `${urlLink}&lang=${this.LOCALE.substring(0, 2)}&sf_ip=${this.geoIpAddress}`;
    }
    return urlLink;
  }

  /**
   * selectWidget() selects the frame for the sidebar widget
   * @deprecated by switchToWidgetCompanioIframeId
   */
  selectWidget() {
    this.selectIFrame('sf-widget-companion');
    browser.pause(1000);
  }

  /**
   * switchToWidgetCompanioIframeId() selects the frame where the widget is located
   */
  switchToWidgetCompanionIframeId() {
    this.selectIFrame(this.widgetIframeId, { pauseTime : 500 });
  }

  /**
   * selectFindStoreFrame() selects the frame for the findstore companion
   */
  selectFindStoreFrame() {
    this.selectIFrame('sf-services-landing');
  }

  /**
   * openSidebar() opens the sidebar but only if it is closed beforehand
   */
  openSidebar() {
    this.selectWidget();
    // open Sidebar link is only visible when sidebar is closed
    if (this.openSidebarLink.isDisplayed() || this.openSidebarDesktopLink.isDisplayed()) {
      if (this.openSidebarLink.isDisplayed()) {
        this.openSidebarLink.click();
      } else {
        this.openSidebarDesktopLink.click();
      }
      this.chatButton.waitForDisplayed();
    }
  }

  /**
   * goToProductPage() goes to a predetermined product page from the retailer main page
   */
  goToProductPage() {
    this.openWebPage(`${this.productPageUrl}?lang=${this.LOCALE.substring(0, 2)}&sf_ip=${this.geoIpAddress}`);
    this.clearPopUps();
  }

  /**
   * weAreOnProductPage() verifies that we are on a retailer product page (not front page) and
   *                      sidebar is till present
   *
   * @return {boolean} Product Page is Ok or not
   */
  weAreOnProductPage() {
    return this.productPageLink.waitForDisplayed();
  }

  /**
   * openSidebarpage() opens the Sidebswiar webpage and save the windowsId
   */
  openSidebarPage(argsObj = {}) {
    // eslint-disable-next-line no-param-reassign
    argsObj.openNewWindow = argsObj.openNewWindow ?? false;
    browser.pause(300);
    if (argsObj.openNewWindow) {
      browser.newWindow(this.getSidebarUrl);
    } else {
      this.openWebPage(this.getSidebarUrl);
    }

    this.clearPopUps();
    // sbwindowId should was replaced by fewindowid
    this.sbWindowId = browser.getWindowHandle();
    this.feWindowId = browser.getWindowHandle();
    this.widgetWindowComingFrom = this.IT_IS_COMMING_FROM.sidebar;

    // waiting to load the widget
    browser.pause(3000);
  }

  /**
 * clickOnWidgetIco click on widget icon inside the Iframe
 */
  clickOnWidgetIco() {
    browser.switchToParentFrame();
    this.switchToWidgetCompanionIframeId();
    this.widgetLink.click();
    browser.pause(500);
    this.widgetWindowClient = this.getWindowIdFromNewWindow();
    this.switchToWidgetWindow();
  }

  /**
   * switchTosidebarWindow switch the windows to sidebar page
   */
  switchToSidebarWindow() {
    browser.switchToWindow(this.sbWindowId);
    browser.pause(300);
  }

  switchToWidgetWindow() {
    browser.switchToWindow(this.widgetWindowClient);
  }

  /**
   * isWidgetVisible() verifies if the widget is visible on sidebar
   * @param {boolean} switchToFrame=true by default selects the frame where the widget is located
   * @return {boolean} visibility
   */
  isWidgetVisible(switchToFrame = true) {
    if (switchToFrame) {
      this.switchToWidgetCompanionIframeId();
    }

    return this.widgetLink.isDisplayed();
  }

  /**
   * Methods get reps from the sidebar, sorts them and returns arrays of unsorted and sorted reps
   * @returns {{unsortedReps: string[], sortedReps: string[]}}
   */
  sortRepsNames() {
    const unsortedReps = [];
    let sortedReps = [];
    const allReps = this.repNames;
    allReps.forEach((elem) => unsortedReps.push(elem.getText()));
    allReps.forEach((elem) => sortedReps.push(elem.getText()));
    sortedReps = sortedReps.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    return { unsortedReps, sortedReps };
  }

  /**
   * Verifies rep names consist of name and lastname
   * Splits name like 'Test Rep' into ['Test', 'Rep'] to check that the final array consists of two or more items
   */
  verifyRepHasNameAndLastname() {
    return this.repNames
      .map((element) => element.getText())
      .every((name) => name.length >= 2);
  }
}
module.exports = new SidebarPage();

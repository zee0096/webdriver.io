const config = require('config');
const Page = require('../pages/page');

/**
 * Class Frontend
 *
 * @class Frontend
 * @classdesc Main class to access the Frontend page
 * @extends Page
 */
class Frontend extends Page {
  /** Create a Frontend instance -  This is the main library for frontend pages
   * like sidebar, footer etc...
   * @constructor Page
   */
  constructor() {
    super();
    /**
     * array with list of windows
     * @property {array} windowsList
     */
    this.windowsList = [];

    /**
     * front End Window ID
     * @property {string} feWindowId
     */
    this.feWindowId = '';

    /**
     * live Chat From
     * @property {string} liveChatFrom
     */
    this.liveChatFrom = '';

    /**
     *
     * @property {string} widgetWindowClient
     */
    this.widgetWindowClient = '';

    // The modal window was opened comming from with page (storefront, sidebar, footer...)
    // see IT_IS_COMMING_FROM option variable from pagelib class.

    /**
     * @description The modal window was opened comming from with page (storefront, sidebar, footer...)
     * see IT_IS_COMMING_FROM option variable from pagelib class.
     * @property {string} widgetWindowComingFrom
     */
    this.widgetWindowComingFrom = '';
  }

  /** @type {boolean} */
  get useWidgetsPage() { return config.get('useWidgetsPage'); }

  /** @type {cssSelectorObj} */
  get username() { return $('#sf-user-login'); }

  /**  @type {cssSelectorTxt} */
  get productSel() { return '#AtTopPicks article'; }

  /**  @type {cssSelectorArr} */
  get products() { return $$(this.productSel); }

  /** @type {cssSelectorObj} */
  get contactBox() { return $('#AtQuestionTitle'); }

  /** @type {cssSelectorTxt} */
  get productPageLink() { return $(config.get('sf.page404.productPageLink')); }

  /** return the rep name (rep mode) or store name (team mode) displayed in footer Iframe
   * @type {cssSelectorObj}
   */
  get repStoreNameInFooter() { return $('span.footer__profile__title-name,span.footer__profile__name'); }

  /**
   * switchTosidebarWindow switch the windows to sidebar page
   */
  switchToWidgetWindow() {
    browser.switchToWindow(this.widgetWindowClient);
    browser.pause(500);
  }

  /**
   * swichToFrontendWindow switch the window to FrontEnd page
   * that can be Sidebar, Storefront, footer...
   */
  switchToFrontendWindow() {
    browser.switchToWindow(this.feWindowId);
  }
}
module.exports = Frontend;

const config = require('config');
const PageLib = require('../lib/pagelib');

/**
 * Class General library called Page
 *
 * @class Page
 * @classdesc The Page class is the main class for all other scritps.
 * @extends PageLib
 */
class Page extends PageLib {
  /** Create a Page instance -  This is the main library of the system
   * @constructor Page
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Button to close a popup on prod
   * @returns {cssSelectorObj}
   */
  get popupCloseButton() { return $(config.get('Selectors.popupCloseButton')); }

  /**
   * clearPopUps() clears all the various pop-ups that can appear when loading a retailer's site
   */
  clearPopUps() {
    if (this.isProdEnv || this.ENVIRONMENT === 'stg') {
      browser.pause(3000);
      if (this.popupCloseButton.isDisplayed()) {
        this.popupCloseButton.click();
        this.popupCloseButton.waitForDisplayed({ reverse : true });
      }
    }
  }

  /**
   * scrollToBottom() scrolls the page to the bottom. Seems webdriver.io scroll command no longer
   * works with some webdrivers...
   */
  scrollToBottom() {
    browser.execute(() => {
      // eslint-disable-next-line no-undef
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    });
  }

  /**
   * selectServicePopUpWindow() finds the services pop-up window based on the title.
   * getNewTabId - get the new TAB ID for one new windows opened (like popup chat)
   * @param {Boolean} [switchNewTab=true] switch to new tabID
   * @return {String} the frame ID of the Pop Up window, 0 if not found
   */
  selectServicePopUpWindow(switchNewTab = true) {
    const tabList = browser.getWindowHandles();
    const newTab = tabList[tabList.length - 1];

    if (switchNewTab) {
      browser.getWindowHandles(newTab);
      browser.pause(200);
    }
    return (newTab);
  }

  /**
   * isSelected() check is element has token in class, in such case we know it is selected
   *
   * @param {Element} el a webdriverio element
   * @deprecated
   * @return {Boolean}
   */
  isSelected(el) {
    const attrVal = el.getAttribute('class');
    return (attrVal.includes('is-selected'));
  }

  /**
   * Close the current window and go to the window received in parameter
   * @param {string} [windowIdToReturn = null]
   */
  closeWindowAndReturnToOtherWindow(windowIdToReturn = null) {
    browser.closeWindow();
    // if the windowIdToReturn is not null
    if (windowIdToReturn !== null) {
      browser.switchToWindow(windowIdToReturn);
      browser.pause(500);
    }
  }
}

module.exports = Page;

const config = require('config');
const moment = require('moment/moment');
const { MULTILANGUAGES } = require('./defaultconstantslib');

/**
 * Class General library called Page
 *
 * @class
 * @classdesc The PageLib class is the main class for all other scritps.
 * It's like a main library of project
 */
class PageLib {
  #RETAILER;

  #MODE;

  #LOCALE;

  #ENVIRONMENT;

  #REPNAME;

  #STORE_ID;

  #SF_ARGS;

  /** Create a Page instance -  This is the main library of the system
   * @constructor PageLib
   */
  constructor() {
    /** Private variable to save the retailer's MODE
     * @property {string} #MODE private property to save the retailer's mode
     */
    this.#MODE = config.get('mode');

    /** Private variable to save the retailer name
     * @property {string} #RETAILER Retailer name
     */
    this.#RETAILER = process.env.NODE_ENV.toLowerCase();

    /** Private variable to save the environment name in LOWERCASE
     * @property {string} #ENVIRONMENT Test Environment */
    this.#ENVIRONMENT = process.env.NODE_APP_INSTANCE.toLowerCase();

    /** Private variable to save the environment name in LOWERCASE
     * @property {MULTILANGUAGES} [#LOCALE=[this.multilangue.en_US]] retailer languages */
    // eslint-disable-next-line no-useless-escape
    this.#LOCALE = process.env.LOCALE ?? MULTILANGUAGES.en_US;

    // setting the default language case the retailer doesn't have the language selected/received
    if (!this.languages.includes(this.#LOCALE)) {
      // the retailer doesn't have the language in the list
      // there for is necessary to use the default language (the first language on the array)
      // destructuring array - taking first element from languages to this.#LOCALE
      [this.#LOCALE] = this.languages;
    }

    /** Private variable to save the Rep name
     * @property {string} #REPNAME Rep Name
     */
    this.#REPNAME = config.get('repName');

    /** Private variable to save the Store ID
     * @property {string} #STORE_ID Store ID
     */
    this.#STORE_ID = config.get('storeID');

    /** Private variable to save the #SF_ARGS
     * the SF_ARGS must have receive the parameter in a valid JSON format
     * @type {SF_ARGS}
     */
    this.#SF_ARGS = {};
    if (process.env.SF_ARGS) {
      try {
        this.#SF_ARGS = JSON.parse(process.env.SF_ARGS);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`ERROR parsing SF_ARGS parameters. 
          It must be in JSON format, means properties and value should have double quotes (") before/after name/value.\n
          (${e})`);
      }
    }

    /** the modal request page is comming from
     * @type {object}
     * @property {string} sidebar='sidebar'
     * @property {string} storefront='storefront'
     * @property {string} footer='footer'
     */
    this.IT_IS_COMMING_FROM = {
      sidebar    : 'sidebar',
      storefront : 'storefront',
      footer     : 'footer',
    };
  }

  /** Return the retailer name
   * @return {string}
  */
  get RETAILER() { return this.#RETAILER; }

  /** Return the retailer MODE
   * @return {string}
  */
  get MODE() { return this.#MODE; }

  /** Return the LOCALE (language) that is running the test
   * @description if not received the parameter, en_US is selected by default
   * @default ['en_US']
   * @return {MULTILANGUAGES} */
  get LOCALE() { return this.#LOCALE; }

  /** Return environment that the test is running
   * @return {string} */
  get ENVIRONMENT() { return this.#ENVIRONMENT; }

  /** Return the Rep name
   * @return {string} */
  get REP_NAME() { return this.#REPNAME; }

  /** Return the Store ID
   * @return {string} */
  get STORE_ID() { return this.#STORE_ID; }

  /** Return the object with all arguments received
   * @return {object} */
  get SF_ARGS() { return this.#SF_ARGS; }

  /** return if the retailer is team mode
   * @return {boolean}
   */
  get isTeamMode() { return this.MODE === 'team'; }

  /** return if it is Production environmnet
   * @return {boolean}
   */
  get isProdEnv() { return this.ENVIRONMENT === 'prod'; }

  /** wait the loading/spin icon to disappear from the page
   * All loading css locators were grouped in only one getter
   * @return {cssSelectorObj} */
  get loadingPage() {
    return $('div.products-loading-ctn'
      + ', div.share-loading-ctn'
      + ', div.fn-loading'
      + ', div[ng-if="loading"]'
      + ', div[ng-if="isLoading"]'
      + ', div.is-loading'
      + ', .account-table__loading'
      + ', li.loading-spin'
      + ', #dashboard div.fn-loading'
      + ', #transaction div.fn-loading'
      + ', #performance div.fn-loading'
      + ', #activity div.fn-loading');
  }

  /** Do the retailer have sms?
   * @return {boolean} */
  get hasSms() { return config.get('sms'); }

  /**
   * Currency of the retailer
   * @return {string} currency
   */
  get currency() { return config.get(`lang.${this.LOCALE}.currency`); }

  /** list of languages available for the retailer
   * @return {string[]}
   */
  get languages() { return config.get('languages'); }

  /**  isCookieTracking . if not, it is localstorage
   * @return {boolean}
   */
  get isCookieTracking() { return config.get('tracking') === 'cookie'; }

  /** return the string of backoffice Url with LOCALE
   * @return {string} */
  get getBackofficeUrl() { return config.get(`lang.${this.LOCALE}.backOfficeUrl`); }

  /** @return {cssSelectorObj} */
  get emailField() { return $('#email'); }

  /** @return {cssSelectorObj} */
  get pdCheckBoxText() { return $('.global-services__checkbox__text, [for="subscribe-checkbox"]'); } // chat to support

  /**
   * setBrowserSize - setting size of browser
   * @param {number} [width=1280] width of screen
   * @param {number} [height=1024] height of screen
   */
  setBrowserSize(width = 1280, height = 1024) {
    if (!driver.isMobile) {
      browser.setWindowSize(width, height);
    }
  }
  /**
   * @typedef {string} urlAddress
   */

  /**
   * openWebPage - open a webpage via URL
   * @param {urlAddress} path Full URL address to be opened
   */
  openWebPage(path) {
    browser.url(path);
  }

  /**
   * screenShot - save the screenshot with at
   * @param {string} name - complementary folder/file name
   */
  screenShot(name) {
    browser.saveScreenshot(`./screenshots/${this.RETAILER}-${this.ENVIRONMENT}/${name}.png`);
  }

  /**
   * generate a fingerprint like
   * ${retailer}${environment}${name}${this.rawDateString()}${complement}
   * @param {string} name
   * @param {string} [complement=''] - complement at the end of filename
   * @return {string}
   */
  fingerprint(name, complement = '') {
    return `${this.RETAILER}${this.ENVIRONMENT}${name}${this.rawDateString()}${complement}`;
  }

  /**
   * selectIFrame() selects the iframe provided as argument
   * @description Select the iframe. The parameter can be the full css/xpath selector (prefered) or
   * the iframe ID name (string).
   * You have much more flexibility usign selector that string (search for Id attribute only),
   * also you can send optional paramenters in an object
   * @example
   * iframe[text="qbc"]  => prefered (selector)
   * nameOfIframe123     => String - iframe Id only
   * @param {cssSelectorTxt} iframeSelectorOrId string
   * @param {object} optionalArg default values (optional parameters) - use destructuring obj for default variables
   * @param {boolean} [optionalArg.hasParentFrame=false] use parentFrame command (Optionel)
   * @param {number} [optionalArg.pauseTime=300] pause time after change to iframe (Optionel)
   */

  selectIFrame(iframeSelectorOrId, { hasParentFrame = false, pauseTime = 300 } = {}) {
    if (hasParentFrame) {
      browser.switchToParentFrame();
    }
    let iframeSelector = $(iframeSelectorOrId);
    if (!iframeSelectorOrId.toLowerCase().startsWith('iframe[')) {
      // The iframeSelectorOrId parameter doesn't start with "iframe[" means that it is an iframeId string
      iframeSelector = $(`iframe[id="${iframeSelectorOrId}"]`);
    }
    iframeSelector.waitForDisplayed();
    browser.switchToFrame(iframeSelector);
    browser.pause(pauseTime);
  }

  /**
   *  GetWindowIdFromNewWindow - get the Id of new window or take the latest one if no window was created
   * @return {string} New window Id / latest window Id
   */
  getWindowIdFromNewWindow() {
    const newWindowsList = browser.getWindowHandles();
    return newWindowsList[newWindowsList.length - 1];
  }

  /**
   *  refreshPage - refresh the current page, taking in consideration when test with localstorage
   * @param {number} [pauseAfterRefresh=1000] pause in ms after reload the page
   * @param {object}  [argsObj] - Object that will receive parameters
   * @param {boolean} [argsObj.pauseForLocalStorage=false] localstorage needs more time to update the data
   */
  refreshPage(pauseAfterRefresh = 1000, { pauseForLocalStorage = false } = {}) {
    browser.refresh();
    if (pauseForLocalStorage && !this.isCookieTracking) {
      browser.pause(60000);
    } else {
      browser.pause(pauseAfterRefresh);
    }
  }

  /**
   * rawDateString() returns a string with the raw date in the form yyyyMMDDHHmmss
   * @return {string} a string with the date in the form of yyyyMMDDHHmmss
   */
  rawDateString() {
    return moment().format('yyyyMMDDHHmmss');
  }

  /**
   * waitForLoadingIconDisappear() waits for the product page to load and show up
   * @param {number} [timeout=5000]
   */
  waitForLoadingIconDisappear(timeout = 5000) {
    this.loadingPage.waitForDisplayed({
      timeout    : `${timeout}`,
      reverse    : true,
      timeoutMsg : `TIMEOUT because the spinning image is still displayed after (${timeout})ms`
    });
    // extra time to browser has time to rendering all things
    browser.pause(500);
  }

  /**
   * closeBrowser close the browser
   */
  closeBrowser() {
    browser.closeWindow();
  }

  /**
  * isRealImage() verifies that image(s) is(are) real and loaded (not 404)
  * @param {string} image CSS selector (for one or more images) that should be analyzed
  * @return {boolean} true if height and width are bigger than 0
  */
  isRealImage(image) {
    const imgList = $$(image);
    return imgList.every((element) => (element.getSize('width') > 0 && element.getSize('height') > 0));
  }
  // ********** DEBUG TOOLS **************

  /**
   * infoDebug tools to show the log during the test
   * @param {string} [msg='pause for info'] text to be displayed on console.log
   * @param {number} [pauseTime=10] time in Seconds
   */
  infoDebug(msg = 'pause for info', pauseTime = 10) {
    // eslint-disable-next-line no-console
    console.log(msg);
    browser.pause(pauseTime * 1000);
  }

  /**
   * listObjProperties list all properties and values of an object
   * debug tool
   * @param {Object} objName object that want to display the content
   */
  listObjProperties(objName) {
    console.log(`Object properties=${JSON.stringify(objName, null, 4)}`);
  }

  /**
   * Marks PD checkboxes for all retailers
   */
  markPDCheckBox() {
    const xPathToFind = "//div[contains(@class,'subscribe') or contains(@class,'term-conditions')]/input";
    const checkBox = $(xPathToFind);
    checkBox.waitForExist();
    this.clickOnElemByXpathUsingJS(xPathToFind);
  }

  /**
   * clickOnElemByXpathUsingJS() clicks on the element using xPath to find it
   *
   * @param {string} xPath should be unique for find only one element
   */
  clickOnElemByXpathUsingJS(xPath) {
    browser.pause(500);
    browser.execute(`
      const elm = document.evaluate("${xPath}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      elm.click();
      `);
    browser.pause(500);
  }

  /**
   * generate random number between values
   * only for integer numbers
   * @param {number} maxValue final interval (exclusive)
   * @param {number} [start=0] start interval (inclusive)
   * @returns {number} random number
   */
  randomNumber(maxValue, start = 0) {
    return ((Math.floor(Math.random() * (maxValue - start))) + start);
  }
}
module.exports = PageLib;

const config = require('config');
const PageLib = require('./pagelib');
// FIXME the salestracking folder should to validade the expiry date of cookit
// but I could not found the way to get this date, currently
// review all codes starting initial* tests in salestracking folder

/**
* Class General library called Page
*
* @class
* @classdesc The SfCookie class is the library of cookies for sf.
* @extends PageLib
*/
class Cookie extends PageLib {
  /**
  * @constructor
  */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();

    /**
    * Cookie's name - Thee cookie should respect the team mode of retailer
    * @typedef COOKIE_NAMES
    * @type {object<string>}
    * @property {string} [COOKIE_NAMES.sf_wdt_acquisition='sf_wdt_acquisition']
    * @property {string} [COOKIE_NAMES.sf_wdt_tracking='sf_wdt_tracking']
    * @property {string} [COOKIE_NAMES.sf_wdt_tracking_rep='sf_wdt_tracking_rep']
    * @property {string} [COOKIE_NAMES.sf_wdt_footer_rep_session='sf_wdt_footer_rep_session']
    * @property {string} [COOKIE_NAMES.sf_wdt_tracking_store='sf_wdt_tracking_store']
    * @property {string} [COOKIE_NAMES.sf_wdt_footer_store_session='sf_wdt_footer_store_session']
    */
    this.COOKIE_NAMES = Object.freeze({
      sf_wdt_acquisition          : 'sf_wdt_acquisition',
      sf_wdt_tracking             : 'sf_wdt_tracking',
      sf_wdt_tracking_rep         : 'sf_wdt_tracking_rep',
      sf_wdt_footer_rep_session   : 'sf_wdt_footer_rep_session',
      sf_wdt_tracking_store       : 'sf_wdt_tracking_store',
      sf_wdt_footer_store_session : 'sf_wdt_footer_store_session',
    });
    this.tracking = {};
  }

  /**
   * Retailer has comex cookie or not
   * @return {boolean}
   */
  get hasComexCookie() { return config.get('hasComexCookie'); }

  /**
   * getCookieValue() returns the value of a cookie send by parameter
   * @param {string} key cookie name
   * @return {string} value of cookie, if not found returns empty ('')
   */
  getCookieValue(key) {
    let cookieValue;
    const newKey = (this.ENVIRONMENT !== 'prod' ? `${this.ENVIRONMENT}_${this.RETAILER.toLowerCase()}_${key}` : key);
    if (this.isCookieTracking) {
      cookieValue = browser.getCookies([newKey]);
    } else {
      return this.getValueFromLocalStorage(key);
    }
    if (cookieValue.length === 0) {
      return ('');
    }
    return (cookieValue[0].value);
  }

  /**
   * Gets value from local storage and returns it
   * @param key {string} property key
   * @returns {string} property value
   */
  getValueFromLocalStorage(key) {
    const newKey = (this.ENVIRONMENT !== 'prod' ? `lscache-${this.ENVIRONMENT}_${this.RETAILER.toLowerCase()}_${key}` : `lscache-${key}`);
    // eslint-disable-next-line no-undef
    return browser.execute((lsKey) => localStorage.getItem(lsKey), newKey);
  }

  /**
   * getLocalStorageExpiry() returns the expiry of localstorage key-value pair.
   *
   * @param {string} key the name of the 'key' in dataStore to return the expiry
   * @return {number} the expiration value (multiply by 1000 to get epoch time)
   */

  getLocalStorageExpiry(key) {
    // eslint-disable-next-line no-undef, max-len, camelcase
    const status = browser.execute((keyParam) => (sf_widget.utils.localstorage.getExpiry(keyParam)), key);
    return (status.value);
  }
  /* eslint-enable */

  /**
   * getExpiry() gives the number of days before expiration based on the specified datetime value
   * @param {number} datetime to convert to get the number of days of expiry (differs between
   *                  cookies and localStorage)
   * @return {number} the number of days before expiration
   */
  getExpiry(datetime) {
    const now = new Date();
    if (!this.isCookieTracking) {
      return (Math.round((((datetime * 1000) - now.getTime()) / 1000) / (24 * 60 * 60)));
    }
    return (Math.round((datetime - (now.getTime() / 1000)) / (24 * 60 * 60)));
  }

  // ***********************************************************************************************
  // SF_WIDGET
  // These functions are using the sf_widget function developed by Sales Floor
  // The precedent functions are calling direct the browser to get cookie and storeLocation
  // ***********************************************************************************************

  /**
   * getSFWidget() returns the value of a key located in our sf_widget.dataStore. More reliable than
   *               looking at the localstorage...
   *
   * @param {string} key the name of the 'key' in dataStore to return the value
   * @return {string} value for the key
   */
  /* eslint-disable */
  getSFWidget(key) {
    const status = browser.execute((keyParam) => {
      return (sf_widget.dataStorage[keyParam]);
    }, key);
    return (status);
  }

  /**
   * deleteCookie() delete a cookie
   * @param {COOKIE_NAMES} cookieName the name of the 'key' in dataStore to return the value
   */
  deleteCookie(cookieName) {
    browser.deleteCookies([`${this.ENVIRONMENT}_${this.RETAILER.toLowerCase()}_${cookieName}`]);
  }

  /**
   * valueOfAcqusitionCookie() return the value of sf_wdt_acquisition in cookie
   * using sf function
   * @return {string} The value of sf_wdt_acquisition in cookie
  */
  valueOfAcquisitionCookie() {
    return this.getSFWidget(this.COOKIE_NAMES.sf_wdt_acquisition);
  }

  /**
   * valueOfTrackingCookie() return the value of sf_wdt_tracking in cookie
   * using sf function
   * @return {string} The value of sf_wdt_tracking in cookie
  */
   valueOfTrackingCookie() {
    // eslint-disable-next-line no-undef
    return this.getSFWidget(this.COOKIE_NAMES.sf_wdt_tracking);
  }

  /**
   * valueOfTrackingRepCookie() return the value of sf_wdt_tracking_rep in cookie
   * using sf function
   * @return {string} The value of sf_wdt_tracking_rep in cookie
  */
  valueOfTrackingRepCookie() {
    // eslint-disable-next-line no-undef
    return this.getSFWidget(this.COOKIE_NAMES.sf_wdt_tracking_rep);
  }

  /**
   * valueOfTrackingStoreCookie() return the value of sf_wdt_tracking_store in cookie
   * using sf function
   * @return {String} The value of sf_wdt_tracking_store in cookie
   */
  valueOfTrackingStoreCookie() {
    // eslint-disable-next-line no-undef
    return this.getSFWidget(this.COOKIE_NAMES.sf_wdt_tracking_store);
  }

  /**
   * valueOfTrackingFooterRepSessionCookie() return the value of sf_wdt_tracking_rep in cookie
   * using sf function
   * @return {string} The value of sf_wdt_tracking_rep in cookie
  */
  valueOfTrackingFooterRepSessionCookie() {
    // eslint-disable-next-line no-undef
    return this.getSFWidget(this.COOKIE_NAMES.sf_wdt_footer_rep_session);
  }

  /**
   * valueOfTrackingFooterStoreSessionCookie() return the value of sf_wdt_footer_store_session in cookie
   * using sf function
   * @return {string} The value of sf_wdt_footer_store_session in cookie
   */
  valueOfTrackingFooterStoreSessionCookie() {
    // eslint-disable-next-line no-undef
    return this.getSFWidget(this.COOKIE_NAMES.sf_wdt_footer_store_session);
  }

  /**
   * getExpectedCookiesByName() Get 'cookies' from config and return object by name
   * @property {('sf_wdt_tracking'|'sf_wdt_tracking_store'|'sf_wdt_footer_store_session')}
   * @return {Object} the expected cookie object by name to verify in the appropriate tests
   */
  getExpectedCookiesByName(name) {
    return config.get('cookies').filter((cookie) => { return cookie.name === name})[0];
  }

  /**
   * getCookieBySfFunc() returns the value of a key located in our sf_widget.dataStore
   * this function is on ALIAS to be easier comprehension of code
   * @param {string} key the name of the 'key' in dataStore to return the value
   * @return {string} value for the key
   */
  getCookieValueFromSfFunc(cookieName) {
    return this.getSFWidget(cookieName);
  }

  /**
   * getTrackingValue update the value property obj with tracking cookie
   */
  getTrackingValue() {
    this.tracking.value = this.getCookieValue(this.COOKIE_NAMES.sf_wdt_tracking);
  }

  /**
   * getTrackingStore update the value property obj with tracking_store cookie
   */
  getTrackingStore() {
    this.tracking.store = this.getCookieValue(this.COOKIE_NAMES.sf_wdt_tracking_store)
  }

  /**
   * getTrackingRep update the value property obj with tracking_rep cookie
   */
  getTrackingRep() {
    this.tracking.rep = this.getCookieValue(this.COOKIE_NAMES.sf_wdt_tracking_rep)
  }

}
module.exports = new Cookie;

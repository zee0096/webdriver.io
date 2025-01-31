/**
 * LocalStorage Class
 *
 * @class
 * @classdesc Main class to access the LocalStorage data
 */
class LocalStorage {
  /** Library for localStorage
   * @constructor LocalStorage
   */
  constructor() {
    this.sf_wdt_tracking_timeStamp = 0;
    this.sf_wdt_tracking_rep_timeStamp = 0;
  }

  /** @type {cssSelectorObj} */
  get transactionTotal() { return $('form input[name=trx_total]'); }

  /**
   * setTrackingTimeStamp() set the sf_wft_tracking timestamp
   * @param {*} timeStamp
  */
  setTrackingTimeStamp(timeStamp) {
    this.sf_wdt_tracking_timeStamp = timeStamp;
  }

  /**
   * setTrackingRepTimeStamp() set the sf_wft_tracking timestamp
   * @param {*} timeStamp
   */
  setTrackingRepTimeStamp(timeStamp) {
    this.sf_wdt_tracking_rep_timeStamp = timeStamp;
  }

  /**
   * valueOfAcquisition() run the sf_widget.dataStorage.sf_wdt_acquisition from browser
   * using sf function
   * @return {string} The value of sf_wdt_acquisition in dataStorage
  */
  valueOfAcquisition() {
    // eslint-disable-next-line
    return browser.execute(() => sf_widget.dataStorage.sf_wdt_acquisition);
  }

  /**
   * valueOfTracking() return the value of sf_wdt_tracking in dataStorage
   * using sf function
   * @return {string} The value of sf_wdt_tracking in dataStorage
  */
  valueOfTracking() {
    // eslint-disable-next-line
    return browser.execute(() => sf_widget.dataStorage.sf_wdt_tracking);
  }

  /**
   * valueOfTrackingRep() return the value of sf_wdt_tracking_rep in dataStorage
   * using sf function
   * @return {string} The value of sf_wdt_tracking_rep in dataStorage
  */
  valueOfTrackingRep() {
    // eslint-disable-next-line
    return browser.execute(() => sf_widget.dataStorage.sf_wdt_tracking_rep);
  }

  /**
   * valueOfFooterRepSession() return the value of sf_wdt_footer_rep_session in dataStorage
   * using sf function
   * @return {string} The value of sf_wdt_footer_rep_session in dataStorage
  */
  valueOfFooterRepSession() {
    // eslint-disable-next-line
    return browser.execute(() => sf_widget.dataStorage.sf_wdt_footer_rep_session);
  }

  /**
   * expirationDateOfTrackingRep() return the timestamp between curent date - expeiration date of sf_wdt_tracking_rep
   * using sf function
   * @return {string} The value of sf_wdt_tracking_rep in dataStorage
  */
  expirationDateOfTrackingRep() {
    const curDate = new Date();
    // eslint-disable-next-line
    const expDate = new Date(browser.execute(() => sf_widget.utils.localstorage.getExpiry('sf_wdt_tracking_rep')) * 1000);

    return (expDate - curDate);
  }

  /**
   * expirationDateOfTracking()return the timestamp between curent date - expeiration date of sf_wdt_tracking
   * using sf function
   * @return {string} The value of sf_wdt_tracking_rep in dataStorage
  */
  expirationDateOfTracking() {
    const curDate = new Date();
    // eslint-disable-next-line
    const expDate = new Date(browser.execute(() => sf_widget.utils.localstorage.getExpiry('sf_wdt_tracking')) * 1000);

    return (expDate - curDate);
  }

  /**
   * getExpirationDateOfTracking() get expiration date of sf_wdt_tracking
   * using sf function
   * @return {string} The value of sf_wdt_tracking_rep in dataStorage
  */
  getExpirationDateOfTracking() {
    // eslint-disable-next-line
    return browser.execute(() => sf_widget.utils.localstorage.getExpiry('sf_wdt_tracking')) * 1000;
  }

  /**
   * getExpirationDateOfTrackingRep() get expiration date of sf_wdt_tracking_rep
   * using sf function
   * @return {string} The value of sf_wdt_tracking_rep in dataStorage
  */
  getExpirationDateOfTrackingRep() {
    // eslint-disable-next-line
    return browser.execute(() => sf_widget.utils.localstorage.getExpiry('sf_wdt_tracking_rep')) * 1000;
  }
}
module.exports = new LocalStorage();

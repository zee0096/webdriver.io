const config = require('config');
const Widget = require('./widget');

/**
 * Class LiveChat
 *
 * @class LiveChat
 * @classdesc Main class to access the livechat page
 * @extends Widget
 */
class PersonalShopper extends Widget {
  /** Library for live chat
   * @constructor LiveChat
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /** personal shopper Iframe iid (coming from storefront)
   * @type {boolean} */
  get hasPhoneInPS() { return config.get('hasPhoneInPS'); }

  /** has personal shopper
   * @type {boolean} */
  get hasPersonalShopper() { return config.get('personalShopper'); }

  /** has personal shopper in landing page (sidebar)
   * @type {boolean} */
  get hasPersonalShopperInSb() { return config.get('lp.personalShopper'); }

  /** appt request option is on the 4 possible options on modal window
  * @type {cssSelectorObj} */
  get personalShopperOpt() { return $('a#landing-finder-link'); }

  /** @type {cssSelectorObj} */
  get personalShopperTitle() { return $('h1#AtFinderTitle'); }

  /** @type {cssSelectorObj} */
  get extraInfo() { return $('#extraInfo'); }

  /** // PS request
   * @type {cssSelectorObj} */
  get minBudget() { return $('#minBudgetText'); }

  /** @type {cssSelectorObj} */
  get custPhone() { return $('#phone'); }

  /** personal shopper Iframe id (coming from storefront)
   * @type {cssSelectorTxt} */
  get psSfIframeIdTxt() { return 'iframe[id="productFinder"]'; }

  /** clickOnPersonalShopperOpt
   */
  clickOnPersonalShopperOpt() {
    this.selectIFrame(this.chatRequestIframeId, { hasParentFrame: true, pauseTime: 500 });
    this.personalShopperOpt.click();
    browser.pause(500);
  }

  /**
   * requestPersonalShopperFrm() creates a PS request while filling all given fieldsce TRU
   * @param {object} psRequest
   * @param {String} psRequest.email to enter in the dialog
   * @param {String} psRequest.info (optional) extra info to enter in the dialog
   * @param {Integer} psRequest.budget (optional) minimum budget to enter in the dialog
   * @param {String} psRequest.name (optional) name of customer to enter in the dialog
   * @param {String} psRequest.phone (optional - not present for all retailers) customer's phone number
   */
  requestPersonalShopperFrm(psRequest) {
    const fingerprint = this.fingerprint('shopper', (psRequest.email === '' ? 's' : 'e'));
    browser.pause(1000);
    if ($(this.psSfIframeIdTxt).isExisting()) {
      this.selectIFrame(this.psSfIframeIdTxt);
    }
    this.setSpecialty();
    if (psRequest.info) {
      this.extraInfo.scrollIntoView();
      this.extraInfo.waitForDisplayed();
      this.extraInfo.setValue(`${psRequest.info} (${fingerprint})`);
    }

    if (psRequest.budget) {
      // due to SF-27799
      if (this.RETAILER !== 'buckle') {
        this.minBudget.setValue(psRequest.budget);
      }
    }

    if (psRequest.name) {
      this.custName.setValue(psRequest.name);
    }

    this.emailField.setValue(psRequest.email);
    this.markPDCheckBox();

    if (!psRequest.email) {
      this.smsButton.click();
      this.phoneField.waitForDisplayed();
      this.phoneField.setValue(psRequest.phone);
    } else if (this.hasphoneInPS && psRequest.phone) {
      browser.pause(500);
      if (this.custPhone.isDisplayed()) {
        this.custPhone.setValue(psRequest.phone);
      }
    }

    if (psRequest.info) {
      this.extraInfo.scrollIntoView();
      this.extraInfo.waitForDisplayed();
      this.extraInfo.setValue(`${psRequest.info} (${fingerprint})`);
    }
    this.sendButton.click();
  }
}
module.exports = new PersonalShopper();

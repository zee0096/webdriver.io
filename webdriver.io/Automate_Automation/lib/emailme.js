const Widget = require('./widget');

/**
 * Class Email Me
 *
 * @class EmailMe
 * @classdesc Main class to access the livechat page
 * @extends Widget
 */
class EmailMe extends Widget {
  /** Library for email
   * @constructor emailme
   */
  constructor() {
    super();
    /**
     * @property {string} emailMeFrom
     */
    this.emailMeFrom = '';
  }

  /** @type {cssSelectorObj} */
  get emailOpt() { return $('a#landing-contact-link'); }

  /** @type {cssSelectorObj} */
  get sendBtn() { return $('footer button'); }

  /** clickOnEmailMeOpt - click on Email me/Constact us on modal window */
  clickOnEmailMeOpt() {
    this.selectIFrame(this.chatRequestIframeId, { hasParentFrame: true, pauseTime: 500 });
    this.emailOpt.click();
    browser.pause(500);
  }

  /**
   * requestEmail() creates an Email Me request while filling all given fields
   *
   * @param {String} email to enter in the dialog
   * @param {String} message the "message" itself
   * @param {String} [name] (optional) name of customer to enter in the dialog
   * @param {String} [phone] (optional - not present for all retailers) customer's phone number
   */
  requestEmailFrm(email, message, name, phone) {
    const fingerprint = this.fingerprint('email', (email === '' ? 's' : 'e'));
    this.selectLandingFrameIfExists();

    if (typeof name !== 'undefined') {
      this.custName.setValue(name);
    }
    this.emailField.setValue(email);
    this.setSpecialty();
    this.question.click();
    this.question.setValue(`${message} (${fingerprint})`);

    this.markPDCheckBox();
    if (email === '') {
      this.smsButton.click();
      this.phoneField.waitForDisplayed();
      this.phoneField.setValue(phone);
    }
    browser.pause(1000);
    this.sendButton.click();
    browser.pause(1000);
  }
}
module.exports = new EmailMe();

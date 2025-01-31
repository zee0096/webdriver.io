const widget = require('../../../lib/widget');

/**
 * specific class for GNC
 *
 * @class
 * @extends widget
 */
class GNC extends widget {
  constructor() {
    super();
  }

  /** @type {cssSelectorObj} */
  get customerServiceOption() { return $('#landing-support-link'); }

  /**
   * click On Contact Customer Service option
   */
  clickOnCustomerService() {
    this.selectLandingFrameIfExists();

    this.customerServiceOption.click();
    browser.pause(500);
  }
}
module.exports = new GNC();

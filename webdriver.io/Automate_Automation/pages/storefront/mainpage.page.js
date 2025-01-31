const config = require('config');
const PageLib = require('../../lib/pagelib');

/**
 * BackOfficeProductPage Class page
 *
 * @class mainpage
 * @classdesc mainpage from storefront
 * @extends PageLib
 */
class MainPagePage extends PageLib {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /** imagecount - display the associate image when the value is 1
   * @type {number} */
  get imageCount() { return config.get('sf.mainPage.imageCount'); }

  /** associateImageSel - display the associate image when the value is 1
   * @type {string} */
  get associateImageSel() { return config.get('sf.mainPage.associateImageSel'); }

  /** @type {cssSelectorObj} */
  get posts() { return $('#AtPostsTitle'); }

  /** @type {boolean} */
  get hasPosts() { return config.get('sf.mainPage.posts'); }

  /** @type {boolean} */
  get hasEvents() { return config.get('sf.mainPage.events'); }

  /** @type {number} */
  get trProductCount() { return config.get('sf.trProductCount'); }

  /** ONLY for SAKS @type {cssSelectorObj} */
  get reportConcernLink() { return $(config.get('sf.reportConcern')); }

  /** @type {cssSelectorObj} */
  get sendButton() { return $('.js-form-btn'); }

  /** @type {cssSelectorObj} */
  get closeButton() { return $(config.get('sf.closeButton')); }

  /** @type {cssSelectorTxt} */
  get instagramProductImages() { return 'article.instagram-post'; }

  /** @type {cssSelectorTxt} */
  get productImagesSel() { return '#AtTopPicks article figure img'; }

  /**
   * associateImageIsOk() verifies that the associate(s) image(s) is/are correct
   * @return {boolean} picture status
   */
  associateImageIsOk() {
    const count = $$(this.associateImageSel).length;
    const status = count === this.imageCount;
    if (status) {
      return (this.isRealImage(this.associateImageSel));
    }
    return (status);
  }

  /**
   * reportConcern() submits Report a Concern form from saks storefront
   * This func run only for saks
   *
   * @param {string} email to use to report a concern
   * @return {boolean} true if form has been submitted
   *
   * right now it seems to be majorly borken, i'm keeping it in limbo till fix for SF-22161 is in
   * it should behave like the rest of the forms
   */
  reportConcern(email) {
    this.selectIFrame('sf-reportconcern');
    this.emailField.setValue(email);
    this.sendButton.click();
    browser.pause(1000);
    const status = $('footer.fn-result-message').isVisible;
    this.closeButton.click();
    return (status);
  }
}
module.exports = new MainPagePage();

/**
 * Created by agultsov on 04/04/20.
 */
const Page = require('../page');

/**
 * UserManageDet Class page
 *
 * @class UserManageDet
 * @classdesc Library
 * @extends Page
 */
class UserManageDetPage extends Page {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /** @type {cssSelectorObj} */
  get createdBy() { return $('p*=Created by'); }

  /** @type {cssSelectorObj} */
  get firstName() { return $('.form-card__element--has-separator:nth-of-type(2) > h4.form-card__title:nth-of-type(1)'); }

  /** @type {cssSelectorObj} */
  get lastName() { return $('.form-card__element--has-separator:nth-of-type(2) > h4.form-card__title:nth-of-type(2)'); }

  /** @type {cssSelectorObj} */
  get userName() { return $('.form-card__element--has-separator:nth-of-type(2) > h4.form-card__title:nth-of-type(3)'); }

  /** @type {cssSelectorObj} */
  get alias() { return $('.form-card__element--has-separator:nth-of-type(2) > h4.form-card__title:nth-of-type(4)'); }

  /** @type {cssSelectorObj} */
  get employeeID() { return $('.form-card__element--has-separator:nth-of-type(3) > h4.form-card__title:nth-of-type(1)'); }

  /** @type {cssSelectorObj} */
  get title() { return $('.form-card__element--has-separator:nth-of-type(3) > h4.form-card__title:nth-of-type(2)'); }

  /** @type {cssSelectorObj} */
  get email() { return $('.form-card__element--has-separator:nth-of-type(3) > h4.form-card__title:nth-of-type(3)'); }

  /** @type {cssSelectorObj} */
  get store() { return $('.form-card__element--has-separator:nth-of-type(3) > h4.form-card__title:nth-of-type(4)'); }

  /** @type {cssSelectorObj} */
  get group() { return $('.form-card__element--has-separator:nth-of-type(3) > h4.form-card__title:nth-of-type(5)'); }

  /** @type {cssSelectorObj} */
  get sellingMode() { return $('.form-card__element--has-separator:nth-of-type(3) > h4.form-card__title:nth-of-type(6)'); }

  /** @type {cssSelectorObj} */
  get assignSMSBtn() { return $('[on-switch-click="updateUserTextMessageStatus()"] span.bo-switch-toggle__slider'); }

  /** @type {cssSelectorObj} */
  get assignSocialBtn() { return $('[on-switch-click="updateUserSocialShopStatus()"] span.bo-switch-toggle__slider'); }

  /** @type {cssSelectorObj} */
  get smsNumber() { return $('h4[ng-if*="activeUserData.selling_mode"]'); }

  /** @type {cssSelectorObj} */
  get socialURL() { return $('h4[ng-if="activeUserData.shop_feed_url"]'); }

  /** @type {cssSelectorObj} */
  get yesBtn() { return $('[ng-click*="onConfirmClick("]'); }

  /** @type {cssSelectorObj} */
  get cancelBtn() { return $('[ng-click*="onCancelClick()"]'); }

  /**
   * enableSMS() method to enable the SMS Number
   * @param {Boolean} reverse to disable
   */
  enableSMS(reverse = false) {
    this.waitForLoadingIconDisappear();

    if (reverse === true && this.isSMSEnabled() === true) {
      this.assignSMSBtn.click();
      this.yesBtn.waitForDisplayed();
      this.yesBtn.click();
    }

    if (reverse === false && this.isSMSEnabled() === false) {
      this.assignSMSBtn.click();
      this.yesBtn.waitForDisplayed();
      this.yesBtn.click();
    }

    this.waitForLoadingIconDisappear();
  }

  /**
   * For verifying does SMS number present on the page
   * @return {boolean}
   */
  isSMSEnabled() {
    this.waitForLoadingIconDisappear();
    return this.smsNumber.getText().length > 0;
  }

  /**
   * assignSocialShop() method to enable the Socialshop URL
   * @param {Boolean} reverse to disable
   */
  enableSocialShop(reverse = false) {
    this.waitForLoadingIconDisappear();

    if (reverse === true && this.socialURL.isDisplayed() === true) {
      this.assignSocialBtn.click();
      this.yesBtn.waitForDisplayed();
      this.yesBtn.click();
    }

    if (reverse === false && this.socialURL.isDisplayed() === false) {
      this.assignSocialBtn.click();
      this.yesBtn.waitForDisplayed();
      this.yesBtn.click();
    }

    this.waitForLoadingIconDisappear();
    browser.pause(500);
  }
}

module.exports = new UserManageDetPage();

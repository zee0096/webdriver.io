const BackOfficePage = require('../../backoffice.page');
/**
 * BackOfficeSettingsPage Class page
 *
 * @class BackOfficeSettingsPage
 * @classdesc Library of Backoffice page
 * @extends BackOfficePage
 */
class SettingsPage extends BackOfficePage {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**  @type {cssSelectorObj} */
  get backOfficeProof() { return $('.my-back-office'); }

  /**  @type {cssSelectorObj} */
  get badLoginMessage() { return $('#sf-login-error'); }

  /**  @type {cssSelectorObj} */
  get emailEditButton() { return $('//div[contains(@data-bind, \'"settingsType":"contact"\')]//a'); }

  /**  @type {cssSelectorObj} */
  get emailEditInput() { return $('input#newEmail'); }

  /**  @type {cssSelectorObj} */
  get emailInfo() { return $('//div[contains(@data-bind, \'"settingsType":"contact"\')]//div/p[1]'); }

  /**  @type {cssSelectorObj} */
  get passwordEditButton() { return $('//div[contains(@data-bind, \'"settingsType":"password"\')]//a'); }

  /**  @type {cssSelectorObj} */
  get oldPassword() { return $('#oldPassword'); }

  /**  @type {cssSelectorObj} */
  get newPassword() { return $('#pass'); }

  /**  @type {cssSelectorObj} */
  get verifyPassword() { return $('#verify'); }

  /**  @type {cssSelectorObj} */
  get saveButton() { return $('button[type="submit"]'); }

  /**  @type {cssSelectorObj} */
  get successMsg() { return $('div.message-box-wrapper p'); }

  /**
   * editEmail() edits the email
   * @param {string} email new email
   */
  editEmail(email) {
    this.emailEditButton.waitForEnabled();
    this.emailEditButton.click();
    this.emailEditInput.waitForEnabled({ timeout : 3000 });
    this.emailEditInput.setValue(email);
    this.saveButton.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * editPassword() edits the password in the backoffice, automatically entering the old one and
   * replacing by the new one
   *
   * @param {string} oldPW old password
   * @param {string} newPW new password
   */
  editPassword(oldPW, newPW) {
    this.passwordEditButton.click();
    this.oldPassword.waitForEnabled({ timeout : 3000 });
    this.oldPassword.setValue(oldPW);
    this.newPassword.setValue(newPW);
    this.verifyPassword.setValue(newPW);
    this.saveButton.click();
    browser.back();
  }
}
module.exports = new SettingsPage();

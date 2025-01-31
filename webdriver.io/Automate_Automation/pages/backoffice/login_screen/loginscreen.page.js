const BackOfficePage = require('../../backoffice.page');
const speclib = require('../../../lib/speclib');
const UserManagementPage = require('../accountsettings/usermanagement.page');
/**
 * LoginScreen Class page
 *
 * @class LoginScreenPage
 * @classdesc Represents login screen
 * @extends BackOfficePage
 */
class LoginScreenPage extends BackOfficePage {
  /**
   *Creates an instance of LoginScreenPage.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**  @type {cssSelectorObj} */
  get troubleLoggingInLink() { return $('div.sf-lost-password-container a'); }

  /**  @type {cssSelectorObj} */
  get recoverUsernameTextBox() { return $('input#sf-user-username'); }

  /**  @type {cssSelectorObj} */
  get recoverPasswordTextBox() { return $('input#sf-user-password'); }

  /**  @type {cssSelectorObj} */
  get userLockedError() { return $('div#sf-login-error'); }

  /**  @type {cssSelectorObj} */
  get recoverUsernameButton() { return $('form#lostusernameform input#wp-submit'); }

  /**  @type {cssSelectorObj} */
  get recoverPasswordButton() { return $('form#lostpasswordform input#wp-submit'); }

  /**
   * Clicks Trouble logging in link
   */
  clickTroubleLoggingInLink() {
    this.troubleLoggingInLink.click();
  }

  /**
   * Recovers username using email
   * @param email {string} user email
   */
  recoverUsernameWithEmail(email) {
    this.recoverUsernameTextBox.setValue(email);
    this.recoverUsernameButton.click();
  }

  /**
   * Recovers username using email
   * @param email {string} user email
   */
  recoverUPasswordWithEmail(email) {
    this.recoverPasswordTextBox.setValue(email);
    this.recoverPasswordButton.click();
  }

  /**
   * Tries to log in with wrong credentials for numberOfAttempts times
   * @param credentials {{password: string, username: string}}
   * @param numberOfAttempts {integer}
   */
  loginWithWrongCredentials(credentials, numberOfAttempts) {
    for (let i = 0; i < numberOfAttempts; i++) {
      this.openBoAndLogin(credentials);
    }
  }
}
module.exports = new LoginScreenPage();

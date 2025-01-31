const BackOfficePage = require('../backoffice.page');
/**
 * DeleteUserPage Class page
 *
 * @class DeleteUserPage
 * @classdesc Library of Backoffice page
 * @extends BackOfficePage
 */

class DeleteUserPage extends BackOfficePage {
  /**
   *Creates an instance of NEW Back Office Page.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**  @type {cssSelectorObj} */
  get deleteUserLink() { return $('h5 > a'); }

  /**  @type {cssSelectorObj} */
  get confirmDeleteLink() { return $('*=Yes'); }

  /**  @type {cssSelectorObj} */
  get usersHeader() { return $('#users'); }

  /** footer of user list page
   * @type {cssSelectorObj} */
  get footerUsersPage() { return $('h4*=1996 Cybertek Netsolutions'); }

  /**  Reset password link
   * @type {cssSelectorObj} */
  get resetPwLink() { return $('a*=Reset'); }

  /** New password field in reset password page
   * @type {cssSelectorObj} */
  get newPasswordField() { return $('input[name=user_pass]'); }

  /**  Save button of reset password
   * @type {cssSelectorObj} */
  get saveBtn() { return $('input[value=Save]'); }

  /**  message that user password was changed
   * @type {cssSelectorObj} */
  get confirmPwResetMsg() { return $('h2*=Password reset to'); }

  /**  @type {cssSelectorObj} */
  get userTableSearchField() { return $('#usersTable_filter  input'); }

  /**  @type {cssSelectorObj} */
  get invitationsTableSearchField() { return $('#invitesTable_filter input'); }

  /**  find rep in user's list
   * @param {string} username
   * @type {cssSelectorObj} */
  findRep(username) { return $(`a=${username}`); }

  /** find onboarded user or invitation by email in users.php page by partial match
   * @param {string} email
   * @return {xpathSelectorObj} */
  findEntryByPartialMatch(email) { return $(`//td[contains(text(), '${email}')]/  preceding-sibling::td/  a`); }

  /**
   * delete users and invitations on users.php page with a specific email
   *  @param {string} email the email of the rep to match (partial match)
   */
  deleteRepsAndInvitationsByEmail(email) {
    this.userTableSearchField.setValue(email);
    browser.pause(500);
    while (this.findEntryByPartialMatch(email).isDisplayed()) {
      this.deleteEntries(email);
      this.userTableSearchField.setValue(email);
    }
    this.invitationsTableSearchField.setValue(email);
    browser.pause(500);
    while (this.findEntryByPartialMatch(email).isDisplayed()) {
      this.deleteEntries(email);
      this.invitationsTableSearchField.setValue(email);
    }
  }

  /**
   * delete entries on users.php page with a specific email
   *  @param {string} email the email of the rep to match (partial match)
   */
  deleteEntries(email) {
    this.findEntryByPartialMatch(email).scrollIntoView();
    browser.pause(500);
    this.findEntryByPartialMatch(email).click();
    this.deleteUserLink.waitForDisplayed();
    this.deleteUserLink.click();
    this.confirmDeleteLink.waitForDisplayed();
    this.confirmDeleteLink.click();
    this.usersHeader.waitForDisplayed();
    browser.pause(500);
  }

  /**
   * openUsersPhpPage() Open .ben/users.php page directly via URL
   */
  openUsersPhpPage() {
    this.openBoPageByUrl('/.ben/users.php');
    this.usersHeader.waitForDisplayed();
  }

  /**
   * clickOnResetPwLnk() click on link in  .ben/users.php page
   */
  clickOnResetPwLnk() {
    this.resetPwLink.click();
  }

  /**
   * clickOnSaveBtn() click on save button in  .ben/users.php page
   */
  clickOnSaveBtn() {
    this.saveBtn.click();
  }
}

module.exports = new DeleteUserPage();

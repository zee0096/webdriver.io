const BackOfficePage = require('../backoffice.page');

/**
 * DeleteContactPage Class page
 *
 * @class DeleteContactPage
 * @classdesc Library of Backoffice page
 * @extends BackOfficePage
 */
class DeleteContactPage extends BackOfficePage {
  /**
   *Creates an instance of NEW Back Office Page.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**  @type {cssSelectorObj} */
  get searchField() { return $('input[name="filter"]'); }

  /**  @type {cssSelectorObj} */
  get confirmDeleteButton() { return $('input[value="Yes, delete the entries"]'); }

  /** @type {string} */
  get contactsPageURL() { return '/.ben/contacts.php'; }

  /**
   * Delete all failed contacts that match the given email
   *
   * @param {string} email the email of the contact to match (partial match)
   * @returns {number} total of deleted contacts
   */
  deleteFailedContacts(email) {
    this.searchField.setValue(`${email}\n`);
    browser.pause(500);
    let countDeletedEmails = 0;
    while ($(`*=${email}`).isDisplayed()) {
      const key = $(`*=${email}`).getText();
      super.go(`${this.contactsPageURL}?email=${key}&cmd=remove&type=all`);
      this.confirmDeleteButton.waitForDisplayed();
      this.confirmDeleteButton.click();
      this.searchField.waitForDisplayed();
      this.searchField.setValue(`${email}\n`);
      countDeletedEmails += 1;
      browser.pause(500);
    }
    return countDeletedEmails;
  }

  /**
   * openContactsPhpPage() Open .ben/contacts.php page directly via URL
   */
  openContactsPhpPage() {
    this.openBoPageByUrl(this.contactsPageURL);
    this.searchField.waitForDisplayed();
  }
}

module.exports = new DeleteContactPage();

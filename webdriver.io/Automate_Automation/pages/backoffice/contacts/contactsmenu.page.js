const config = require('config');
const BackOfficePage = require('../../backoffice.page');

/**
 * backofficecontactsmenu Class page
 *
 * @class ContactsMenuPage
 * @classdesc Library of backofficecontactsmenu page
 * @extends BackOfficePage
 */

class ContactsMenuPage extends BackOfficePage {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  constructor() {
    super();

    /**
     * @type {string}
     */
    this.successColor = '#339933';

    /**
     * @typedef customer
     * @type {object}
     * @property {string} phone - phone number
     * @property {string} email - email customer
     */

    /** @type {customer} */
    this.customer = {};
    this.setCustomerEmail();
    this.setCustomerPhone();
  }

  /** set customer.email property
   * @param {string} [complementaryEmail = this.rawDateString()] complementary email for contact
   */
  setCustomerEmail(complementaryEmail = this.rawDateString()) {
    this.customer.email = `qatest+cust${complementaryEmail}@salesfloor.net`;
  }

  /** set customer.phone property
   * @param {string} [prefixPhone = this.newContactPhoneNumberStartsWith] complementary phone (suffix) for contact
   */
  setCustomerPhone(prefixPhone = this.newContactPhoneNumberStartsWith) {
    this.customer.phone = `${prefixPhone}${this.pad(Math.floor(Math.random() * 9999), 4)}`;
  }

  /** @type {cssSelectorObj} */
  get contactsMenu() { return $('=Contacts'); }

  /** @type {cssSelectorObj} */
  get addContactLink() { return $('.jsAddCustomerModal'); }

  /** @type {cssSelectorObj} */
  get addContactButton() { return $('a.add-customers.rep-btn-primary.jsAddCustomers'); }

  /** @type {cssSelectorObj} */
  get addContactMiniLink() { return $('a.jsCustomerAddModal'); }

  /** @type {cssSelectorObj} */
  get deleteContactButton() { return $('a.rep-btn-primary.jsBulkDeleteCustomer'); }

  /** @type {cssSelectorObj} */
  get firstName() { return $('input.jsCustomerFirstName.wth60'); }

  /** @type {cssSelectorObj} */
  get lastName() { return $('input.jsCustomerLastName.wth60'); }

  /** @type {cssSelectorObj} */
  get email() { return $('input.jsCustomerEmail.wth60'); }

  /** @type {cssSelectorObj} */
  get phone() { return $('input.jsCustomerPhone.wth40'); }

  /** @type {cssSelectorObj} */
  get subscribeCheck() { return $('.jsGroupsCheck'); }

  /** @type {cssSelectorObj} */
  get saveContact() { return $('*=SAVE'); }

  /** @type {cssSelectorObj} */
  get addContactSuccess() { return $('span.sf-ajax-action.set-upfront.jsAjaxNotification'); }

  /**  @type {cssSelectorArr} */
  get contactList() { return $$('li.contact.jsContact:not([style="display: none;"]) > span.customer-info'); }

  /** @type {cssSelectorObj} */
  get searchField() { return $('input.jsSearchQuery.search-query'); }

  /** @type {cssSelectorObj} */
  get closeNotification() { return $('a.jsCloseNotification'); }

  /** @type {cssSelectorObj} */
  get getLoadingSpin() { return $('.loading-spin.loading-customers-list'); }

  /** @type {string} */
  get hasContacts() { return config.get('bo.homeTabs.contacts'); }

  /**  @type {string} newContactPhoneNumberStartsWith contact number to start*/
  get newContactPhoneNumberStartsWith() { return config.get('bo.newContactPhoneNumberStartsWith'); }

  /**
   * open contacts page
   */
  openContactsPage() {
    this.go('/backoffice/contacts');
    this.addContactButton.waitForDisplayed();
  }

  /**
   * addContactFromMenu()
   */
  addContactFromMenu() {
    this.contactsMenu.waitForDisplayed();
    this.contactsMenu.moveTo();
    this.addContactLink.waitForDisplayed();
    this.addContactLink.click();
  }

  /**
   * addContactFromPage
   */
  addContactFromPage() {
    this.addContactButton.waitForDisplayed();
    this.addContactButton.click();
    this.addContactMiniLink.waitForDisplayed();
    this.addContactMiniLink.click();
  }

  /**
   * addNewContact() creates a new contact from backoffice contacts page.
   *
   * @param {String} customerEmail is contact email
   * @param {String} [first='Testcustomer'] -  first name of contact
   * @param {String} [last='Qatest'] - last name of contact
   * @param {String} [phone=''] -  phone number of contact
   * @param {Boolean} [sub=false] subscriber if true, false if not
   * @return {Boolean} true if creation was successful
   */
  addNewContact(customerEmail, first = 'Testcustomer', last = 'Qatest', phone = '', sub = false) {
    this.firstName.waitForDisplayed();
    this.firstName.setValue(first);
    this.lastName.setValue(last);
    this.email.setValue(customerEmail);
    this.phone.setValue(phone);
    if (sub === true) {
      this.subscribeCheck.click();
    }

    this.saveContact.click();
    this.addContactSuccess.waitForDisplayed();
    const status = this.addContactSuccess.getCSSProperty('background-color').parsed.hex === this.successColor;
    this.closeNotification.click();
    return (status);
  }

  /**
   * deleteContact() deletes a contact from contacts list.
   *
   * @param {string} key is contact email or phone
   * @param {("email"| "phone")} [type='email'] - type of contact
   * @return {boolean} true if contact is deleted
   */
  deleteContact(key, type = 'email') {
    if (type === 'email') {
      // necessary because the new contact added from menu doesn't update the browser
      // (table of list of contacts)
      browser.refresh();
    }
    this.getLoadingSpin.waitForDisplayed({ timeout : 20000, reverse : true });
    this.searchField.waitForDisplayed();
    if (type === 'email') {
      this.searchField.setValue(key.slice(key.indexOf('+') + 1));
    } else {
      this.searchField.setValue(key);
    }
    this.contactList[0].$('span.check > span.icon-checkbox').click();
    this.deleteContactButton.waitForDisplayed();
    this.deleteContactButton.click();
    browser.acceptAlert();
    this.ajaxMessageNotification.waitForDisplayed({ timeout : 6000 });
    const result = this.ajaxMessageNotification.getCSSProperty('background-color');
    this.closeNotification.click();
    return (result.parsed.hex === this.successColor);
  }

  /**
   * pad() left-pads the given string/number with zeros on the left until it is the specified size
   * @param {(string|number)} str to pad with zeros. Can be a number as well...
   * @param {number} [size=4] the total size of the resulting string
   * @return {string} a string of the specified size with zeros added to pad (if necessary)
   */
  pad(str, size = 4) {
    const numberInStringFormat = str.toString();
    return numberInStringFormat.padStart(size, '0');
  }
}
module.exports = new ContactsMenuPage();

const MessageCenterClass = require('./messagecenter.class');

const successColor = '#339933';
/**
 * ComposePage Class page
 *
 * @class ComposePage
 * @classdesc Library of Backoffice page
 * @extends BackofficeLib
 */
class ComposePage extends MessageCenterClass {
  /**
   *Creates an instance of NEW Back Office Page.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**
   * @returns {string} compose message page url
   */
  get composeMessagePageUrl() { return `/backoffice/store-request-center#/messages/compose`; }

  /**  @type {cssSelectorObj} */
  get addressBookIcon() { return $('section[ng-show="composing"] send-mail span.item-sections label span i.icon-phonebook.icon-phonebook-to.contact-popoup.jsContactsPopup'); }

  /**  @type {cssSelectorObj} */
  get finishButton() { return $('section.content-section[ng-show="composing"] > send-mail > div > span > span.item-modal.add-customers-action > a.jsFinishAdd.rep-btn-primary'); }

  /**  @type {cssSelectorObj} */
  get toField() { return $('section[ng-show="composing"] send-mail span.item-sections label input[ng-model="emailsToHolder"]'); }

  /**  @type {cssSelectorObj} */
  get subjectField() { return $('section[ng-show="composing"] send-mail span.item-sections label input[ng-model="composingTitle"]'); }

  /**  @type {cssSelectorObj} */
  get messageBox() { return $('section[ng-show="composing"] send-mail span.item-sections.compose-field > div > textarea'); }

  /**  @type {cssSelectorObj} */
  get sendMessageBtn() { return $('section[ng-show="composing"] send-mail span.item-sections.compose-field > div > a[ng-click="sendMessage(threadID)"]'); }

  /**  @type {cssSelectorObj} */
  get insertProductBtn() { return $('section:not(.ng-hide)[ng-show="composing"] a#fn-add-product-trigger'); }

  /**  @type {cssSelectorObj} */
  get insertAssetBtn() { return $('section[ng-show="composing"] send-mail span.item-sections > label > div.insert-product > span > a#fn-add-asset-trigger'); }

  /**  @type {cssSelectorObj} */
  get attached() { return $('section[ng-show="composing"] send-mail span.item-sections.jsAttachedProducts > ul.attached-products > li.attached-product > span'); }

  /**
   * Opens compose message page
   */
  deeplinkToComposeMessagePage() {
    this.openBoPageByUrl(this.composeMessagePageUrl);
  }

  /**
   * gets the recipient list from the field and splits them into an array
   * @return {array} the list of recipients
   */
  getRecipients() {
    const recipients = this.toField.getValue();
    return (recipients.split(';'));
  }

  /**
   *  compare that two lists of recipients match (array comparison, basically)
   * @param {array} baseline the first array to compare with
   * @param {array} compare the second array to compare with
   * @returns {boolean} true if the arrays of recipients match, false if not
   */
  recipientsMatch(baseline, compare) {
    if (baseline.length === compare.length) {
      return (baseline.every((c) => compare.includes(c)));
    }
    return false;
  }

  /**
   * sets the subject field to the specified subject
   * @param {string} subject to set
   */
  setSubject(subject) {
    this.subjectField.setValue(subject);
  }

  /**
   * enters the specified message in the message box
   * @param {string} message to set
   */
  setMessage(message) {
    this.messageBox.setValue(message);
  }

  /**
   *  sets the recipients of the email from the To line directly. It takes an
   *  array of strings or just one string (separate contacts with ;)
   * @param {string|array} recipients
   */
  setRecipientsByText(recipients) {
    let recipientsList;
    if (typeof recipients === 'string') {
      recipientsList = recipients;
    } else {
      recipientsList = recipients.join(';');
    }
    this.toField.setValue(recipientsList);
  }

  /**
   * attaches a product to the mail
   * @returns {string} name of attached product
   */
  attachProduct() {
    this.insertProductBtn.click();
    return (this.selectProduct());
  }

  /**
   * attaches aт asset to the mail
   */
  attachAsset() {
    this.insertAssetBtn.click();
    this.selectProduct(false);
  }

  /**
   *  gets the product's text that was attached to the email
   * @return {string} the product description
   */
  getAttachedProductText() {
    this.attached.waitForDisplayed();
    return (this.attached.getText());
  }

  /**
   * sets the recipients for the compose email by picking the specified
   * contacts from the address book
   * @param {array} contacts the email addresses to select
   * @return {array} the names of the recipients that were selected, since the compose screen does
   *                 not reliably display emails, we have to use names to verify
   */
  setRecipientByAddressBook(contacts) {
    const recipientsList = [];
    let first;
    let last;
    const hugeSelector = 'section.content-section[ng-show="composing"] > send-mail > div > span > span.item-modal.customer-list > span.customer-items.jsCustomerItemsList >';

    if (typeof contacts === 'string') {
      // eslint-disable-next-line no-param-reassign
      contacts = [contacts];
    }
    this.addressBookIcon.waitForDisplayed();
    this.addressBookIcon.click();
    this.finishButton.waitForDisplayed();
    contacts.forEach((c) => {
      $(`${hugeSelector} span[data-filter*="${c}"] > i`).click();
      if ($(`${hugeSelector} span[data-filter*="${c}"] > b`).isExisting()) {
        first = $(`${hugeSelector} span[data-filter*="${c}"] > b`).getText();
      } else {
        first = '';
      }
      if ($(`${hugeSelector} span[data-filter*="${c}"] > strong`).isExisting()) {
        last = $(`${hugeSelector} span[data-filter*="${c}"] > strong`).getText();
        last = last.substring(0, last.length - 1);
        recipientsList.push(`${first} ${last}`);
      } else {
        recipientsList.push(`${first}`);
      }
    });
    this.finishButton.click();
    return (recipientsList);
  }

  /**
   * actually sends the message that was prepared
   * @return {boolean} true if the success message is shown after sending, false if not
   */
  sendMessage() {
    this.sendMessageBtn.click();
    this.ajaxMessageNotification.waitForDisplayed({ timeout : 15000 });
    return (this.ajaxMessageNotification.getCSSProperty('background-color').parsed.hex === successColor);
  }

  /**
   * waitForAssetAttach
   */
  waitForAssetAttach() {
    this.insertProductBtn.waitForDisplayed({ timeout : 30000, reverse : true });
  }
}
module.exports = new ComposePage();

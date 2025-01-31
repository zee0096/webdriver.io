const config = require('config');

const BackofficePage = require('../backoffice.page');
const Contact = require('./contact');

let repChatPageId;
let custChatPageId;

/**
 * MultiPage Class page
 *
 * @class MultiPage
 * @classdesc Library
 * @extends BackofficePage
 */
class SalesTrackingPage extends BackofficePage {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();

    /**
     * @property {Object} Transaction - Contains the information about the transaction
     * @property {string} Transaction.ID - the ID of the transaction after it was performed
     * @property {string} Transaction.customerEmail - the customerEmail during the transaction
     * @property {string} Transaction.customerName - the customerName during the transaction
     * @property {string} Transaction.unitPrice - the unitPrice during the transaction
     * @property {string} Transaction.productId - the productId during the transaction
     * @property {string} Transaction.quantity - the quantity during the transaction
     * @property {string} Transaction.currency - the currency during the transaction
     */
    this.transaction = {
      ID            : '',
      customerEmail : Contact.email,
      customerName  : Contact.fullName,
      unitPrice     : this.randomPrice,
      productId     : '',
      quantity      : '1',
      currency      : 'CAD'
    };
  }

  /**  @type {cssSelectorArr} */
  get custCustomerChats() { return $$('div.js-chat-container div.chat-message.chat-message--is-user div.chat-message__bubble p.chat-message__bubble__text'); }

  /**  @type {cssSelectorArr} */
  get custRepChats() { return $$('div.js-chat-container div.chat-message.chat-message--is-rep div.chat-message__bubble p.chat-message__bubble__text'); }

  /**  @type {cssSelectorArr} */
  get repCustomerChats() { return $$('div.js-chat-bubble.chat-user-ctn'); }

  /**  @type {cssSelectorArr} */
  get repCustomerChatsUrl() { return $$('div.js-chat-bubble.chat-user-ctn div.content-text-ctn a'); }

  /**  @type {cssSelectorArr} */
  get repRepChats() { return $$('div.js-chat-bubble.chat-rep-ctn'); }

  /**  @type {cssSelectorArr} */
  get repRepChatsUrl() { return $$('div.js-chat-bubble.chat-rep-ctn div.content-text-ctn a'); }

  /** @type {cssSelectorObj} */
  get sendMessageBtn() { return $('#btnSendChatMessage'); }

  /** @type {cssSelectorObj} */
  get customerName() { return $('div.chat-message.chat-message--is-user.clearfix p.chat-message__author'); }

  /**  @type {cssSelectorArr} */
  get productName() { return $$('header.fn-selectable-container-trigger h1'); }

  /** @type {cssSelectorObj} */
  get sendProductButton() { return $('#repSelectProduct'); }

  // chat rep
  /**  @type {cssSelectorTxt} */
  get repChatSelector() { return 'div.js-chat-container div.chat-rep-ctn'; }

  // new configuration (rec = receive | snd = Send)
  /**  @type {cssSelectorArr} */
  get repRecUrlViaChat() { return $$(`${this.custChatSelector} div.content-text-ctn a`); }

  /**  @type {cssSelectorArr} */
  get repSndUrlViaChat() { return $$(`${this.repChatSelector}  div.content-text-ctn a`); }

  /**  @type {cssSelectorArr} */
  get repRecTxtViaChat() { return $$(`${this.custChatSelector} div.content-text-ctn`); }

  /**  @type {cssSelectorArr} */
  get repSndTxtViaChat() { return $$(`${this.repChatSelector}  div.content-text-ctn`); }

  /**  @type {cssSelectorArr} */
  get repSndPrdViaChat() { return $$(`${this.repChatSelector}  div.content-product-description h1`); }

  /**
   * Return the random price with 2 decimals for do a transaction
   * @return {string}
   */
  get randomPrice() {
    return (Math.random() * 1000).toFixed(2);
  }

  /**  storeAPIValue
   * @returns {number} storeId
  */
  get storeAPIValue() { return config.get('storeAPIValue'); }

  /**
   * Mathod for setup transaction customer info
   * @param {string} email
   * @param {string} name
   */
  setTransactionCustomerInfo(email, name) {
    this.transaction.customerEmail = email || Contact.email;
    this.transaction.customerName = name || Contact.fullName;
  }

  /**
   * Method for setup the transaction price
   * @param {string} price
   */
  setTransactionPrice(price) {
    this.transaction.unitPrice = price || this.randomPrice;
  }

  /**
   * Method for setup the transaction product id
   * @param {string} productId
   */
  setTransactionProductId(productId) {
    this.transaction.productId = productId || 'defaultProductID';
  }

  /**
   * Method for setup the transaction quantity
   * @param {string} quantity
   */
  setTransactionQuantity(quantity = '1') {
    this.transaction.quantity = quantity;
  }

  /**
   * Method for setup the transaction currency
   * @param {string} currency
   */
  setTransactionCurrency(currency = 'CAD') {
    this.transaction.currency = currency;
  }

  /**
   * Method for performing transaction using the transaction object
   * {object} trObj provide the properties we may need to use during the transaction
   */
  makeTransaction({
    email = this.transaction.customerEmail,
    name = this.transaction.customerName,
    unitPrice = this.transaction.unitPrice,
    productId = this.transaction.productId,
    quantity = this.transaction.quantity,
    currency = this.transaction.currency
  }) {
    this.transaction.ID = this.doTransaction(
      email,
      name,
      unitPrice,
      productId,
      quantity,
      currency
    );
  }

  /**
   *  switchToCustomer() switches to customer chat window
   */
  switchToCustomer() {
    browser.switchTab(custChatPageId);
    browser.pause(800);
    if (($('#sf-services-landing')).isExisting()) {
      this.selectIFrame('sf-services-landing');
    }
  }

  /**
   *  switchToRep() switches to rep chat window
   */
  switchToRep() {
    browser.switchTab(repChatPageId);
    browser.pause(800);
  }

  /**
   * doTransaction
   * @param {string} [customerEmail='qatest+johnsmith@salesfloor.net']
   * @param {string} [customerName='John Smith']
   * @param {string} [unitPrice='99.99']
   * @param {string} [productId='fakeittillyoumakeit']
   * @param {string} [quantity='1']
   * @param {string} [currency='CAD']
   * @returns {string}
   */
  /* eslint-disable */

  doTransaction(customerEmail = 'qatest+johnsmith@salesfloor.net', customerName = 'John Smith',
    unitPrice = '99.99', productId = 'fakeittillyoumakeit', quantity = '1', currency = 'CAD') {
    const transactionId = this.rawDateString();
    browser.execute((email, name, tid, pid, price, qty, cur) => {
      // Create structure to hold transaction & Item(s)
      sf_widget_events = {
        "events": [], "tracker": function (eventName, data) {
          sf_widget_events.events.push(
            { "eventName": eventName, "data": data }
          )
        }
      };

      // Create transaction
      sf_widget_events.tracker('ecommerce:addTransaction',
        {
          'customer_email': email, // Customer Email. Required.
          'customer_name': name,   // Customer Name. Required.
          'trx_id': tid,           // transaction ID. Required.
          'trx_total': price,      // Subtotal. Required.
          'currency': cur          // transaction Currency. Required.
        }
      );

      // Add single item at a time to the transaction. (Usually within loop for each item)
      sf_widget_events.tracker('ecommerce:addItem',
        {
          'trx_id': tid,             // transaction ID. Required.
          'product_id': pid,         // SKU/code. Required.
          'trx_detail_total': price, // Unit price. Required.
          'quantity': qty            // Quantity. Required.
        }
      );

      // Once finished adding transaction & all items, trigger the Sales Tracking
      // event to be sent to Salesfloor. Caution: Any transactions, items or data
      // adjustments made after this call will not be recorded.
      try {
        window.sf_widget && sf_widget.widgets && sf_widget.widgets.eventstracker
        && sf_widget.widgets.eventstracker.load();
      } catch (err) {
        console.log('transaction failed...');
        console.log(`err=${err}`);
      }
    }, customerEmail, customerName, transactionId, productId, unitPrice, quantity, currency);
    browser.pause(7500);
    return (transactionId);
  }


  // ********** from getsales class to here ************************

  /**
   * getSale() gets the information of the sale for the specified transaction ID
   *  to use this func, you MUST HAVE opened BO page before
   *  @param {string} transactionId to return detailed information of
   *  @return {object} the details of the transactionID
   */
  getSale(transactionId) {
    // eslint-disable-next-line max-len
    this.openBoPageByUrl(`/wp-admin/admin-ajax.php?timezone=America%2FNew_York&period=today&action=sfreports&type[0]=get-sales&transaction_id=${transactionId}`);
    const body = JSON.parse(($('body').getText()));
    return (body.data.user.all.sales[0]);
  }

  /**
   * modeParameterInUrl() return the mode(store/rep) with respectively value
   * @return {string} parameter rep/store text with the value
   */
  modeParameterInUrl() {
    if (this.isTeamMode) {
      return `sf_store=${this.storeAPIValue}`;
    }
    return `sf_rep=${this.REP_NAME}`;
  }
}

module.exports = new SalesTrackingPage();

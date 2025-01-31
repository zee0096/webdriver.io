const config = require('config');
const Widget = require('./widget');

/**
 * Class LiveChat
 *
 * @class LiveChat
 * @classdesc Main class to access the livechat page
 * @extends Widget
 */
class LiveChat extends Widget {
  #productName
  /** Library for live chat
   * @constructor LiveChat
   */
  constructor() {
    super();
  }

  // get for products library
  /** @type {cssSelectorTxt} */
  get producLibIframeId() { return 'iframe[id="libraryIframe"]'; }

  /** @type {cssSelectorObj} */
  get lastProdSendByRep() { return $('div.has-product:not(.is-chained) h1'); }

  /** save button
   * @type {cssSelectorObj} */
  get AddProdBtn() { return $('button.fn-trigger-save:first-child'); }

  /** @type {cssSelectorArr} */
  get checkAProduct() { return $$('article i.icon-check'); }

  // get for livechat
  /** @type {cssSelectorObj} */
  get chatName() { return $('#first_name, #name'); }

  /** @type {cssSelectorObj} */
  get chatSubmitButton() { return $('form#userInformation fieldset > button.chat-window__form__submit, footer button'); }

  /** @type {cssSelectorObj} */
  get questionBoxTxt() { return $('#chatTextarea'); }

  /** Send button from rep window
   * @type {cssSelectorObj} */
  get sendMessageBtn() { return $('button#btnSendChatMessage'); }

  /** @type {cssSelectorObj} */
  get sendMessageBtnWidget() { return $('button.chat-window__form__submit.chat-window__form__submit--is-send'); }

  /** @type {cssSelectorObj} */
  get chatMessageBox() { return $('textarea#chatTextarea'); }

  /** @type {cssSelectorObj} */
  get chatClientlastMsgSend() { return $('div.chat-message.chat-message--is-user:last-child p.chat-message__bubble__text'); }

  /** @type {cssSelectorObj} */
  get chatClientlastProdReceived() { return $('div.has-product:not(.is-chained) h1'); }

  /** @type {cssSelectorObj} */
  get chatClientlastMsgReceived() { return $('div.js-chat-container div.chat-rep-ctn:last-child p'); }

  /** @type {cssSelectorObj} */
  get chatClientlastUrlReceived() { return $('div.js-chat-container div.chat-rep-ctn:last-child p a'); }

  /** @type {cssSelectorObj} */
  get chatRepLastMsgReceived() { return $('div.js-chat-container div.js-chat-bubble.chat-user-ctn:last-child'); }

  /** @type {cssSelectorObj} */
  get chatRepSendMsgBtn() { return $('button#btnSendChatMessage'); }

  /** @type {cssSelectorObj} */
  get chatReplastMsgSend() { return $('div.js-chat-bubble.chat-rep-ctn:last-child div.content-text-ctn'); }

  /** This link represents the clip icon on the foolter
   * @type {cssSelectorObj} */
  get sendProductButton() { return $('#repSelectProduct'); }

  /** @type {cssSelectorArr} */
  get listOfPrdsProdLib() { return $$('div.fn-manager-products h1'); }

  /** @type {cssSelectorObj} */
  get searchProduct() { return $('#searchProduct'); }

  /** @type {cssSelectorObj} */
  get searchProductBtn() { return $('button[type="submit"]'); }

  /** @type {cssSelectorObj} */
  get liveChatTitle() { return $('#AtChatTitle'); }

  /**
   * usually displays this field when the rep is not available for chat
   * @type {cssSelectorObj}
   */
  get textMessageFld() { return $('#questionField'); }

  /**
   * getProductName
   * @type {string}
   */
  get getProductName() { return this.#productName }

  /**
   * update the property with the ProductName
   * @param {string} productName
   * */
  set setProductName(prodName) { this.#productName = prodName; }

  /** @type {boolean} */
  get hasQuestionBoxTxt() { return config.get('widget.liveChat.hasQuestionBoxTxt'); }

  /**
   * The email name to specify during the chat request
   * @return {string}
   */
  get liveChatEmailNameInReq() {
    return `qatest_chat${this.rawDateString()}@salesfloor.net`
  }

  /**
   * requestLiveChat() creates a chat request while filling all given fields
   *
   * @param {string} email - to enter in the dialog
   * @prop {object}  argsObj - Object that will receive the parameters
   * @prop {string}  [argsObj.textMessage={}] - text message in text field
   */
  requestLiveChat(email, argsObj = {}) {
    argsObj.textMessage = argsObj.textMessage ?? false;
    this.emailField.waitForDisplayed();

    if (this.chatName.isDisplayed()) {
      this.chatName.setValue('Reggie Repartie');
    }
    this.markPDCheckBox();
    this.emailField.setValue(email);
    // we don't know the rep when the request comming from  only in sidebar, store and/or speciality
    if (this.liveChatFrom === 'sidebar') {
      this.selectSpecialtyOpt();

      if (this.hasQuestionBoxTxt) {
        this.questionBoxTxt.setValue('This is a test');
      }
    }
    // the message field is displayed when the rep is not available for chat
    if (this.textMessageFld.isDisplayed() && argsObj.textMessage) {
      this.textMessageFld.setValue(argsObj.textMessage);
    }

    this.chatSubmitButton.scrollIntoView();
    this.chatSubmitButton.waitForEnabled();
    this.chatSubmitButton.click();
  }

  /**
   * switchToCustomerLiveChatWindow - switch the window to live chat client/customer
   */
  switchToCustomerLiveChatWindow() {
    browser.switchToWindow(this.liveChatClientWindowId);
  }

  /**
   * customerSendsMsg() sends a message by the customer and calls for verification
   * @param {string} message to send by the customer in chat
   */
  customerSendsMsg(message) {
    if (this.liveChatFrom === 'sidebar') {
      this.selectIFrame(this.chatRequestIframeId, { hasParentFrame: true, pauseTime: 500 });
    }
    this.chatMessageBox.waitForDisplayed();
    this.chatMessageBox.setValue(message);
    this.sendMessageBtnWidget.click();
    browser.pause(500);
  }

  /**
   * RepSendsMsg() Rep sends a message OR Url to the customer
   * @param {string} message to send to the customer in chat
   */
  repSendsMsg(message) {
    this.chatMessageBox.waitForDisplayed();
    this.chatMessageBox.setValue(message);
    this.chatRepSendMsgBtn.click();
    browser.pause(500);
  }

  /**
   * repSendsProduct() Rep sends a product to the customer
   * @param {number} [item=1] of product library
   * @returns Product name selected
   */
  repSendsProduct(itemSelected = 1) {
    this.sendProductButton.click();
    // opens the product library inside widget page
    browser.pause(500);
    this.selectIFrame(this.producLibIframeId, { pauseTime: 1000 });
    const productName = this.listOfPrdsProdLib[itemSelected].getText();
    this.checkAnProdInProdLib(itemSelected);
    this.AddProdBtn.click();
    browser.switchToParentFrame();
    browser.pause(300);
    // the product takes time to load on chat
    browser.pause(500);
    return (productName);
  }

  /**
   * clickOnUrlOnChatBox() Customer click on Url received by Rep
   */
  clickInUrlOnChatBox() {
    if (this.liveChatFrom === 'sidebar') {
      this.selectIFrame(this.chatIframeId, { hasParentFrame : true });
    }
    this.chatClientlastUrlReceived.click();
    browser.pause(500);
    this.tempWindowId = this.getWindowIdFromNewWindow();
    browser.switchToWindow(this.tempWindowId);
  }

  /**
   * checkAnProdInProdLib - click on add button to send prod to customer and
   * get the product name
   * @param {number} [prdIndex=1] of product library
   */
  checkAnProdInProdLib(prdIndex = 1) {
    this.searchProductBtn.waitForDisplayed();
    this.searchProductBtn.click();
    browser.pause(3000);
    this.checkAProduct[prdIndex].waitForDisplayed();
    this.checkAProduct[prdIndex].click();
    this.setProductName = this.listOfPrdsProdLib[prdIndex].getText();
  }

  /**
   * clickOnAddProductIcn - click on clips to add product from prodlib page
   */
  clickOnAddProductIcn() {
    // opens the product library inside widget page
    this.sendProductButton.click();
    browser.pause(1000);
    this.selectIFrame(this.producLibIframeId);
  }

  /**
   * clickOnAddBtn - click on Add btn in prod lib page
   */
  clickOnAddBtn() {
    this.AddProdBtn.click();
    browser.pause(1000);
    browser.switchToParentFrame();
    // the product takes time to load on chat
  }
}
module.exports = new LiveChat();

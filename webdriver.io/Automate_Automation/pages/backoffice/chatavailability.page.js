/**
* the chat file will be the library for chat
* doesn't matter where the chat is coming from (sd, bo, footer)
* then all code about chat will be unified in this library and
* avoid duplicated code.
* REMEMBER the getter and functions usually work for sidebar/chat and footer/chat scripts
*
* IMPORTANT:
* Attention when you change some function, because it will have impact where this library is used
*/
const config = require('config');

const Backoffice = require('../backoffice.page');

/**
 * ChatPage Class page
 *
 * @class
 * @classdesc Generic library for chat doesn't metter where it will be used (sf, sb ...)
 * The propose of this library is put all variables, functions and getter together in only on place
 * @extends BackOfficePage
 */
class ChatAvailabilityPage extends Backoffice {
  /**
   * Creates an instance of chat
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**
   * @type {boolean} */
  get hasDotChatWidget() { return config.get('lp.dotChatWidget'); }

  /** check if the chat is available in Footer
   * @type {boolean} */
  get chatAvailable() { return $('.is-available, #AtSidebarStatusDot').isDisplayed(); }

  /** @type {cssSelectorObj} */
  get chatMessageBox() { return $('textarea#chatTextarea'); }

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
  get repSndPrdViaChat() { return $$(`${this.repChatSelector}  div.content-product-description h1`); }

  /** @type {cssSelectorObj} */
  get sendProductButton() { return $('#repSelectProduct'); }

  /** @type {cssSelectorObj} */
  get sendMessageBtn() { return $('#btnSendChatMessage'); }

  /** Lever Iframe (available for chat)
   *  @type {cssSelectorTxt} */
  get leverIframeId() { return 'iframe[id="sf-chat-available-dropdown"]'; }

  /**  @type {cssSelectorObj} */
  get chatLeverButton() { return $('.lever'); }

  /**  Status of chat lever
   * @type {cssSelectorObj}
   */
  get chatStatus() { return $('input.js-chat-dropdown'); }

  /** confirm button in chat queue popup/alert window.
   * This button is displayed when the user click on available for chat lever
  * @type {cssSelectorObj} */
  get confirmQueueAlertBtn() { return $('button=Confirm'); }

  /** confirm button in popup windows. This button is displayed
   * when the user click on available for chat lever
   * @type {cssSelectorObj} */
  get cancelButtonFromChat() { return $('#confirm-disable-chat-prompt'); }

  /** get IdFrame of Live Chat
   * @type {cssSelectorTxt} */
  get liveChatRequestIframeId() { return 'iframe[id="sf-notification-companion"]'; }

  /**
   * getProductNameFromProdLib - get the product name of one product
   * displayed on Prod Lib.
   * @param {number} prdIndex - item to get the product name
   * @returns Description of product without spaces
   */
  getProductNameFromProdLib(prdIndex) {
    const prodDesc = this.listOfPrdsProdLib[prdIndex].getAttribute('innerHTML');
    return prodDesc.substring(prodDesc.indexOf('</em>') + 5).trim().replace(/amp;/g, ''); // avoid issue &amp;
  }

  /**
   *  switchToCustomer() switches to customer chat window
   */
  switchToCustomer() {
    browser.switchTab(this.custChatPageId);
    browser.pause(800);
    if (($('#sf-services-landing')).isExisting()) {
      this.selectIFrame('sf-services-landing');
    }
  }

  /**
   * isChatButtonPresent() verifies that the chat button is visible on the back office page
   * @return {boolean} visibility
   */
  isChatButtonPresent() {
    this.selectIFrame(this.leverIframeId, { hasParentFrame : true, pauseTime : 500 });

    return this.chatLeverButton.isDisplayed();
  }

  /**
   * chatStatusofLever - Check if the available for chat is selected (on) or not (off)
   * @returns {boolean} chat lever status is On or Off
   */
  isAvailableForChatLeverOn() {
    this.isChatButtonPresent();
    return this.chatStatus.isSelected();
  }

  /**
   * clickOnLeverButton - click on lever buton on available for chat option in BO
   */
  clickOnLeverButton() {
    this.isChatButtonPresent();
    browser.pause(500);
    this.chatLeverButton.click();
  }

  /**
   * turnAvailableForChatTo() turns on or off the availability of the rep
   * @param {boolean} enableChat Confirm (true)/Cancel(false) on ChatQueue Popup (alert)
   */
  turnAvailableForChatTo(enableChat) {
    const statusOfLever = this.isAvailableForChatLeverOn();

    if ((enableChat && !statusOfLever) || (!enableChat && statusOfLever)) {
      this.clickOnLeverButton();
      browser.pause(1500);
      browser.switchToParentFrame();
      if (this.confirmQueueAlertBtn.isDisplayed()) {
        this.confirmQueueAlertBtn.click();
      }
    }
  }

  /**
   * acceptLiveChat() accepts the incoming chat request
   */
  acceptLiveChat() {
    browser.pause(1000);
    this.selectIFrame(this.liveChatRequestIframeId);
    this.countdownText.waitForDisplayed();
    const windowsList = browser.getWindowHandles();

    this.acceptBtn.click();
    browser.pause(500);

    this.chatRepWindowId = this.getWindowIdFromNewWindow(windowsList);
    browser.switchToWindow(this.chatRepWindowId);
  }

  /**
   * chatIsAvailable() returns if the rep available for chat on the sidebar itself
   * @return {boolean} availability of rep
   */
  chatIsAvailable() {
    return (this.chatAvailable.isDisplayed());
  }

  /**
   * clickAddButtonProdLib - click on add button to send prod to customer
   */
  clickAddButtonProdLib() {
    this.productAddIcon.waitForDisplayed();
    this.productAddIcon.click();
  }
}
module.exports = new ChatAvailabilityPage();

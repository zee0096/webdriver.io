const config = require('config');
const BackofficePage = require('../backoffice.page');

/**
 * ChatTimeout Class page
 * // FIXME to be reevaluated after finsith the timeout tests
 * @class ChatTimeout
 * @classdesc Library
 * @extends BackofficePage
 */

class ChatTimeoutPage extends BackofficePage {
  /**
   *Creates an instance of ChatTimeout
   * @constructor
   */
  constructor() {
    super();
    this.title = 'ChatTimeout class';
  }

  /** @type {(broadcast|queue)} */
  get chatMode() { return config.get('chatMode'); }

  /** @type {cssSelectorObj} */
  get emailPage() { return $('div.service-ctn.ask-question-ctn.global-services__wrapper'); }

  /** @type {cssSelectorObj} */
  get redirectLink() { return $('a.chat-window__options__link.js-chat-redirect'); }

  /** get IdFrame of Live Chat
   * @type {cssSelectorTxt} */
  get liveChatRequestIframeId() { return 'iframe[id="sf-notification-companion"]'; }

  /**
   * getChatTimeout() get chat timeout
   * @return {number} - seconds chat countdown starts with
   */
  getChatTimeout(chatPageFrom) {
    if (this.chatMode === 'broadcast' || chatPageFrom === 'sb' || chatPageFrom === 'sidebar') {
      return 60;
    }
    return 120; // For queue mode
  }

  /**
   * getLinkTimeout() get chat timeout
   * @return {number} seconds chat redirect link to be visible
   */
  getLinkTimeout() {
    return 30;
  }

  /**
   * getCountdownValue() get countdown time value in seconds
   * from incoming chat request (lever)
   * @return {number} the first countdown text value that was captured
   */
  getCountdownValue() {
    this.selectIFrame(this.liveChatRequestIframeId);

    this.countdownText.waitForDisplayed();
    const timeValue = this.countdownText.getText();
    return (parseInt(timeValue.match(/\d+/g), 10));
  }

  /**
   * waitRequestChatTimeoutIn() wait the request chat message is not displayed (timeout) after X seconds
   * @param {number} seconds - time to wait the time out
   */
  waitRequestChatTimeoutIn(seconds) {
    this.selectIFrame(this.liveChatRequestIframeId);

    this.countdownText.waitForDisplayed({ timeout : seconds * 1000, reverse : true, interval : 1000 });
  }
}

module.exports = new ChatTimeoutPage();

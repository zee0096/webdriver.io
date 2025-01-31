const MessageCenterClass = require('./messagecenter.class');

/**
 * MessagePage Class page
 *
 * @class MessagePage
 * @classdesc message page class from /backoffice/messagecenter folder
 * @extends MessageCenterClass
 */
class MessagePage extends MessageCenterClass {
  /**
   *Creates an instance of NEW Back Office Page.
   * @constructor
   */
  constructor() {
    super();

    /**
     * possibles options in filtered dropdown field in message tab
     * @property {('allMessages'| 'read'| 'unread')} filterMsgOpts
     */
    this.filterMsgOpts = {
      allMessages : 'All Messages',
      read        : 'read',
      unread      : 'unread',
    };
    /**
     * possibles options in filtered dropdown field in message tab
     * @property {('Inbox'| 'Sent'| 'Archived' | 'Trash')} msgLeftMenuOpts
     */
    this.msgLeftMenuOpts = {
      Inbox    : 'Inbox',
      Sent     : 'Sent',
      Archived : 'Archived',
      Trash    : 'Trash',
    };
  }

  /**  @type {cssSelectorObj}
   * @deprecated moved to backofficelib
   */
  get messageMenu() { return $('=Message Centre'); }

  /**  @type {cssSelectorObj}
   * @deprecated moved to backofficelib
   */
  get myMessageMenu() { return $('=My Messages'); }

  // about list of messages
  /**  list all messages displayed
   * @type {cssSelectorArr} */
  get messageLink() { return $$('li.message-item.ng-scope'); }

  /**  list all UNREAD messages displayed
   * @type {cssSelectorArr} */
  // get messageLinkUnread() { return $$('li.message-item.unread:not(.ng-hide)'); }
  get messageLinkUnread() { return $$('li.message-item.ng-scope.unread'); }

  /**  list of READ messages displayed
   * @type {cssSelectorArr} */
  get messageLinkRead() { return $$('li.message-item.ng-scope:not(.unread)'); }

  /**  @type {cssSelectorArr} */
  get messageAllCheckbox() { return $$('i.icon-checkbox'); }

  /**  @type {cssSelectorObj} */
  get archivedButton() { return $('[ng-click="changeMessagesCategory(\'archive\')"]'); }

  // get archivedButton()       { return $('li span.message-actions a:nth-child(3)'); }
  /**  @type {cssSelectorObj} */
  get deleteButton() { return $('a[ng-click="changeMessageCategory(\'trash\', message.threadId)"]'); }

  /**  @type {cssSelectorObj} */
  get resolvedFilterLink() { return $('[ng-class="{active: isResolved()}"]'); }

  /**  @type {cssSelectorObj} */
  get markUnreadButton() { return $('a[ng-click="changeMessagesStatus(\'unread\')"]'); }

  /**  @type {cssSelectorObj} */
  get markReadButton() { return $('a[ng-click="changeMessagesStatus(\'read\')"]'); }

  /**  @type {cssSelectorObj} */
  get messageFilter() { return $('ul.contact-group-select.store.ng-scope'); }

  /**  @type {cssSelectorObj} */
  get readFilter() { return $('[ng-click="getRead()"]'); }

  /**  @type {cssSelectorObj} */
  get unreadFilter() { return $('[ng-click="getUnread()"]'); }

  /**  @type {cssSelectorObj} */
  get allMessagesFilter() { return $('[ng-click="getAllMessages()"]'); }

  /**  @type {cssSelectorObj} */
  get customerRequestsPersonalShopperEntry() { return $('a.href'); }

  /**  @type {cssSelectorObj} */
  get nextPageBtn() { return $('[ng-class="{disabled: noNext(), next: align}"]'); }

  /**  @type {cssSelectorObj} */
  get previousPageBtn() { return $('[ng-class="{disabled: noPrevious(), previous: align}"]'); }

  /**  @type {cssSelectorArr} */
  get messageSubject() { return $$('span.message-subject a'); }

  /**  @type {cssSelectorObj} */
  get sentFilter() { return $('[ng-class="{active: isSent()}"]'); }

  /**  @type {cssSelectorObj} */
  get firstMessageCheckBox() { return $('i.icon-checkbox'); }

  /**  @type {cssSelectorObj} */
  get spinner() { return $('ul.item-sections.list-messages[ng-show="fetching"] > li.loading-spin'); }

  /**  @type {cssSelectorObj} */
  get closeNotification() { return $('a.jsCloseNotification'); }

  /**  Inbox option on left column
   * @type {cssSelectorObj} */
  get inboxOpt() { return $('=Inbox'); }

  /**  sent option on left column
   * @type {cssSelectorObj} */
  get sentOpt() { return $('=Sent'); }

  /**  archived option on left column
   * @type {cssSelectorObj} */
  get archivedOpt() { return $('=Archived'); }

  /**  trash option on left column
    * @type {cssSelectorObj} */
  get trashOpt() { return $('=Trash'); }

  /**  hasMoreThanOnePage - Check if has more than 10 msg in total pagination
   * @returns {boolean}
   */
  get hasMoreThanOnePage() {
    return (this.totalOfMessagesInPagination() > 10);
  }

  /**
   * applyFilter() applies the message filter for Inbox
   *
   * @param {String} type can be 'read', 'unread' or 'all' (default)
   */
  applyFilter(type) {
    this.messageFilter.waitForDisplayed();
    // click on dropdown button to display the options
    this.messageFilter.click();
    this.allMessagesFilter.waitForDisplayed();
    switch (type) {
      case this.filterMsgOpts.read:
        this.readFilter.click();
        break;

      case this.filterMsgOpts.unread:
        this.unreadFilter.click();
        break;

      default:
        this.allMessagesFilter.click();
        break;
    }
    this.waitForLoadingIconDisappear();
    browser.pause(2500);
  }

  /**
   * waitForLoading() waits for the "loading" spinner to go away
   */
  waitForLoading() {
    browser.pause(500);
    // FIXME to be reviewd why we need an super here and after wait for display
    super.waitForLoadingIconDisappear();
    this.spinner.waitForDisplayed({
      timeout    : 20000,
      reverse    : true,
      timeoutMsg : 'Timeout - The spinning image is displayed more than 20s and the page wasn\'t loaded',
    });
    browser.pause(600);
  }

  /**
   * msgLeftMenuOption select a option in left menu of message Tab
   *
   * @param {msgLeftMenuOpts} opt
   * @returns {boolean} if the URL changes when the option is clicked
   */
  msgLeftMenuOption(opt) {
    let partialUrl;
    switch (opt) {
      case this.msgLeftMenuOpts.Inbox:
        $('=Inbox').click();
        partialUrl = '/messages/inbox';
        break;

      case this.msgLeftMenuOpts.Sent:
        $('=Sent').click();
        partialUrl = '/messages/sent';
        break;

      case this.msgLeftMenuOpts.Archived:
        $('=Archived').click();
        partialUrl = '/messages/archive';
        break;

      case this.msgLeftMenuOpts.Trash:
        $('=Trash').click();
        this.waitForLoadingIconDisappear();
        partialUrl = '/messages/trash';
        break;

      default:
        break;
    }
    return (partialUrl);
  }

  /**
   * move message to Archive or trash
   *
   * @param {('Archived' | 'Trash')} opt
   * @returns {boolean} show sucess message or not
   */
  moveMessageTo(opt) {
    this.waitForLoadingIconDisappear();
    if (this.messageLink.length > 0) {
      this.firstMessageCheckBox.click();
      if (opt === this.msgLeftMenuOpts.Archived) {
        this.archivedButton.click();
      } else if (opt === this.msgLeftMenuOpts.Trash) {
        this.deleteButton.click();
        browser.alertAccept();
      }
      this.ajaxNotif.waitForDisplayed({ timeout : 10000 });
      const msgNotification = this.ajaxNotif.getText();
      this.closeNotification.click();
      if (opt === this.msgLeftMenuOpts.Archived) {
        return msgNotification === 'Messages were moved to archive';
      // eslint-disable-next-line no-else-return
      } else if (opt === this.msgLeftMenuOpts.Trash) {
        return (msgNotification === 'Message was moved to trash');
      }
    }
    return (true);
  }

  checkFirstMsg() {
    if (this.messageLink.length > 0) {
      this.firstMessageCheckBox.waitForEnabled();
      this.firstMessageCheckBox.click();
    }
  }

  /**
   * MessagePagening click on next and previous button and return if the page was changed
   *
   * @param {('Next' | 'Previous')} opt
   * @returns {boolean} the pagination was increased/decreased
   */
  MessagePagening(opt) {
    // get the text
    const currentPage = this.takeStartNumber();
    // click on next/previous page
    if (opt === 'Next') {
      this.clickOnNextPageBtn();
    } else {
      this.clickOnPreviousPageBtn();
    }
    this.waitForLoadingIconDisappear();
    const newPage = this.takeStartNumber();

    if (opt === 'Next') {
      return currentPage < newPage;
    }
    return currentPage > newPage;
  }

  /**
   * return the msg displayed on ajax notification
   *
   * @returns {string} Ajax Message
   */
  getAjaxMsg() {
    this.ajaxNotif.waitForDisplayed({ timeout : 15000 });
    const msgNotification = this.ajaxNotif.getText();
    this.closeNotification.click();
    return msgNotification;
  }

  /**
   * click on inbox option on left column in message tab
   */
  clickOnInboxOpt() {
    this.inboxOpt.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * click on sent option on left column in message tab
   */
  clickOnSentOpt() {
    this.sentOpt.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * click on archived option on left column in message tab
   */
  clickOnArchivedOpt() {
    this.archivedOpt.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * click on trash option on left column in message tab
   */
  clickOnTrashOpt() {
    this.trashOpt.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * click on next page button in message tab
   */
  clickOnNextPageBtn() {
    this.nextPageBtn.click();
    this.waitForLoadingIconDisappear(8000);
  }

  /**
   * click on previous page button in message tab
   */
  clickOnPreviousPageBtn() {
    this.previousPageBtn.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * clickOnMarkReadLnk - click on Mark Read link, the all messages checked will have read status
   */
  clickOnMarkReadLnk() {
    this.markReadButton.moveTo();
    this.markReadButton.click();
    // the message center has performance issue, then it is necessary add pause
    // eslint-disable-next-line wdio/no-pause
    browser.pause(5000);
  }

  /**
   * clickOnMarkUnreadLnk - click on Mark unread link, the all messages checked will have unread status
   */
  clickOnMarkUnreadLnk() {
    this.markUnreadButton.moveTo();
    this.markUnreadButton.click();
    // the message center has performance issue, then it is necessary add pause
    // eslint-disable-next-line wdio/no-pause
    browser.pause(4000);
  }
}
module.exports = new MessagePage();

const MessageCenterClass = require('./messagecenter.class');
/**
 * RequestsPage Class page
 *
 * @class RequestsPage
 * @classdesc Library of backoffice page
 * @extends MessageCenterClass
 */
class CustomerRequestsPage extends MessageCenterClass {
  #newAppntWindowId;

  #initialAppntDate;

  /**
   *Creates an instance of NEW Requests Page.
   * @constructor
   */
  constructor() {
    super();

    /** New status means read and unread new requests
     * @type {object} customerReqStatuses
     * @property {string} New='New'
     * @property {string} NewRead='NewRead'
     * @property {string} NewUnread='NewUnread'
     * @property {string} Pending='Pending'
     * @property {string} Confirmed='Confirmed'
     */
    this.customerReqStatuses = {
      New       : 'New',
      NewRead   : 'NewRead',
      NewUnread : 'NewUnread',
      Pending   : 'Pending',
      Confirmed : 'Confirmed',
    };

    /** threadFilters - possible filters of thread
     * @type {object} threadFilters
     * @property {string} Reply='Replay'
     * @property {string} AcceptAppt='AcceptAppt'
     * @property {string} NewAppt='NewAppt'
     * @property {string} Note='Note'
     * @property {string} CustomerService='CustomerService'
     * @property {string} Question='Question'
     * @property {string} MarkResolved='MarkResolved'
     */
    this.threadFilters = {
      Reply           : 'Reply',
      AcceptAppt      : 'AcceptAppt',
      NewAppt         : 'NewAppt',
      Note            : 'Note',
      CustomerService : 'CustomerService',
      Question        : 'Question',
      MarkResolved    : 'MarkResolved',
    };
  }

  /** Next page button on the top
   *  @type {cssSelectorObj} */
  get nextPagination() { return $('section.sales-pagination:not(.down) li.next a'); }

  /** Next page button Disabled on the top
   *  @type {boolean} */
  get nextPageBtnEnable() { return $$('li.next:not(.disabled)').length > 0; }

  /** Appointment date field in suggest new appointment time page
   *  @type {cssSelectorObj} */
  get apptDate() { return $('#choosenDatePlaceholder'); }

  /** Appointment page - Suggest new time button
   *  @type {cssSelectorObj} */
  get suggestNewTimeBtn() { return $('footer button'); }

  /** Send button in Thread section
   *  @type {cssSelectorObj} */
  get threadSendBtn() { return $('section.content-section:not(.ng-hide) div.request-btn-bar a.send-message:not(.ng-hide)'); }

  /** To field (customer's email) in Thread section
   *  @type {cssSelectorObj} */
  get emailField() { return $('section.content-section:not(.ng-hide) input.send-to-customer[ng-model="emailsToHolder"]'); }

  /** Ok Button of forwarded to Customer service popup window
   *  @type {cssSelectorObj} */
  get okBtnForwardCs() { return $('button.btn.bo-btn-type-1'); }

  /** @type {cssSelectorArr} */
  get pagePagination() { return $$('section.sales-pagination span')[0]; }

  /** @type {cssSelectorObj} */
  get requestDropdown() { return $('li.first'); }

  /** @type {cssSelectorObj} */
  get resolvedButton() { return $('[ng-click="markStoreThread(\'resolved\', storeThreadRequest.typeOfMessage + \'_\' + storeThreadRequest.requestId)"]'); }

  /** @type {cssSelectorObj} */
  get replyTextarea() { return $('section[ng-show="isStoreThread()"] > message-thread > section > send-mail > span.item-sections.compose-field > div > textarea'); }

  /** @type {cssSelectorObj} */
  get spinner() { return $('section.content section:not(.ng-hide) li.loading-spin'); }

  /** @type {cssSelectorObj} */
  get nextMonthButton() { return $('span.ui-icon.ui-icon-circle-triangle-e'); }

  /** @type {cssSelectorArr} */
  get daysInCalendar() { return $$('a.ui-state-default'); }

  /**
   * Confirm button from customer request Tab
   @type {cssSelectorObj} */
  get acceptBtn() { return $('.rep-btn-primary-customer-request[ng-click=\'acceptAppointment(storeThreadRequest)\']'); }

  /** @type {cssSelectorObj} */
  get jsAjaxNotification() { return $('span.sf-ajax-action.jsAjaxNotification'); }

  /**
    * Close msg from ajax notification
    *  @type {cssSelectorObj} */
  get jsAjaxCloseNotif() { return $('a.jsCloseNotification'); }

  /** @type {cssSelectorObj} */
  get noteTextarea() { return $('section[ng-show="isStoreThread()"] > message-thread > span > add-note > div > textarea'); }

  // buttons availables on appointment request
  /** @type {cssSelectorObj} */
  get replyButton() { return $('[ng-click="composeInThread(threadOwner.ID, threadOwner)"]'); }

  /** @type {cssSelectorObj} */
  get newTimeButton() { return $('a[ng-click="suggestNewAppointment(storeThreadRequest)"]'); }

  /** @type {cssSelectorObj} */
  get addNoteButton() { return $('[ng-click="addNote()"]'); }

  /** @type {cssSelectorObj} */
  get saveNoteButton() { return $('[ng-click="submitNote(storeThreadRequest.typeOfMessage + \'_\' + storeThreadRequest.requestId)"]'); }

  /** @type {cssSelectorObj} */
  get cSButton() { return $('a[ng-click="confirmForwardCustomerService();"]'); }

  /** @type {cssSelectorObj} */
  get unresolvedFilter() { return $('.side-menu a[ng-class=\'{active: isUnresolved()}\']'); }

  /**
   * customer request status is New and newUnread have the same selector
   *  @type {cssSelectorArr} */
  get newCustomerReqStatus() { return $$('ul.list-messages li.unread'); }

  /**
   * customer request status is NewRead
   *  @type {cssSelectorArr} */
  get newReadCustomerReqStatus() { return $$('ul.list-messages li:not(.unread)'); }

  /**
   * Customer Request Tab
   *  @type {cssSelectorObj} */
  get CustomerRequestTab() { return $('li#store_request-tab'); }

  /**
   * setNewAppntWindowId settter of new Appointment Window Id
   *  */
  set setNewAppntWindowId(windowId) {
    this.#newAppntWindowId = windowId;
  }

  /**
   * Customer Request Tab
   *  @type {cssSelectorObj} */
  get getNewAppntWindowId() { return this.#newAppntWindowId; }

  /**
   * newSuggestionTimeSucessMsg
   * @type {cssSelectorObj}
   */
  get newSuggestionTimeSucessMsg() { return $('div.fn-result-message div.proper-icon-checkmark'); }

  /**
   * getInitialAppntDateTime
   */
  get getInitialAppntDate() { return this.#initialAppntDate; }

  set setInitialAppntDate(dateTime) {
    if (!dateTime) {
      this.#initialAppntDate = this.appntDateTxt;
    } else {
      this.#initialAppntDate = dateTime;
    }
  }

  /**
   * appntDateTxt - value displayed on Appointment Date
   * @type {cssSelectorObj}
   */
  get appntDateTxt() { return ($('div[ng-show="storeThreadRequest.dateOfAppointment"] span.ng-binding').getText()); }

  /**
   * The "accepted" message is displayed in Thread when the user click on Confirm Button
   * @type {cssSelectorObj}
   */
  get acceptedMsgInThread() { return $('span:not(.ng-hide)[ng-show="message.content == 4"]'); }

  /**
   * The "accepted" message is diplayed in Thread when the user click on Replay Button
   * @type {cssSelectorArr}
   */
  get hasRepliedMsgInThread() { return ($$('span:not(.ng-hide)[ng-show*="message.category == \'sent\'"]').length === 1); }

  /**
   * The "customer service" message is diplayed in Thread when the user click Customer Service Button
   * @type {cssSelectorArr}
   */
  get hasCustomerServiceMsgInThread() { return ($$('section:not(.ng-hide) span:not(.ng-hide)[ng-show="message.content == 23"]').length === 1); }

  /**
   * The "added" message is diplayed in Thread when the user click on add note Button
   * @type {cssSelectorArr}
   */
  get hasNoteMsgInThread() { return ($$('span:not(.ng-hide)[ng-show="message.typeOfMessage == \'private\'"]').length > 0); }

  // customer requst status selctors - END

  /**
   * waits for the "loading" spinner to go away
   */
  waitForLoading() {
    this.spinner.waitForDisplayed({ timeout : 15000, reverse : true });
  }

  /**
   * filterRequests() filters the customer requests screen in the BO by specified request type
   * @param {('getAllStoreRequests()'| 'getAppointments()' | 'getPersonalShoppers()'
   * | 'getQuestions()')} requestType filter by option received/selected
   */
  filterRequests(requestType) {
    // we have to do that for number pages to be reset, and to see requests from the 1rst page
    browser.refresh();
    this.waitForLoadingIconDisappear();
    this.requestDropdown.waitForDisplayed();
    this.requestDropdown.click();
    $(`[ng-click='${requestType}']`).click();
    this.pagePagination.waitForDisplayed();
    browser.pause(1000);
  }

  /**
   * clickOnUnresolvedMenu() Click on Unresolved option in left menu
   * and wait to load the result page
   */
  clickOnUnresolvedMenu() {
    if (this.jsAjaxNotification.isDisplayed()) {
      this.jsAjaxCloseNotif.click();
      browser.pause(3000);
    }

    this.unresolvedFilter.waitForEnabled({ timeout : 3000, timeoutMsg : 'The unresolved filter is not enable after 3s' });
    if (!this.unresolvedFilter.isDisplayedInViewport()) {
      this.unresolvedFilter.moveTo();
    }
    this.unresolvedFilter.click();
    this.pagePagination.waitForDisplayed();
  }

  /**
   * requestIsMarkedAsRead() verifies that the specified request (by ID) is marked as "read"
   * @param {string} id the ID of the request
   * @return {boolean} true is the request is marked as read, false if still unread
   */
  requestIsMarkedAsRead(id) {
    if (this.lookingForIdOnPages(id)) {
      return !$(`li#${id}.unread`).isExisting();
    }
    return false;
  }

  /**
   * requestIsMarkedAsRead() verifies that the specified request (by ID) is marked as "read"
   * @param {string} id the ID of the request
   * @return {boolean} true is the request is marked as read, false if still unread
   */
  lookingForIdOnPages(id) {
    let desiredElement = $(`li#${id}`);

    while (!desiredElement.isExisting() && this.nextPagination.isDisplayed()) {
      this.nextPagination.click();
      this.waitForLoadingIconDisappear();
      browser.pause(500);
      desiredElement = $(`li#${id}`);
    }

    return desiredElement.isExisting();
  }

  /**
   * customerReqByStatus - filter the requests with status received
   * @param {('New'|'NewRead'|'NewUnread'|'Pending'|'Confirmed')} status should be one of this.customerReqStatuses.status options
   * @returns {cssSelectorArr}
   */
  customerReqByStatus(status) {
    let statusFilter;

    switch (status) {
      // new and newunread have the same selector
      case this.customerReqStatuses.New:
      case this.customerReqStatuses.NewUnread:
        statusFilter = 'ul.list-messages li.unread';
        break;

      case this.customerReqStatuses.NewRead:
        statusFilter = 'ul.list-messages li:not(.unread)';
        break;

      case this.customerReqStatuses.Pending:
        statusFilter = 'span.status--is-pending';
        break;

      case this.customerReqStatuses.Confirmed:
        statusFilter = 'span.status--is-confirmed';
        break;

      default:
        break;
    }
    return ($$(statusFilter));
  }

  /**
   * findRequestID returns the request ID when the request used customerReqByStatus function
   * run the browser.execute to find the id inside offsetParent, where wdio can not reach it
   * @param {object} status filtered by Status
   * @returns {string} RequestID
   */
  findRequestId(status) {
    let selector;
    if (status === this.customerReqStatuses.New || status === this.customerReqStatuses.NewUnread) {
      selector = this.newCustomerReqStatus;
    } else if (status === this.customerReqStatuses.NewRead) {
      selector = this.newReadCustomerReqStatus;
    } else {
      throw new Error('Request Status doesn\'t exit');
    }
    return selector[0].getAttribute('id');
  }

  /**
   * filter the customer request by a specif filter
   * @param {string} status status of request
   * @returns {boolean}
   */
  pageWithStatusFilteredBy(status) {
    let filterResult = this.customerReqByStatus(status);
    while (filterResult.length === 0 && this.nextPageBtnEnable) {
      // next page until find the status or no more page available
      this.nextPagination.click();
      browser.pause(1000);
      // timeout necessasry because the page takes time load
      this.pagePagination.waitForDisplayed({ timeout : 6000 });
      filterResult = this.customerReqByStatus(status);
    }
    return filterResult.length > 0;
  }

  /**
   * openRequestID click on a request ID
   * @param {string} reqID
   * @memberof RequestsPage
   */
  openRequestId(reqID) {
    $(`#${reqID} a`).waitForDisplayed();
    $(`#${reqID} a`).click();
    this.replyButton.waitForDisplayed();
  }

  /**
   * clickOnCustomerRequestTab() in Customer request option/page
   */
  clickOnCustomerRequestTab() {
    this.CustomerRequestTab.waitForClickable({
      timeout    : 3000,
      timeoutMsg : 'Customer Request tab is not clickable after 3s'
    });
    this.CustomerRequestTab.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * clickOnNewTimeBtn() availabe into request in customer request tab
   */
  clickOnNewTimeBtn() {
    this.newTimeButton.click();
    browser.pause(3000);
    this.setNewAppntWindowId = this.getWindowIdFromNewWindow();
    browser.switchToWindow(this.getNewAppntWindowId);
    this.apptDate.waitForDisplayed({ timeout : 2000 });
  }

  /**
   * updateDateDtp
   */
  updateDateDtp() {
    this.apptDate.click();
    this.nextMonthButton.waitForDisplayed();
    this.nextMonthButton.click();
    this.daysInCalendar[this.daysInCalendar.length - 1].click();
    browser.pause(1000);
  }

  /**
   * clickOnSuggestNewTimeBtn
   */
  clickOnSuggestNewTimeBtn() {
    this.suggestNewTimeBtn.click();
    browser.pause(1000);
  }

  /**
   * closeNewAppntWindow
   */
  closeNewAppntWindow() {
    browser.closeWindow();
    browser.pause(1000);
  }

  /**
   * clickOnAcceptAppntBtn
   */
  clickOnAcceptAppntBtn() {
    this.acceptBtn.waitForDisplayed();
    this.acceptBtn.click();
    browser.pause(2000);
  }

  /**
   * clickOn on replay button then automatically shows sent msg in thread
   */
  clickOnConfirmBtn() {
    this.replyButton.waitForDisplayed();
    this.replyButton.click();
    this.replyTextarea.setValue('This is reply content');
    browser.waitUntil(() => this.emailField.getValue().length > 0, 20000, 'The email field was not loaded');
    this.threadSendBtn.click();
    // sending msg takes time to display the sucess msg, then pause in necessary
    browser.pause(3000);
  }

  /**
   * clickOn on clickOnCustomerServiceBtn
   */
  clickOnCustomerServiceBtn() {
    this.cSButton.waitForDisplayed();
    this.cSButton.click();
    this.okBtnForwardCs.waitForDisplayed();
    this.okBtnForwardCs.click();
    browser.pause(500);
    // the fowarded request thread is displayed only after refresh
    browser.refresh();
    browser.pause(2000);
  }

  /**
   * clickOnMarkResolvedBtn
   */
  clickOnMarkResolvedBtn() {
    this.resolvedButton.waitForDisplayed();
    this.resolvedButton.click();
  }

  /**
   * clickOnNoteBtn
   */
  clickOnNoteBtn() {
    this.addNoteButton.waitForDisplayed();
    this.addNoteButton.click();
    this.noteTextarea.waitForDisplayed();
    this.noteTextarea.setValue('This is test note.');
    this.saveNoteButton.click();
    // pause mandatory to update the thread msgs
    browser.pause(1000);
  }
}
module.exports = new CustomerRequestsPage();

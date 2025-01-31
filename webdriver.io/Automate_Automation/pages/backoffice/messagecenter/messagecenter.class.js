const config = require('config');

const Backoffice = require('../../backoffice.page');
/**
 * MessageCenter Class page
 *
 * @class
 * @classdesc Generic class for functionalites shared for manu page files only in messagecenter folder
 * @extends Backoffice
 */
class MessageCenterClass extends Backoffice {
  /**
   * Edit products from Home page in different sections (top picks, new arrivals )
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**  Notification text
   * @type {cssSelectorObj} */
  get ajaxNotif() { return $('span.jsAjaxNotification'); }

  /** @type {boolean} */
  get hasMessageCenter() { return config.get('bo.homeTabs.messageCenter'); }

  /** @type {cssSelectorObj} */
  get pagination() { return $('span.item-sections section.sales-pagination>span:not(.ng-hide)'); }


  // /** find the counters of page displayed
  //  * @example 1 - 10 of 333
  //  * @returns {String} Return the counts string on the page */
  // get counterOfMessages() {
  //   return $$('section.sales-pagination span.ng-binding:not(.ng-hide)')[0].getText();
  // }

  /** return the pagination text
   * @example 11 - 20 of 367
   * @type {cssSelectorObj} */
  get paginationText() {
    if (this.pagination.isDisplayed()) {
      return this.pagination.getText();
    }
    return '';
  }

  /** return if pagination text is displayed
   * @returns {boolean} the current page shows pagination displayed */
  get hasPaginationDisplayed() { return this.paginationText !== ''; }

  /**
   * takeStartNumber take the first numeral into a string and converto to integer.
   * Used to take the first number of pagination
   * ex. 1 - 10 of 367 -> return 1
   *
   * @returns {integer} number
   */
  takeStartNumber() {
    const summaryPagination = this.paginationText;
    return parseInt(summaryPagination.substring(0, summaryPagination.indexOf(' ')), 10);
  }

  /** Return the total of lines displayed on the page
   * @example 1 - 10 of 333 -> return 10
   * @returns {Number} total of lines displayed */
  totalOfLines() {
    if (this.paginationText.length > 5) {
      // the space before the number is mandatory to find the total of displayed lines.
      const regex = / [0-9]{1,3}/;
      const totalOfLines = this.paginationText.match(regex).toString();
      return (Number.parseInt(totalOfLines, 10));
    }
    return 0;
  }

  /**
   * totalOfMessagesInPagination take the pagination as input.
   * Used to take the all messages in pagination number of pagination
   * ex. 1 - 10 of 367 -> return 367
   *
   * @returns {integer} number Zero when the pagination is not displayed
   */
  totalOfMessagesInPagination() {
    // eslint-disable-next-line radix
    // TODO Is regex a better option? to be evaluated
    const summaryPagination = this.paginationText;
    if (summaryPagination.length > 5) {
      return parseInt(summaryPagination.substring(summaryPagination.lastIndexOf('f') + 1), 10);
    }

    // no text on sumaryPagination
    return 0;
  }
}

module.exports = MessageCenterClass;

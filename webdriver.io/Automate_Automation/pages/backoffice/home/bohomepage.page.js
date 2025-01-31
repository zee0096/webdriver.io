const { BADGES } = require('../../../lib/defaultconstantslib');
const Backoffice = require('../../backoffice.page');

/**
 * Class BoMainPage
 *
 * @class BoMainPage
 * @classdesc Main page of backoffice page
 * @extends BackOfficePage
 */
class BoHomePagePage extends Backoffice {
  /** Create a Page instance -  This is the main library of the system
   * @constructor Page
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.initialPsCount = '';
  }

  /** css to find the total of notifications displayed on the top of icons
   * @type {cssSelectorObj} */
  get notificationsTotal() { return $('span.fn-notifications-total'); }

  /** Customer Request & messages area (where display the total of badgets)
   * @type {cssSelectorObj} */
  get custReqMsgArea() { return $('div.notifications-ctn'); }

  /** total of emails displayed on email icon
   * @type {cssSelectorObj} */
  get askBadgeCount() { return $('a.sf-icon-ask > span.fn-notifications-total'); }

  /** total of appoitments displayed on email icon
   * @type {cssSelectorObj} */
  get appntBadgeCount() { return $('a.sf-icon-calendar > span.fn-notifications-total'); }

  /** total of msg displayed on email icon
   * @type {cssSelectorObj} */
  get msgBadgeCount() { return $('a.sf-icon-mail > span.fn-notifications-total'); }

  /** total of personal shopper displayed on email icon
   * @type {cssSelectorObj} */
  get psBadgeCount() { return $('a.sf-icon-bell > span.fn-notifications-total'); }

  /**
   * getInitialValueOfPsCount() gets the value of PS count and update the property
   */
  getInitialValueOfPsCount() {
    this.initialPsCounterValue = this.getBadgeCount(BADGES.ps);
  }

  /**
   * getNewValueOfPsCount() gets the value of PS count and update the property
   */
  getNewValueOfPsCount() {
    this.newPsCounterValue = this.getBadgeCount(BADGES.ps);
  }

  /**
   * getBadgeCount() gets the value of the specified badge and returns its value
   * @param {BADGES} badge
   * @return {string} returns the number of requests
   * as string. If it has values like "1 K" it handles in tests
   */
  getBadgeCount(badge) {
    return this.badgeText(badge);
  }

  /**
   * BADGESText - Return the content of Badge sent by paramenter
   *
   * @param {string} badge name of badge where will be search the text (qty)
   * @returns {string} the content of Badge (usually the qty)
   */
  badgeText(badge) {
    let badgeElement;
    switch (badge) {
      case BADGES.email:
        // the waitForDisplay in necessary because sometimes/retailer takes time to display the total
        if (this.msgBadgeCount.waitForDisplayed(
          { timeout : 2000, timeoutMsg : `${BADGES.email} is not displayed after 2s` }
        )) {
          badgeElement = this.msgBadgeCount.getText();
        }
        break;

      case BADGES.ask:
      case BADGES.contactus:
        if (this.askBadgeCount.waitForDisplayed(
          { timeout : 2000, timeoutMsg : `${BADGES.ask} is not displayed after 2s` }
        )) {
          badgeElement = this.askBadgeCount.getText();
        }
        break;

      case BADGES.appnt:
        if (this.appntBadgeCount.waitForDisplayed(
          { timeout : 2000, timeoutMsg : `${BADGES.appnt} is not displayed after 2s` }
        )) {
          badgeElement = this.appntBadgeCount.getText();
        }
        break;

      case BADGES.ps:
      case BADGES.registryRequest:
        if (this.psBadgeCount.waitForDisplayed(
          { timeout : 2000, timeoutMsg : `${BADGES.ps} is not displayed after 2s` }
        )) {
          badgeElement = this.psBadgeCount.getText();
        }
        break;

      default:
        badgeElement = '0';
        break;
    }
    return badgeElement;
  }
}

module.exports = new BoHomePagePage();

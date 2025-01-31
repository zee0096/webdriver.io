const config = require('config');
const credentials = require('../credentials.json');

const BackofficeLib = require('../lib/backofficelib');

/**
 * Backoffice Class page
 *
 * @class BackOfficePage
 * @classdesc Library of Backoffice page
 * @module credentials
 * @extends BackofficeLib
 */
class BackOfficePage extends BackofficeLib {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**  @type {boolean} */
  get hasCustomerRequestsBadges() { return config.get('bo.customerRequestsBadges'); }

  /**  @type {boolean} */
  get hasProducts() { return config.get('hasProducts'); }

  /**  @type {boolean} */
  get hasAssets() { return config.get('hasAssets'); }

  /** @type {string} */
  get hasCustomerService() { return config.get('customerService'); }

  /* eslint-disable no-multi-spaces */
  /**  @type {cssSelectorObj} */
  get backOfficeProof()         { return $('.my-back-office'); }

  /**  @type {cssSelectorObj} */
  get countdownText()           { return $('div.toast div div p span.notification-btn-countdown'); }

  /**  @type {cssSelectorObj} */
  get acceptBtn()            { return $('button.waves-effect.waves-teal.btn-flat.js-accept-btn'); }

  /**  @type {cssSelectorObj} */
  get corporateTasksMenuOpt()   { return $('a=Corporate Tasks'); }

  /** @type {cssSelectorObj} */
  get sfLogo()                  { return $('div.logo > a[title="Home"] > img'); }

  /** @type {cssSelectorArr} */
  get listOfPrdsProdLib()   { return $$('div.fn-manager-products h1'); }

  // chat customer
  /**  @type {cssSelectorTxt} */
  get custChatSelector()    { return 'div.js-chat-container div.chat-user-ctn'; }

  /**
   * login() login to the backoffice with a specific role
   * @param {roles} role='rep' to use for login.
   *  Changed is
   * for rep with changed password. Username and password come from credentials.json
   * TODO: replaced by getUserCredential and backofficeLogin from Backoffice class LIB
   * @deprecated
   */
  login(role = 'rep') {
    let user;
    let pw = credentials.boOldPassword;
    switch (role) {
      case 'admin':
        user = credentials.boAdminUsername;
        pw = credentials.boAdminPassword;
        break;
      case 'corp_admin':
        user = credentials.boCorpAdminUsername;
        break;
      case 'management':
        user = credentials.boManagementUsername;
        break;
      case 'selling_manager':
        user = credentials.boSellingManagerUsername;
        break;
      case 'nonsell_manager':
        user = credentials.boNonSellManagerUsername;
        break;
      case 'changed':
        user = credentials.boUsername;
        pw = credentials.boChangedPassword;
        break;
      default:
        user = credentials.boUsername;
        pw = credentials.boPassword;
    }
    if (this.isProdEnv || role === 'admin') {
      user = `salesfloor_${user}`;
    }
    // eslint-disable-next-line arrow-body-style
    browser.waitUntil(() => { return this.username.isEnabled(); }, 20000, 'login field not displayed');
    do {
      this.username.setValue(user);
      this.password.setValue(pw);
    } while (this.username.getValue() !== user || this.password.getValue() !== pw);
    this.submitButton.click();
  }

  /**
   * go() is a helper method to quickly move to the different backoffice pages without using the UI
   * @param {string} url to load (include the / and backoffice, if required)
   */
  go(url) {
    browser.url(`${this.getBackofficeUrl}${url}`);
  }

  /**
   * switchToHelpCenterWindow() Switch to zendesk page when the Help Center was clicked
   */
  switchToHelpCenterWindow() {
    browser.switchToWindow(this.helpCenterWindowId);
  }
}

module.exports = BackOfficePage;

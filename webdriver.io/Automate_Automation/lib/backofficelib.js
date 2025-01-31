const Page = require('../pages/page');
const credentials = require('../credentials');

/**
 * Class BackofficeLib
 *
 * @class BackofficeLib
 * @classdesc Main class to access the backoffice page
 * @module credentials
 * @extends Page
 */
class BackofficeLib extends Page {
   #boWindowId;

  /** Create a BackofficeLib
   * @constructor
   */
  constructor() {
    super();
    /**
     * @property {string} #boWindowId
     * @private
     */
    this.#boWindowId = '';

    /**
     * @property {string} boIframeId
     */
    this.boIframeId = '';

    /**
     * @property {string} chatRepWindowId
     */
     this.chatRepWindowId = '';

    /**
     * @property {string} liveChatFrom
     */
     this.liveChatFrom = '';

    /**
     * @property {object} ROLE
     * @constant
     */
     this.ROLE = {
      admin           : 'admin',
      corp_admin      : 'corp_admin',
      management      : 'management',
      selling_manager : 'selling_manager',
      nonsell_manager : 'nonsell_manager',
      rep             : 'rep',
      changed         : 'changed',
    };
  }

  /** @type {cssSelectorObj} */
  get username() { return $('#sf-user-login'); }

  /**  @type {cssSelectorObj} */
  get password() { return $('#sf-user-pass'); }

  /**  @type {cssSelectorObj} */
  get submitButton() { return $('#wp-submit'); }

  /**  @type {cssSelectorObj} */
  get invalidMsgSel() { return $('#sf-login-error'); }

  // main menu
  /**  New leads menu option
   * @type {cssSelectorObj} */
  get newLeadsMnu() { return $("li a[href='/backoffice/new-leads']"); }

  /**  Reports menu option
   * @type {cssSelectorObj} */
  get reportsMnu() { return $('nav ul li a[href*=reports]'); }

  /**  @type {cssSelectorObj} */
  get accountSettingsMenu() { return $('li.last > a'); }

  /**  @type {cssSelectorObj} */
  get signOutLink() { return $('#btn-signout'); }

  /**  @type {cssSelectorObj} */
  get viewStorefrontLink() { return $('*=View'); }

  /**  @type {cssSelectorObj} */
  get messageCenterMnu() { return $('a=Message centre'); }

  /**  @type {cssSelectorObj} */
  get composeMessageOpt() { return $('a[href="/backoffice/store-request-center#messages/compose"]'); }

  /**  @type {cssSelectorObj} */
  get myMessageMenu() { return $('=My Messages'); }

  /**  @type {cssSelectorObj} */
  get customerRequestOpt() { return $('=Customer Requests'); }

  /**  @type {cssSelectorObj} */
  get corporateTasksMnu() { return $('a=Corporate Tasks'); }

  /**  @type {cssSelectorObj} */
  get settingsOpt() { return $('a=Settings'); }

  /**  @type {cssSelectorObj} */
  get logoutLink() { return $('=log out'); }

  /**  getBoWindowId return the backoffice window ID
   * @type {String} */
  get getBoWindowId() { return this.#boWindowId; }

  /** set the backoffice window ID
   * @type {String} */
  set setBoWindowId(windowId) { this.#boWindowId = windowId; }

  /**
   * Account & Settings -> User Management
   * @type {cssSelectorObj} */
  get userManagementLnk() { return $('a*=User'); }

  // prod lib
  /**  @type {cssSelectorArr} */
  get productCheckIcon() { return $$('div.btn-bar.btn-bar-type-4.selectable-ctn label i.icon-check'); }

  /** @type {cssSelectorArr} */
  get productAddName() { return $$('article.box.box-type-3.fn-product-item div.box-wrapper div.content-ctn.fn-content header.fn-selectable-container-trigger h1'); }

  /** @type {cssSelectorArr} */
  get productAddBrandName() { return $$('article.box.box-type-3.fn-product-item div.box-wrapper div.content-ctn.fn-content header.fn-selectable-container-trigger h1 em'); }

  /** @type {cssSelectorObj} */
  get productAddIcon() { return $('.btn.bo-btn.bo-btn-type-1.fn-trigger-save'); }

  /**  @type {cssSelectorObj} */
  get ajaxMessageNotification() { return $('span.sf-ajax-action.undefined.jsAjaxNotification'); }

  /**  @type {cssSelectorObj} */
  get helpCenter() { return $('li.last > ul a[href^="https://salesfloor.zendesk.com"]'); }

  /**
   * get credentials for a specific role
   * @param {roles} [role='rep'] role to use for login page.
   */
  getUserCredential(role = 'rep') {
    const userCredential = { password : credentials.boOldPassword };
    switch (role) {
      case this.ROLE.admin:
        userCredential.username = credentials.boAdminUsername;
        userCredential.password = credentials.boAdminPassword;
        break;
      case this.ROLE.corp_admin:
        userCredential.username = credentials.boCorpAdminUsername;
        break;
      case this.ROLE.management:
        userCredential.username = credentials.boManagementUsername;
        break;
      case this.ROLE.selling_manager:
        userCredential.username = credentials.boSellingManagerUsername;
        break;
      case this.ROLE.nonsell_manager:
        userCredential.username = credentials.boNonSellManagerUsername;
        break;
      case this.ROLE.changed:
        userCredential.username = credentials.boUsername;
        userCredential.password = credentials.boChangedPassword;
        break;
      case this.ROLE.rep:
        userCredential.username = credentials.boUsername;
        userCredential.password = credentials.boPassword;
        break;

      default:
        throw Error("Backoffice.login - Role doesn't exist");
    }
    if (this.isProdEnv || role === this.ROLE.admin) {
      userCredential.username = `salesfloor_${userCredential.username}`;
    }
    return userCredential;
  }

  /**
   * put the user credentials in login page
   * @param {roles} userRole  to use for login.
   * @prop {object}  credentials - Object that will receive the parameters
   */
  backofficeLogin(userRole, credentials = {}) {
    let credential;
    if (Object.keys(credentials).length === 0) {
      credential = this.getUserCredential(userRole);
    } else {
      credential = credentials;
    }

    browser.waitUntil(
      () => this.username.isEnabled(),
      { timeout : 15000, timeoutMsg : 'TIMEOUT: login field not displayed after 15' }
    );

    this.username.click();
    this.username.setValue(credential.username);

    this.password.waitForEnabled(1000);
    this.password.click();
    this.password.setValue(credential.password);

    this.submitButton.click();
    this.waitForLoadingIconDisappear();
    browser.pause(1000);
    this.setBoWindowId = browser.getWindowHandle();
  }

  /**
   * open Backoffice login page
   * update automatically the setBoWindowId property
   * @param {boolean} [openNewWindow=true] open a new window on browser
   */
  openBoLoginPage(openNewWindow = true) {
    this.setBrowserSize();
    if (openNewWindow) {
      browser.newWindow(`${this.getBackofficeUrl}/backoffice`);
    } else {
      this.openWebPage(`${this.getBackofficeUrl}/backoffice`);
    }
    this.setBoWindowId = this.getWindowIdFromNewWindow();
    this.waitForLoadingIconDisappear();
  }

  /**
   * open Backoffice page and login by role
   * @param {roles} role - role of rep
   * @param {boolean} [newWindow=true] - open new window/tab
   * @return {boolean} if success or not (username field is anymore visible)
   */
  openBoAndLoginByRole(role, newWindow = true) {
    this.openBoLoginPage(newWindow);
    this.backofficeLogin(role);
    return (this.username.isDisplayed() === false);
  }

  /**
   * open Backoffice page and login by role
   * @param {roles} role - role of rep
   * @param {boolean} [newWindow=false] - open or not new window/tab
   * @prop {object}  credentials - Object that will receive the parameters
   * @return {boolean} if success or not (username field is anymore visible)
   */
  openBoAndLogin(credentials = {}, newWindow = false) {
    this.openBoLoginPage(newWindow);
    this.backofficeLogin(undefined, credentials);
    return (this.username.isDisplayed() === false);
  }

  /**
   * switch the window to Backoffice page
   */
  switchToBackofficeWindow() {
    browser.switchToWindow(this.getBoWindowId);
  }

  /**
   * switch To Rep Live Chat Window
  */
  switchToRepLiveChatWindow() {
    browser.switchToWindow(this.chatRepWindowId);
  }

  /**
   * open My Contacts page
   */
  openMyContacts() {
    browser.url(`${this.getBackofficeUrl}/backoffice/contacts`);
    browser.pause(500);
  }

  /**
   * Click on New Lead option from menu bar
   */
  clickOnNewLeads() {
    this.newLeadsMnu.waitForDisplayed({ timeout : 5000 });
    this.newLeadsMnu.click();
  }

  /**
   * Click on Reports menu bar
  */
  clickOnReportsMnu() {
    this.waitForLoadingIconDisappear();
    this.reportsMnu.waitForDisplayed({ timeout : 5000 });
    this.reportsMnu.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * click On Help Center option from Settings menu bar
   */
  clickOnSettingsHelpCenterOpt() {
    this.accountSettingsMenu.waitForDisplayed({ timeout : 10000 });
    this.accountSettingsMenu.click();
    this.helpCenter.waitForDisplayed({ timeout : 10000 });
    this.helpCenter.click();
    this.helpCenterWindowId = this.getWindowIdFromNewWindow();
    browser.pause(800);
  }

  /**
   * logout() logoff of the backoffice
   */
  logout() {
    this.accountSettingsMenu.waitForDisplayed();
    this.accountSettingsMenu.moveTo();
    this.signOutLink.waitForDisplayed();
    this.signOutLink.click();
    browser.pause(500);
  }

  /**
   * logout the backoffice using a linkURL) - without UI
   */
  logoutWithoutUI() {
    this.openWebPage(`${this.getBackofficeUrl}/login?action=logout&redirect_to=%2Fbackoffice`);
    this.logoutLink.click();
    this.username.waitForDisplayed({ timeout : 3000 });
  }

  /**
   * click on view your store front option from Account & settings menu bar
   */
  clickOnSettingsViewYourStorefrontOpt() {
    browser.pause(1000);
    this.accountSettingsMenu.moveTo();
    this.accountSettingsMenu.click();
    this.viewStorefrontLink.waitForDisplayed();
    this.viewStorefrontLink.click();
    browser.pause(1000);
    this.yourStorefrontWindowId = this.getWindowIdFromNewWindow();
  }

  /*
  * switch to storefront window
  */
  switchToYourStorefrontWindow() {
    browser.switchToWindow(this.yourStorefrontWindowId);
  }

  /**
   * click On Compose Message option from Message Center
   */
  clickOnMsgCenterComposeMsgOpt() {
    this.messageCenterMnu.moveTo();
    this.composeMessageOpt.click();
    browser.pause(500);
  }

  /**
   * click On My Messages option from menu bar
   */
  clickOnMyMessages() {
    this.messageCenterMnu.moveTo();
    this.myMessageMenu.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * click On Customer Request Option from menu bar
   */
  clickOnCustomerRequestOpt() {
    this.messageCenterMnu.moveTo();
    this.customerRequestOpt.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * openBoPageByUrl() Open a backoffice page with extra parameters in URL via param
   * It takes in consideration the language (locale)
   * @param {string} urlOption complement after getBackofficeURL address to go to the page. It MUST HAVE starting by /
   */
  openBoPageByUrl(urlOption) {
    this.openWebPage(`${this.getBackofficeUrl}${urlOption}`);
  }

  /**
   * clickOnSettingsUserMgmtOpt() Open account & settings / User management option
   */
  clickOnSettingsUserMgmtOpt() {
    this.accountSettingsMenu.waitForDisplayed();
    this.accountSettingsMenu.moveTo();
    this.userManagementLnk.waitForDisplayed();
    this.userManagementLnk.click();
    this.waitForLoadingIconDisappear();
    browser.pause(1000);
  }

  /**
   * clickOnSettingsOpt() Open account & settings / Settings opt
   */
  clickOnSettingsOpt() {
    this.accountSettingsMenu.moveTo();
    this.settingsOpt.waitForDisplayed();
    this.settingsOpt.click();
    browser.pause(1000);
  }

  /**
   * adds a product by index or a random product if index isn't specified to the publisher.
   * @param {boolean} [product=true] if a product is to be selected (default), false for an asset
   * @param {number} [index] index of a product to choose
   * @return {string} the product description which was added
   */
    selectProduct(product = true, index) {
    this.waitUntilProductsAreDisplayed();
    const productIndex = index || this.getRandomProductIndex();
    this.productCheckIcon[productIndex].click();
    browser.pause(500);
    let productDesc = '';
    if (product) {
      productDesc = this.getProductDescription(productIndex);
    }
    this.productAddIcon.waitForDisplayed();
    this.productAddIcon.click();
    return productDesc;
  }

  /**
   * Gets the description of the chosen product
   *
   * @param productIndex index of the chosen product
   * @returns {string} description of the product
   */
  getProductDescription(productIndex) {
    let productDesc = this.productAddName[productIndex].getText();
    if (this.productAddBrandName.length > 0) {
      const productBrand = this.productAddBrandName[productIndex].getText();
      if (productBrand !== '') {
        productDesc = productDesc.substring(productBrand.length + 1);
      }
    }
    return productDesc;
  }

  /**
   * Waits until products get downloaded in product window
   */
  waitUntilProductsAreDisplayed() {
    browser.waitUntil(() => this.productCheckIcon.length > 0, 15000);
  }

  /**
   * gets a random product index
   * @return {number} returns generated index value
   */
  getRandomProductIndex() {
    return this.randomNumber(this.productCheckIcon.length);
  }
}
module.exports = BackofficeLib;

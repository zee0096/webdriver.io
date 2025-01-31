const config = require('config');
const BackOfficePage = require('../backoffice.page');
const credentials = require('../../credentials.json');

/**
 * UserOnboardingPage Class page
 *
 * @class UserOnboardingPage
 * @classdesc Library
 * @module credentials
 * @extends BackOfficePage
 */
class UserOnboardingPage extends BackOfficePage {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    /**
     * @type {string}
     */
    this.newWindowId = '';

    /**
     * @type {string} the onboarding user id
     */
    this.tokenID = '';
  }

  /** return url of logo
   * @type {urlAddress} */
  get logoUrlImg() { return config.get('bo.logoRetailerURL') !== '' ? config.get('bo.logoRetailerURL') : config.get('logoRetailerURL'); }

  /**  @type {boolean} */
  get hasVanityUrl() { return config.get('bo.onboarding.vanityURL'); }

  /**  @type {boolean} */
  get hasSpecialties() { return config.get('bo.onboarding.specialties'); }

  /**  @type {boolean} */
  get hasImportContacts() { return config.get('bo.onboarding.importContacts'); }

  /**  @type {boolean} */
  get hasSocialNetworks() { return config.get('bo.onboarding.socialNetworks').length > 0; }

  /** @type {cssSelectorObj} */
  get userToken() { return $('#token'); }

  /** @type {cssSelectorObj} */
  get tooltipLink() { return $('div.tooltipLink'); }

  /**
   * Please contact your manager for help retrieving your token.
   * @type {cssSelectorObj}
   */
  get forgotTokenToolTip() { return $('div.qtip-content'); }

  /** @type {cssSelectorObj} */
  get logInButton() { return $('.bo-btn-type-1.full-width'); }

  /** @type {cssSelectorObj} */
  get userName() { return $('#username'); }

  /** @type {cssSelectorObj} */
  get passWord() { return $('#pass'); }

  /** @type {cssSelectorObj} */
  get verifyPass() { return $('#verify'); }

  /** @type {cssSelectorObj} */
  get termConditionsCheck() { return $('#terms'); }

  /** @type {cssSelectorObj} */
  get firstNameField() { return $('#fName'); }

  /** @type {cssSelectorObj} */
  get lastNameField() { return $('#lName'); }

  /** @type {cssSelectorObj} */
  get phoneField() { return $('#phoneNo'); }

  /** @type {cssSelectorObj} */
  get storeField() { return $('#store'); }

  /** @type {cssSelectorObj} */
  get aboutMeField() { return $('#desc'); }

  /** @type {cssSelectorObj} */
  get avatarImageCss() { return 'div.file-select-ctn img'; }

  /** @type {cssSelectorObj} */
  get fileSelector() { return $('input.file-selector'); }

  /** @type {cssSelectorObj} */
  get instructions() { return $('div.instruction'); }

  /**  @type {cssSelectorArr} */
  get specialtiesList() { return $$('[type="checkbox"]'); }

  /** @type {cssSelectorObj} */
  get socialServicesIcons() { return $('#onboardingSocialServices'); }

  /**  @type {cssSelectorArr} */
  get socialServices() { return $$('div.connectSocial a'); }

  /**  @type {cssSelectorArr} */
  get socialStatus() { return $$('div.connectSocial div.connectStatus div'); }

  /** @type {cssSelectorObj} */
  get goToBackOfficeLink() { return $('.btn.primary'); }

  /** @type {cssSelectorObj}
   * @deprecated by retailerLogoCss
   */
  get retailerLogo() { return $(this.retailerLogoCss); }

  /** @type {cssSelectorTxt} */
  get retailerLogoCss() { return 'div.retailerLogo a img'; }

  /**  @type {cssSelectorArr} */
  get appLinks() { return $$('a.applications-download__link'); }

  /**  Next button of Picture page
   * @type {cssSelectorObj} */
  get nextBtnOfPicturePage() { return $('div.secondaryBtns-ctn'); }

  /** Terms and conditions link
   * @type {cssSelectorObj} */
  get termsConditionsLink() { return $('div.field label a'); }

  /** Submit button on create password page
   * @type {cssSelectorObj} */
  get submitBtnOnCreatePw() { return $('#submitbutton'); }

  /** Submit button on create password page
   * @type {cssSelectorObj} */
  get submitBtnByIDGeneric() { return $('#mainSubmitBtn'); }

  /**
   * @type {cssSelectorObj} */
  get checkVanityUrlLink() { return $('a.fn-editLink'); }

  /**
   * @type {cssSelectorObj} */
  get startProfileBtn() { return $('div.secondaryBtns-ctn button.primary'); }

  /**
   * @type {cssSelectorObj} */
  get importContactsSkipBtn() { return $('div.secondaryBtns-ctn a'); }

  /**
   * @type {cssSelectorObj} */
  get socialNetworkBtn() { return $('div.secondaryBtns-ctn a.btn'); }

  /**
   * @type {cssSelectorObj} */
  get socialNetworkSkipBtn() { return $('div.secondaryBtns-ctn a.btn'); }

  /**
   * validationRetailerLogoIsImage() checks the retailer logo is a real image
   * @return {boolean} true if the image is loaded correctly
   */
  validationRetailerLogoIsImage() {
    this.retailerLogo.waitForDisplayed();
    return this.isRealImage(this.retailerLogoCss);
  }

  /**
   * validationRetailerLogoUrlValue() checks the retailer logo URL value
   * @return {boolean} true if the URL value is loaded correctly
   */
  validationRetailerLogoUrlValue() {
    this.retailerLogo.waitForDisplayed();
    const subStringArr = this.logoUrlImg.match(/\b(\/).*/); // changes due to QA-455
    return this.retailerLogo.getAttribute('src').includes(subStringArr[0]); // can be changed in future, see: QA-461
  }

  /**
   * openTokenScreen() opens the token validation screen
   */
  openTokenScreen() {
    browser.url(`${this.getBackofficeUrl}/setup`);
    this.userToken.waitForExist();
  }

  /**
   * checkToolTip() checks the "Forgot Token" tooltip
   * @return {boolean} true if the tooltip is shown correctly
   */
  checkToolTip() {
    this.tooltipLink.waitForDisplayed();
    browser.pause(500);
    this.tooltipLink.moveTo();
    return this.forgotTokenToolTip.waitForDisplayed({ timeout : 2000 });
  }

  /**
   * tokenValidation() enters the token and begins the process of onboarding
   * @param {string} token
   */
  tokenValidation(token) {
    this.userToken.setValue(token);
    this.logInButton.click();
  }

  /**
   * opentermsConditionsScreen() goes to the terms and conditions screen
   */
  clickOnTermsConditionsLnk() {
    this.termsConditionsLink.click();
    this.newWindowId = this.getWindowIdFromNewWindow();
    browser.switchToWindow(this.newWindowId);
  }

  /**
   * termsConditionsScreen() goes to the terms and conditions screen and verify it's ok
   * @return {boolean} true if terms and conditions screen is correctly shown, false if not
   */
  termsConditionsScreen() {
    const goodURL = browser.getUrl().indexOf('/setup/terms');
    browser.close();
    return (goodURL !== -1);
  }

  /**
   *  enterUserNamePassword() Enters the username and password used by the rep
   * @param {string} name login name to use for the rep being onboarded
   * @param {string} password to use for rep
   */
  enterUserNamePassword(name, password = credentials.boPassword) {
    this.userName.waitForDisplayed();
    this.userName.setValue(name);
    this.passWord.setValue(password);
    this.verifyPass.setValue(password);
    this.termConditionsCheck.click();
    this.submitBtnOnCreatePw.waitForEnabled();
    this.submitBtnOnCreatePw.click();
  }

  /**
   * changeStore() changes the store to the specified one
   */
  changeStore() {
    const optionsLenght = this.storeField.$$('option').length;
    this.storeField.selectByIndex(optionsLenght - 1);
  }

  /**
   * enterEmailUrl allows entering email and vanity URL (if allowed) for the rep being onboarded
   * @param {string} email to set for rep
   * @param {string} vanityURL to use for rep (if allowed)
   */
  enterEmailUrl() {
    // Add code to test changing of email (if allowed)
    // Need to add code to handle Vanity URLs
    browser.pause(500);
    this.submitBtnByIDGeneric.click();
    browser.pause(500);
  }

  /**
   * startProfile() build profile of the rep by adding name, phone number, store, about, etc.
   */
  // FIXME review, the description doesn't work. removed many parameters
  startProfile() {
    if (!this.isTeamMode) {
      this.aboutMeField.setValue('All there is about me');
    }
    this.startProfileBtn.click();
    this.phoneField.waitForDisplayed({ timeout : 2000, reverse : true });
  }

  /**
   * clickNextButtonFromPicturePage() click on the Next button on Picture page
   */
  clickNextButtonFromPicturePage() {
    this.nextBtnOfPicturePage.click();
  }

  /**
   * specialties() add specialties for the rep
   * @return {boolean} true if social network connections are done (not really checked for now...)
   */
  specialties() {
    this.instructions.waitForDisplayed();
    // Seen some instances were specialties took time to show up
    browser.pause(500);
    // TODO: Add code to verify all categories match expected values
    this.specialtiesList[0].click();
    // Seen some instances were selecting all specialties took time to propagate
    browser.pause(500);
    // TODO: Add code to verify selected categories are those expected
    this.submitBtnByIDGeneric.click();
    return (this.instructions.waitForDisplayed({ timeout : 2000, reverse : true }));
  }

  /**
   * importContacts() import contacts from email accounts for the rep
   */
  importContacts() {
    this.importContactsSkipBtn.click();
    browser.pause(500);
  }

  /**
   * verifySocialNetworks() verifies which social networks are present
   * @return {boolean} true if the right social networks are shown
   */
  verifySocialNetworks() {
    this.socialServicesIcons.waitForDisplayed();
    const socialServicesNames = this.socialServices.map((v) => v.getAttribute('data-service'));
    const socialServicesExpected = config.get('bo.onboarding.socialNetworks');
    return (socialServicesNames.length === socialServicesExpected.length
      && socialServicesNames.every((v, i) => v === socialServicesExpected[i]));
  }

  /**
   * socialNetworksConnections() verifies connection status of all Social Networks
   * @param {string} status the expected status
   * @return {boolean} true if the social network connection status are ok
   */
  socialNetworksConnections(status) {
    const socialStatusArray = this.socialStatus.map((v) => v.getAttribute('class'));
    return (socialStatusArray.every((v) => v === status));
  }

  /**
   * socialNetworks() connects to social networks
   * @return {boolean} true if social accounts are connected (not really for now...)
   */
  socialNetworks() {
    // Add code to actually connect to social networks...
    this.socialNetworkBtn.click();
    return (browser.getUrl().indexOf('congrats') !== -1);
  }

  /**
   * goToApp() follows the given link to app store and verifies it's the salesfloor app page
   * @param {Element} HTML link to the app store
   * @return {boolean} true if app link work correctly
   */
  goToApp(link) {
    link.click();
    this.newWindowId = this.getWindowIdFromNewWindow();
    browser.switchToWindow(this.newWindowId);

    const status = browser.getUrl().indexOf('salesfloor') !== -1;
    this.closeWindowAndReturnToOtherWindow(this.getBoWindowId);
    return (status);
  }

  /**
   * verifyAppLinks() tries App Links after onboarding to make sure they go to Salesfloor app
   * @return {boolean} true if app links work correctly
   */
  verifyAppLinks() {
    return (this.appLinks.every((v) => this.goToApp(v)));
  }

  /**
   * goToBackOffice() goes to the backoffice after onboarding is complete
   */
  goToBackOffice() {
    this.goToBackOfficeLink.click();
  }

  /**
   * logoffAfterDone() logoff of the backoffice once user onboarding is done
   */
  logoffAfterDone() {
    BackOfficePage.accountSettingsMenu.waitForDisplayed();
    BackOfficePage.accountSettingsMenu.moveToObject();
    BackOfficePage.signOutLink.waitForDisplayed();
    BackOfficePage.signOutLink.click();
    browser.pause(500);
  }

  /**
   * getCurrentStoreName() get the current value in store dropdown field
   * @returns {string}
   */
  getCurrentStoreName() {
    return (this.storeField.getValue());
  }
}
module.exports = new UserOnboardingPage();

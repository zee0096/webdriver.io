const config = require('config');
const PageLib = require('./pagelib');

/**
 * WebChat Class page
 *
 * @class WebChat
 * @classdesc Library of WebChat widget
 * @extends PageLib
 */
class WebChat extends PageLib {
  /** get IdFrame of chag request page, Appt Request
   * @type {cssSelectorTxt} */
  get chatbotIframe() { return 'iframe[id="sf-automat-companion"]'; }

  get chatAvailableIframe() { return 'iframe[id="sf-chat-available-dropdown"]'; }

  get sfNotificationIframe() { return 'iframe[id="sf-notification-companion"]'; }

  get chatbot() { return $(config.get('sb.connect.sales.chatbot')); }

  get ihaveProductQuestionsOption() { return $(config.get(`lang.${this.LOCALE}.sf.ihaveProductQuestionsOption`)); }

  get imLookingForStyleAdviceOption() { return $(config.get(`lang.${this.LOCALE}.sf.imLookingForStyleAdviceOption`)); }

  get NextItemButton() { return $(config.get('sb.connect.sales.NextItemBtn')); }

  get browseAssociatesOption() { return $(config.get(`lang.${this.LOCALE}.sf.browseAssociatesOption`)); }

  get iNeedHelpWithMyOrderOption() { return $(config.get(`lang.${this.LOCALE}.sf.iNeedHelpWithMyOrderOption`)); }

  get somethingElseOption() { return $(config.get(`lang.${this.LOCALE}.sf.somethingElseOption`)); }

  get typeButton() { return $(config.get('sb.connect.sales.typeBtn')); }

  get chatWithAnAssociateOptions() { return $(config.get('sf.iHaveProductQuestions.chatWithAnAssociateOptions')); }

  get bookAnAppointmentOptions() { return $(config.get(`lang.${this.LOCALE}.sb.connect.bookAnAppointmentOptions`)); }

  get inAStoreOptions() { return $(config.get(`lang.${this.LOCALE}.sb.connect.inAStoreOptions`)); }

  get onlineOptions() { return $(config.get(`lang.${this.LOCALE}.sf.onlineOptions`)); }

  get bookAnOnlineAppointmentOptions() { return $(config.get(`lang.${this.LOCALE}.sf.bookOnlineAppointmentOption`)); }

  get listOfCategories() { return $(config.get('sf.iHaveProductQuestions.listOfCategories')); }

  get continueButton() { return $(config.get('sf.iHaveProductQuestions.categoriesContinueBtn')); }

  get iMLookingForAnAssociateOption() { return $(config.get(`lang.${this.LOCALE}.sf.iMLookingForAnAssociateOption`)); }

  get iMLookingBeautySpeciaOption() { return $(config.get(`lang.${this.LOCALE}.sf.iMLookingForABeautSpecialistOpt`)); }

  get categoryItem() { return $(config.get('sf.iHaveProductQuestions.categoryItem')); }

  get filterBySpecialtyButton() { return $(config.get(`lang.${this.LOCALE}.sb.connect.filterBySpecialtyBtn`)); }

  get specialityOptions() { return $(config.get('sb.connect.sales.specialityOptions')); }

  get filterByStoreButton() { return $(config.get(`lang.${this.LOCALE}.sb.connect.filterByStoreBtn`)); }

  get listOfAssociates() { return $(config.get('sf.iHaveProductQuestions.listOfAssociates')); }

  get firstAssociatesInList() { return $(config.get('sf.imLookingForAnAssociate.firstAssociatesInList')); }

  get connectButton() { return $(config.get('sf.imLookingForAnAssociate.connectBtn')); }

  get typeSendMessageButton() { return $(config.get('sf.imLookingForAnAssociate.typeSendMessageBtn')); }

  get emailTextFeild() { return $(config.get('sf.imLookingForAnAssociate.emailTxt')); }

  get noThankYouBtn() { return $(config.get('sf.imLookingForAnAssociate.noThankYouOption')); }

  get selectATimeAndDate() { return $(config.get('sf.imLookingForAnAssociate.selectATimeAndDate')); }

  get calenderWithTimrSlot() { return $(config.get('sf.imLookingForAnAssociate.calenderWithTimrSlot')); }

  get associateContinueButton() { return $(config.get('sf.imLookingForAnAssociate.associateContinueBtn')); }

  get noImGoodOption() { return $(config.get('sf.imLookingForAnAssociate.noImGoodOption')); }

  get NotNowOption() { return $(config.get('sf.imLookingForAnAssociate.NotNowOption')); }

  get getAReplyByEmail() { return $(config.get('sf.imLookingForAnAssociate.getAReplyByEmail')); }

  get emailBtn() { return $(config.get('sf.imLookingForAnAssociate.emailBtn')); }

  get smsButton() { return $(config.get('sf.imLookingForAnAssociate.sMSBtn')); }

  get phoneTextFeild() { return $(config.get('sf.imLookingForAnAssociate.phoneTxt')); }

  get joinedTheChatMessage() { return $(config.get('sf.imLookingForAnAssociate.joinedTheChatMsg')); }

  get leftTheChatMessage() { return $(config.get('sf.imLookingForAnAssociate.leftTheChatMsg')); }

  get connectWithAnyAssociateButton() { return $(config.get('sf.imLookingForAnAssociate.connectWithAnyAssociateBtn')); }

  get getAReplyBySmsOptions() { return $(config.get(`lang.${this.LOCALE}.sf.getAReplyBySmsOptions`)); }

  get findAnotherStoreButton() { return $(config.get('sb.connect.iHaveProductQuestions.findAnotherStoreBtn')); }

  get chatPopupCloseButton() { return $(config.get('sf.iHaveProductQuestions.chatPopupCloseBtn')); }

  get categoriesContinueButton() { return $(config.get('sf.iHaveProductQuestions.categoriesContinueBtn')); }

  get categoriesContinueDisabledButton() { return $(config.get('sf.iHaveProductQuestions.categoriesContinueDisabledBtn')); }

  get getAnAnswerByEmailOptions() { return $(config.get(`lang.${this.LOCALE}.sf.getAnAnswerByEmailOptions`)); }

  get getAppointmentRequestUserName() { return $(config.get('salseFloorPage.appointmentRequestUserName')); }

  get anyoneWouldWorkOption() { return $(config.get(`lang.${this.LOCALE}.sf.anyoneWouldWorkOption`)); }

  get confirmButton() { return $(config.get('sf.iHaveProductQuestions.confirmBtn')); }

  get notFindPostalCodeMessage() { return $(config.get(`lang.${this.LOCALE}.sf.notFindPostalCodeMsg`)); }

  get pastDateDisabledButton() { return $(config.get('sf.iHaveProductQuestions.pastDateDisabledBtn')); }

  get makeThisMyStoreButton() { return $(config.get('sf.iHaveProductQuestions.makeThisMyStoreBtn')); }

  get makeThisMyStore2ndButton() { return $(config.get('sf.iHaveProductQuestions.makeThisMyStore2ndBtn')); }

  get yesButton() { return $(config.get('sb.connect.liveChat.yesBtn')); }

  get denyButton() { return $(config.get('sb.connect.liveChat.denysBtn')); }

  get okLooksGoodOption() { return $(config.get(`lang.${this.LOCALE}.sf.okLooksGoodOption`)); }

  get storeNamelabel() { return $(config.get('sf.iHaveProductQuestions.storeNameLbl')); }

  get ihaveProductQuestionsSecondOption() { return $(config.get('sf.iHaveProductQuestions.ihaveProductQuestionsSecondOption')); }

  get selectATimeAndDateSecButton() { return $(config.get('sf.iHaveProductQuestions.selectATimeAndDateSecBtn')); }

  get invalidPhoneNumberPopup() { return $(config.get(`lang.${this.LOCALE}.sf.invalidPhoneNumberPopup`)); }

  get cancelButton() { return $(config.get(`lang.${this.LOCALE}.sf.cancelBtn`)); }

  get greenCheckMark() { return $(config.get('sf.iHaveProductQuestions.greenCheckMark')); }

  get invalidEmailPopup() { return $(config.get(`lang.${this.LOCALE}.sf.invalidEmailPopup`)); }

  get imSorryToHearThatMsg() { return $(config.get(`lang.${this.LOCALE}.sf.imSorryToHearThatMsg`)); }

  get actuallyIllLeaveAMessage() { return $(config.get(`lang.${this.LOCALE}.sf.actuallyIllLeaveAMessage`)); }

  get listOfRepsAssociatedWithStore() { return $(config.get('sf.imLookingForAnAssociate.listOfRepsAssociatedWithStore')); }

  get userNameTextField() { return $(config.get('sb.connect.liveChat.userNameTxt')); }

  get passwordTextField() { return $(config.get('sb.connect.liveChat.passwordTxt')); }

  get signInButton() { return $(config.get('sb.connect.liveChat.signInBtn')); }

  get homePageTitle() { return $(config.get('sb.connect.liveChat.homePageTitle')); }

  get toggleSwitchButton() { return $(config.get('sb.connect.liveChat.toggleSwitchBtn')); }

  // /** return the string of shoppingUrl using LOCALE
  //  * @type {urlAddress} */
  // get shoppingUrl() { return config.get(`lang.${this.LOCALE}.shoppingUrl`); }

  /** return the string of storefrontUrl using LOCALE
   * @type {urlAddress} */
  get storefrontUrl() { return config.get(`lang.${this.LOCALE}.sf.storefrontUrl`); }

  get liveChatOption() { return $(config.get(`lang.${this.LOCALE}.sf.liveChatOption`)); }

  get appointmentRequestOption() { return $(config.get('sf.liveChat.appointmentRequestOption')); }

  get styleAdviceOption() { return $(config.get('sf.liveChat.styleAdviceOption')); }

  get contactMeOption() { return $(config.get('sf.liveChat.contactMeOption')); }

  get availableNowOnLive() { return $(config.get('sf.liveChat.availableNowOnLive')); }

  get unavailableOnLive() { return $(config.get('sf.liveChat.unavailableOnLive')); }

  get imLookingForAnInStore() { return $(config.get(`lang.${this.LOCALE}.sb.connect.imLookingForAnInStoreStylist`)); }

  get selectTestStore() { return $(config.get('sb.connect.iMLookingForInSS.selectTestStore')); }

  get connectBtn() { return $(config.get('sb.connect.iMLookingForInSS.connectBtn')); }

  get getAReplyWithSmsOption() { return $(config.get(`lang.${this.LOCALE}.sb.connect.getAReplyWithSmsOption`)); }

  get iWantConnectWithInSS() { return $(config.get(`lang.${this.LOCALE}.sb.connect.iWantToConnectWithInSS`)); }

  get customerServiceMenuCard() { return $(config.get('sb.sales.connect.customerServiceMenuCard')); }

  get iWantShedulAnAppointment() { return $(config.get(`lang.${this.LOCALE}.sb.connect.iWantShedulAnAppointment`)); }

  get yesThisIsMyStore() { return $(config.get(`lang.${this.LOCALE}.sb.connect.yesThisIsMyStore`)); }

  get yesLetMeFindAnExpert() { return $(config.get(`lang.${this.LOCALE}.sb.connect.yesLetMeFindAnExpert`)); }

  get anyoneWouldWork() { return $(config.get(`lang.${this.LOCALE}.sb.connect.anyoneWouldWork`)); }

  get iWantToConnectWithAnExper() { return $(config.get(`lang.${this.LOCALE}.sb.connect.iWantToConnectWithAnExpert`)); }

  get chatWithAnExpertOption() { return $(config.get(`lang.${this.LOCALE}.sb.connect.chatWithAnExpert`)); }

  get anyStoreWorksForMeOption() { return $(config.get(`lang.${this.LOCALE}.sb.connect.anyStoreWorksForMeOption`)); }

  get chatWithInSSOption() { return $(config.get(`lang.${this.LOCALE}.sb.connect.chatWithInStoreStylistOption`)); }

  get cardsOnMainMenu() { return $(config.get('sb.connect.sales.cardsOnMainMenu')); }

  waitForElementToDisplayed(element, timeout = 10000) {
    element.waitForDisplayed({ timeout });
  }
  
  
  openTab(url) {
    browser.pause(111000000000);
    browser.url(url);
    // const handles = browser.getWindowHandles();
    // browser.switchToWindow(handles[1]);
  }
  openAndSwitchToNewTab(url) {
    browser.newWindow(url);
    const handles = browser.getWindowHandles();
    browser.switchToWindow(handles[1]);
  }

  /**
   * Getting the Text of Element
   * @param {string} element
   * @return {string} return the text of the given element
   */
  getMessageText(element) {
    return element.getText();
  }

  clickOnChatbot() {
    this.waitForElementToDisplayed(this.chatbot);
    this.chatbot.click();
  }

  isChatbotDisplayed() {
    this.selectIFrame(this.chatbotIframe);
    browser.pause(111000);
    return this.chatbot;
  }

  selecyStoreAndConnect() {
    this.selectTestStore.click();
    this.connectBtn.click();
  }

  /**
   * Toggle the available for Chat Switch
   */
  clickOnAvailableForChatToggle() {
    try {
      this.selectIFrame(this.sfNotificationIframe);
      this.yesButton.click();
    } catch (error) {
      this.selectIFrame(this.chatAvailableIframe);
      this.toggleSwitchButton.click();
    }
  }

  /**
   * Deny for the Chat
   */
  clickOnDenyForChat() {
    try {
      this.selectIFrame(this.sfNotificationIframe);
      this.denyButton.click();
    } catch (error) {
      console.error(error);
    }
  }

  isAvailableForChatToggleIsDisable() {
    this.selectIFrame(this.chatAvailableIframe);
    return this.toggleSwitchButton;
  }

  clickOnNextItemButton(timeout = 5000) {
    this.NextItemButton.waitForDisplayed({ timeout });
    this.NextItemButton.click();
  }

  enterValueInTypeField(element, value) {
    element.waitForDisplayed({ timeout : 5000 });
    element.click();
    element.setValue(value);
    this.typeSendMessageButton.click();
  }

  /**
   * read the xpath of messages
   * @param {string} messageNumber
   * @return {string} return the messages with message number
   */
  readMessageNumber(messageNumber) {
    return $(`(//div[@data-test-e2e='Text']/div/p)[${messageNumber}]`);
  }

  /**
   * enter value in the text field
   * @param {string} element
   * @param {string} value
   */
  enterValueInField(element, value) {
    element.click();
    element.setValue(value);
  }

  /**
   * read messages
   * @param {string} messageNumber
   * @return {string} return messages
   */
  readMessage(messageNumber) {
    const getMsg = this.getMessageText(this.readMessageNumber(messageNumber));
    return `verified Message '${getMsg}' is displaying`;
  }

  /**
   * read the xpath of stor name messages
   * @param {string} storName
   * @return {string} return the stor name messages
   */
  readMessageStorName(storName) {
    return $(`(//p[contains(text(),'${storName}')])[last()]`);
  }

  /**
   * click on score buttons and accept number from 0 to 10
   * @param {string} scoreNumber
   */
  clickOnScore(scoreNumber) {
    if (scoreNumber > -1 || scoreNumber < 11) {
      $(`//span[text()='${scoreNumber}']`).click();
    }
  }

  /**
   * read messages
   * @param {string} element
   * @return {string} get text and return verified message
   */
  getVerifiedMessage(element) {
    const getMsg = this.getMessageText(element);
    return `verified '${getMsg}' is displaying`;
  }

  /**
   * get text of click Element
   * @param {string} element
   * @return {string} get text and return click message
   */
  getClickElementText(element) {
    const getMsg = this.getMessageText(element);
    return `click on :'${getMsg}'`;
  }

  /**
   * Enter Phone Number value
   * @param {string} number
   */
  enterPhoneNumber(number) {
    this.phoneTextFeild.setValue(number);
  }

  /**
   * Enter Email value
   * @param {string} email
   */
  enterEmail(email) {
    this.emailTextFeild.setValue(email);
  }
}

module.exports = new WebChat();

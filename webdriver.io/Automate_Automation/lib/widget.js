const config = require('config');
const PageLib = require('./pagelib');

/**
 * Widget General class in library
 *
 * @class
 * @extends PageLib
 */
class Widget extends PageLib {
  /** Create a Page instance -  This is the main library of the system
   * @constructor Page
   */
  constructor() {
    super();
    /**
     * client's window Id of live chat
     * @property {string}
     */
    this.liveChatClientWindowId = '';

    /**
     * Where is the widget comes from: storefront, footer, sidebar (maybe)
     * @property {string}
     */
    this.repWindowId = '';

    /**
     * The modal window was opened comming from with page (storefront, sidebar, footer...)
     * see IT_IS_COMMING_FROM option variable from pagelib class.
     * @property {string}
     */
    this.widgetWindowComingFrom = '';

    /**
     * @property {string} tempWindowId window id of temporary new window
    */
    this.tempWindowId = '';
  }

  /** Frame Id used into widget window
   * @type {cssSelectorTxt} */
  get chatIframeId() { return 'iframe[id="sf-services-landing"]'; }

  /** get IdFrame of chag request page, Appt Request
   * @type {cssSelectorTxt} */
  get chatRequestIframeId() { return 'iframe[id="sf-services-landing"]'; }

  /** @type {cssSelectorObj} */
  get findStoreLnk() { return $('a.landing-page__carousel__location--is-link'); }

  /** get IdFrame of chag request page, Appt Request
   * @type {cssSelectorTxt} */
  get serviceslandingIframeId() { return 'iframe[id="sf-services-landing"]'; }

  /** @type {cssSelectorObj} */
  get liveChatOption() { return $('#landing-chat-link'); }

  /** @type {cssSelectorObj} */
  get specialtyDrp() { return $('#selectedSpecialty, #categoryDropdown'); } // for chat support

  /** show the list of options for a category/speciality
   * @type {cssSelectorArr} */
  get specialtyOpt() { return $$('#selectedSpecialty option, #categoryDropdown option[class*="default-list-item"]'); }

  /** show the list of options for a category/speciality
   * @type {cssSelectorArr} */
  get specialtyUnavailableOpt() { return $$('#selectedSpecialty option, #categoryDropdown option[class*="unavailable-list-item"]'); }

  /** @type {cssSelectorObj} */
  get specialtySelected() {
    return $('//select[@id="selectedSpecialty"]/option[contains(@class,"is-selected")][not(contains(@disabled, "disabled"))] |'
      + ' //select[@id="categoryDropdown"]//option[@selected="true"][@value]'); }

  /** find the iframe ID  of landing
   * @type {cssSelectorObj} */
  get landingIframeId() { return $('iframe[id="sf-services-landing"]'); }

  /** find the iframe ID  of carousel
   * @type {cssSelectorTxt} */
  get carouselIframeId() { return 'iframe[id="sf-services-carousel"]'; }

  /** find the iframe ID  of carousel
   * @type {cssSelectorTxt} */
  get repCarouselIframeId() { return 'iframe[id="repCarousel"]'; }

  /** @type {cssSelectorObj} */
  get smsButton() { return $('label[for="contactTextMessage"]'); }

  /** @type {cssSelectorObj} */
  get phoneField() { return $('#sms'); }

  /** @type {cssSelectorObj} */
  get chatQuestionBox() { return $('#chatTextarea, #questionField'); }

  /** comment field in apps or chat
   * @type {cssSelectorObj} */
  get question() { return $('#questionField, #extraInfo'); }

  /** @type {cssSelectorObj} */
  get sendButton() { return $('footer button, button.btn.btn-retailer-type-1.fn-trigger-save.global-services__button'); }

  /** @type {cssSelectorObj} */
  get sentMsgTxt() { return $('.message.global-services__validation'); }

  /** @type {cssSelectorObj} */
  get customerNameTxt() { return $('input#name'); }

  /** @type {cssSelectorObj} */
  get previousVisibleButton() { return $('header.landing-page__top-bar a.landing-page__previous-link--is-visible'); }

  /** show now button on search rep page
   * @type {cssSelectorArr} */
  get shopNowBtn() { return $$('button.fn-choose-rep'); }

  /** Search Now link (associates)
   * @type {cssSelectorObj} */
  get searchAssociateLnk() { return $('a.landing-page__find-a-rep--is-link'); }

  /** Privacy Disclaimer CheckBox / subscriber email
   * @type {cssSelectorObj} */
  get pdCheckBox() { return $('.global-services__checkbox__text, [for="subscribe-checkbox"]'); }

  /** subscriber checkbox
    * @type {cssSelectorObj} */
  get subscriberCbx() { return $('label[for="autoSubscribe"]'); }

  /** @type {cssSelectorObj} */
  get custName() { return $('#name'); }

  /** Privacy Policy link
   * get the pricacy Policy link inside the text on Schedule an appointment widget
   *  @type {cssSelectorObj} */
  get privacyPolicyLink() { return $('[class*=global-services__][class*=text] a, [for="subscribe-checkbox"] a'); }

  /** @type {cssSelectorObj} */
  get thankyouMsg() { return $('span.global-services__validation__title'); }

  /** @type {cssSelectorObj}  */
  get specialtyFld() { return $('#selectedSpecialty, #categoryDropdown'); } // for chat support

  /** @type {cssSelectorObj}  */
  get chatAvailable() { return $('a#landing-chat-link span.js-status-text-available.landing-page__services__status--is-visible'); }

  /** @type {cssSelectorObj} */
  get storeCityName() { return $('p.landing-page__carousel__location a'); }

  /**  @type {cssSelectorArr} */
  get storeAddressList() { return $$('div.findstore__store-item__address'); }

  /** city name of store on sidebar/popup - main page
   *  @type {cssSelectorArr} */
  get chooseStoreBtn() { return $$('button.findstore__store-item__button'); }

  /** Has speciality dropdown
   *  @type {boolean} */
  get hasSpecialityDrp() { return config.get('widget.liveChat.hasSpecialityDrp'); }

  /**
   * click On Live Chat option
   */
  clickOnLiveChat() {
    this.selectIFrame(this.chatRequestIframeId, { hasParentFrame: true, pauseTime: 500 });

    this.liveChatOption.click();
    browser.pause(500);
  }

  /**
   * clickOnSearchAnAssociateLnk link to find an associates
   */
  clickOnSearchAnAssociateLnk() {
    this.switchToServicesLandingFrameId();
    this.searchAssociateLnk.click();
    browser.pause(1000);
  }

  /**
   * click on specialties/category dropdown and choose the last one available
   * it is on widget class because it is used for many widget options
   * @param {'available' | 'unavailable'} available='available' use available specialties, otherwise unavailable
   */
  selectSpecialtyOpt(available = 'available') {
    if (this.hasSpecialityDrp) {
      if (available === 'available') {
        this.specialtyDrp.selectByIndex(this.specialtyOpt.length - 1);
      } else {
        this.specialtyDrp.click();
        this.waitForLoadingIconDisappear();
        const option = this.specialtyUnavailableOpt[this.specialtyUnavailableOpt.length - 1];
        option.waitForDisplayed();
        this.specialtyDrp.selectByAttribute('value', option.getAttribute('value'));
      }
    }
  }

  /**
   * switchToWidgetIframe - switch to sf-services-landing iframe in widget page
  */
  switchToWidgetIframe() {
    this.selectIFrame(this.chatRequestIframeId, { pauseTime: 500 });

  }

  /**
   * swichToCarroselIframe switch the windows to carousel iframe
   */
  switchToCarouselIframe() {
    // twice because it is necessary arrive to top of page to start to find the right iframe
    browser.switchToParentFrame();
    browser.switchToParentFrame();
    this.switchToWidgetIframe();
    this.selectIFrame(this.carouselIframeId, { pauseTime: 500 })
  }

  /**
   * Choose Landing Frame if it exists otherwise do nothing
   */
  selectLandingFrameIfExists() {
    if (this.landingIframeId.isExisting()) {
      this.selectIFrame('sf-services-landing');
    }
  }

  /**
   * Choose Landing Frame if it exists otherwise do nothing
   */
  switchToServicesLandingFrameId() {
    browser.switchToParentFrame();
    this.selectIFrame(this.serviceslandingIframeId, { hasParentFrame: true, pauseTime: 500 });
  }

  /**
   * Choose switchToRepCarouselFrameId Frame
   */
  switchToRepCarouselFrameId() {
    this.switchToServicesLandingFrameId();
    this.selectIFrame(this.repCarouselIframeId);
  }

  /**
   * switchToRepWindow window
   */
  switchToRepWindow() {
    browser.switchToWindow(this.repWindowId);
    browser.pause(500);
  }

  /**
   * setSpecialty click on specialties dropdown and choose the first one after default
   */
  setSpecialty() {
    if (this.specialtyFld.isExisting()) {
      const options = this.specialtyFld.$$('option');
      this.specialtyFld.click();
      options[1].waitForDisplayed();
      options[1].click();
    }
  }

  /**
   * requestSentIsVisible() checks if the sent message is returned after a request
   * @return {Boolean} true if sent message is returned in 3000ms
   */
  requestSentIsVisible() {
    return this.thankyouMsg.waitForExist({ timeout : 5000 });
  }

  /**
   * Waits till success message disappears after sending appnt request
   */
  waitForRequestSentMessageToDisappear() {
    this.thankyouMsg.waitForDisplayed({ timeout : 5000, reverse : true });
    browser.pause(1000);
  }

  /**
   * return the previous page in landing page - simulate click on < button (previous)
   */
  backToPreviousPage() {
    browser.switchToParentFrame();
    browser.switchToParentFrame();
    browser.pause(500);
    this.previousVisibleButton.click();
  }

  /**
   * clickOnShopNowBtn brings the reps window and actually clicks on the specified one
   * then verifies that we are on the storefront page
   * replaced selectRepLeadsToStorefront()
   *
   * @param {Integer} [numlist=0] the number of the rep to choose in the displayed list
   *  //TODO can the function moved to changerep.page.js file ?
   */
  clickOnShopNowBtn(numlist = 0) {
    this.switchToServicesLandingFrameId();

    this.shopNowBtn[numlist].click();
    browser.pause(500);
    this.repWindowId = this.getWindowIdFromNewWindow();
  }

  /**
  * is chat available?
  * @return {boolean} is chat available?
  */
  isChatAvailable() {
    browser.switchToParentFrame();
    this.switchToServicesLandingFrameId();
    return this.chatAvailable.isDisplayed();
  }

  /**
  * get current store name
  * @return {string} store name
  */
  currentStoreName() {
    browser.switchToParentFrame();
    this.switchToServicesLandingFrameId();
    return this.storeCityName.getText();
  }

  /**
  * update the store name on this.storeName Property
  */
  saveStoreName() {
    this.storeName = this.currentStoreName();
  }

  /**
  * click On Store Name
  */
  clickOnStoreName() {
    this.switchToServicesLandingFrameId();
    this.storeCityName.click();
  }

  /**
  * pick Next Store
  * @param {string} cityName
  */
  pickNextStore(cityName) {
    this.switchToServicesLandingFrameId();
    browser.waitUntil(() => this.storeAddressList.length > 0, { timeout: 3000, interval: 500 });
    const storeList = this.storeAddressList;
    // searching a new store with different cityName
    const indexOpt = storeList.findIndex((address) => {
      const storeAddress = address.getText();
      return (storeAddress.includes(cityName) === false);
    });

    // choice the new city/store
    this.chooseStoreBtn[indexOpt].click();
    browser.pause(500);
  }

  /**
   * clickOnfindStoreLnk() click on store name to changes the store location
   */
  clickOnFindStoreLnk() {
    this.switchToServicesLandingFrameId();
    this.findStoreLnk.click();
    browser.pause(1000);
  }
}
module.exports = Widget;

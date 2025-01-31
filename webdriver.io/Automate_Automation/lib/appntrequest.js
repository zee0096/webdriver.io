const config = require('config');
const Widget = require('./widget');

/**
 * Class appntRequest
 *
 * @class
 * @classdesc The  class works with only appnt request
 * doesn't metter if is from the request (sidebar, footer etc...)
 * @extends Widget
 */
class AppntRequest extends Widget {
  /** Create a Page instance -  This is the main library of the system
   * @constructor Page
   */
  constructor() {
    super();

    /**
     * Appointment Request Types we may want to request
     *
     * @type {Object} APPOINTMENT_TYPE - Contains the name and selectors per each appointment type on SB page
     *
     * @property {Object} APPOINTMENT_TYPE.store - Object to deal with store appointment
     * @property {String} APPOINTMENT_TYPE.store.name - the name of store appointment we use in info
     * @property {cssSelectorObj} APPOINTMENT_TYPE.store.inputElement() - store's input selector (need to check the state)
     * @property {cssSelectorObj} APPOINTMENT_TYPE.store.labelElement() - store's label selector (need to click on it)
     *
     * @property {Object} APPOINTMENT_TYPE.virtual - Object to deal with virtual appointment
     * @property {String} APPOINTMENT_TYPE.virtual.name - the name of virtual appointment we use in info
     * @property {cssSelectorObj} APPOINTMENT_TYPE.virtual.inputElement() - virtual's input selector (need to check the state)
     * @property {cssSelectorObj} APPOINTMENT_TYPE.virtual.labelElement() - virtual's label selector (need to click on it)
     *
     * @property {Object} APPOINTMENT_TYPE.phone - Object to deal with phone appointment
     * @property {String} APPOINTMENT_TYPE.phone.name - the name of phone appointment we use in info
     * @property {cssSelectorObj} APPOINTMENT_TYPE.phone.inputElement() - phone's input selector (need to check the state)
     * @property {cssSelectorObj} APPOINTMENT_TYPE.phone.labelElement() - phone's label selector (need to click on it)
     *
     * @property {Object} APPOINTMENT_TYPE.chat - Object to deal with chat appointment
     * @property {String} APPOINTMENT_TYPE.chat.name - the name of chat appointment we use in info
     * @property {cssSelectorObj} APPOINTMENT_TYPE.chat.inputElement() - chat's input selector (need to check the state)
     * @property {cssSelectorObj} APPOINTMENT_TYPE.chat.labelElement() - chat's label selector (need to click on it)
     */
    this.APPOINTMENT_TYPE = {
      store: {
        name: 'storeService',
        inputElement() {
          return $('input#storeService');
        },
        labelElement() {
          return $('[for="storeService"]');
        },
      },
      virtual: {
        name: 'virtualService',
        inputElement() {
          return $('input#virtualService');
        },
        labelElement() {
          return $('[for="virtualService"]');
        },
      },
      phone: {
        name: 'phoneService',
        inputElement() {
          return $('input#phoneService');
        },
        labelElement() {
          return $('[for="phoneService"]');
        },
      },
      chat: {
        name: 'chatService',
        inputElement() {
          return $('input#chatService,input#virtualService');
        },
        labelElement() {
          return $('[for="chatService"],[for="virtualService"]');
        },
      },
    };
  }

  /** @type {Boolean} */
  get hasWidgetPrivacyPolicyLnk() { return config.get('widget.appRequest.hasPrivacyPolicyLnk'); }

  /** @type {Boolean} */
  get hasWidgetSubscribeOpt() { return config.get('widget.appRequest.hasSubscribeOpt'); }

  /** has phone option in appt type
   * @type {Boolean} */
  get hasPhoneAppntTypeOpt() { return config.get('widget.appRequest.appntType.hasPhone'); }

  /** has Live chat option in appt type
   * @type {Boolean} */
  get hasLiveChatAppntTypeOpt() { return config.get('widget.appRequest.appntType.hasLiveChat'); }

  /** has In Store option in appt type
   * @type {Boolean} */
  get hasInStoreAppntTypeOpt() { return config.get('widget.appRequest.appntType.hasInStore'); }

  /** has In Store option in appt type
   * @type {Boolean} */
  get hasVirtualAppntTypeOpt() { return config.get('widget.appRequest.appntType.hasVirtual'); }

  /** @type {cssSelectorObj} */
  get nextMonthButton() { return $('span.ui-icon.ui-icon-circle-triangle-e'); }

  /**  @type {cssSelectorArr} */
  get daysInCalendar() { return $$('a.ui-state-default'); }

  /** @type {cssSelectorObj} */
  get appntChoosenTime() { return $('#choosenTime'); }

  /** @type {cssSelectorObj} */
  get extraInfo() { return $('#extraInfo'); }

  /** @type {cssSelectorObj} */
  get closeBtn() { return $('div#appointmentModal button.proper-icon-close'); }

  /** appt request option is on the 4 possible options on modal window
      @type {cssSelectorObj} */
  get apptRequestOpt() { return $('a#landing-appointment-link'); }

  /** @type {cssSelectorObj} */
  get appntDateFld() { return $('#choosenDatePlaceholder'); }

  /** @type {cssSelectorObj} */
  get custPhone() { return $('#phone'); }

  /** @type {cssSelectorObj} */
  get sendButton() { return $('button.btn.btn-retailer-type-1.fn-trigger-save.global-services__button'); }

  /** @type {cssSelectorObj} */
  get appntBox() { return $('#AtAppointmentTitle'); }

  /** @type {cssSelectorObj} */
  get appntDate() { return $('#choosenDatePlaceholder'); }

  /** clickOnApptRequestOpt - click on Appt request on modal window */
  clickOnApptRequestOpt() {
    this.selectIFrame(this.chatRequestIframeId, { hasParentFrame: true, pauseTime: 500 });
    this.apptRequestOpt.click();
    browser.pause(500);
  }

  /**
   * requestAppointmentByType() creates a PS request while filling all given fieldsce TRU
   * @param {object} appointmentTypeObj to indicate the appointment request type, 'APPOINTMENT_TYPE.chat',
   * 'APPOINTMENT_TYPE.phone', 'APPOINTMENT_TYPE.store'
   * @param {String} appntReqDataObj.email to enter in the dialog
   * @param {String} appntReqDataObj.info (optional) extra info to enter in the dialog
   * @param {String} appntReqDataObj.name (optional) name of customer to enter in the dialog
   * @param {String} appntReqDataObj.phone (optional - not present for all retailers) customer's phone number
   */
  requestAppointmentByType(appointmentTypeObj, appntReqDataObj) {
    // seting default value if they doesn't exist in appntReqData object
    const email = appntReqDataObj.email || 'qatest+requestappnt@salesfloor.net';
    const phone = appntReqDataObj.phone || '+15145551212';
    const info = appntReqDataObj.info || '';

    const fingerprint = this.fingerprint('appnt', (email === '' ? 's' : 'e'));

    this.selectLandingFrameIfExists();
    this.appntDateFld.waitForEnabled();
    // FIXME find a solution to check when the option selected is not available

    let appointmentTypeObjToUse;
    browser.pause(1000);
    if (appointmentTypeObj.inputElement().isEnabled()) {
      appointmentTypeObjToUse = appointmentTypeObj;
      appointmentTypeObjToUse.labelElement().click();
    } else { // specific appointment is disabled, so send by default
      appointmentTypeObjToUse = this.getDefaultActiveRequestAppType();
    }

    this.appntDateFld.waitForEnabled();

    // Wait for time field to be populated...
    browser.pause(500);
    this.appntDateFld.click();
    this.nextMonthButton.waitForDisplayed();
    this.nextMonthButton.click();
    this.daysInCalendar[this.daysInCalendar.length - 1].click();
    this.appntChoosenTime.selectByIndex(1);

    this.setSpecialty();

    this.emailField.setValue(email);
    browser.pause(500);
    if (this.custPhone.isDisplayed()) {
      this.custPhone.setValue(phone);
    }
    if (this.hasWidgetPrivacyPolicyLnk) {
      // privacy policy checkbox
      this.markPDCheckBox();
    } else if (this.hasWidgetSubscribeOpt) {
      // check subscriber checkbox
      this.subscriberCbx.click();
    }
    this.scrollToBottom();
    this.extraInfo.setValue(`${info} (${appointmentTypeObjToUse.name}) (${fingerprint})`);
    if (appntReqDataObj.name) {
      this.customerNameTxt.setValue(appntReqDataObj.name);
    }

    browser.pause(1000);
    this.sendButton.click();
    browser.pause(500);
  }

  /**
   * Randomly returns a random appointment type that turned on in config
   * @return {Object} Appointment like: APPOINTMENT_TYPE.chat|APPOINTMENT_TYPE.store|APPOINTMENT_TYPE.phone
   */
  getAppointmentTypeByRandom() {
    const enabledTypes = [];
    if (this.hasInStoreAppntTypeOpt) {
      enabledTypes.push(this.APPOINTMENT_TYPE.store);
    }
    if (this.hasVirtualAppntTypeOpt) {
      enabledTypes.push(this.APPOINTMENT_TYPE.virtual);
    }
    if (this.hasPhoneAppntTypeOpt) {
      enabledTypes.push(this.APPOINTMENT_TYPE.phone);
    }
    if (this.hasLiveChatAppntTypeOpt) {
      enabledTypes.push(this.APPOINTMENT_TYPE.chat);
    }
    return enabledTypes[Math.floor(Math.random() * enabledTypes.length)];
  }

  /**
   * Returns the active Appointment type by default
   * @return {Object} Appointment like: APPOINTMENT_TYPE.chat|APPOINTMENT_TYPE.store|APPOINTMENT_TYPE.phone
   */
  getDefaultActiveRequestAppType() {
    const availableAppTypesObj = [this.APPOINTMENT_TYPE.chat, this.APPOINTMENT_TYPE.phone, this.APPOINTMENT_TYPE.store];
    for (let i = 0; i < availableAppTypesObj.length; i++) {
      if (availableAppTypesObj[i].inputElement().isSelected()) {
        return availableAppTypesObj[i];
      }
    }
    return undefined; // return undefined intentionally cause we shouldn't be here
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
   * scrollToBottom() scrolls the page to the bottom. Seems webdriver.io scroll command no longer
   * works with some webdrivers...
   */
  scrollToBottom() {
    browser.execute(() => {
      // eslint-disable-next-line no-undef
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    });
  }

  /**
   * close on Appnt Request Widget
   */
  closeAppntRequestWidget() {
    browser.switchToParentFrame();
    this.closeBtn.click();
  }
}
module.exports = new AppntRequest();

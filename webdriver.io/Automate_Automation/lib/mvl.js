const config = require('config');
const PageLib = require('./pagelib');

/**
 * Lure Class page
 *
 * @class Lure
 * @classdesc Library of Lure widget
 * @extends PageLib
 */
class Marketview extends PageLib {
  /**
       * define selectors using getter methods
       */

  /** @type {cssSelectorObj} */
  get popupIframe() { return config.get('popup.iFramePopup'); }

  get close() { return $(config.get('popup.clickClosePopup')); }

  /** @type {cssSelectorObj} */
  get clickTakeQuizBtn() { return $(config.get('Quiz.clickOnTakeQuiz')); }

  get acceptButton() { return $(config.get('env.acceptCookieBtn')); }

  get lureIframeId() { return config.get('env.lureIframeId'); }

  get pcaskinPopup() { return $(config.get('banner.clickclosePcaSkinPopup'));}

  get clickRgimenBtn(){return $(config.get('regimen.clickOnRegimenBtn'));}
  
  get accptbtn(){return $(config.get('accept.btn'));}

  get ageVerification(){return $(config.get('ageVerification.clickAgeVerification'));}

  findProductElement(productName) {
    return $(`//span[text()="${productName}"]`);
  }

  switchToIframeTitle(iframeElement) {
    iframeElement.waitForDisplayed();
    browser.switchToFrame(iframeElement);
    browser.pause(500);
  }

  buttonWithText(text) {
    browser.pause(5000);  // required for mvl in case of low option
    return $(`//button/*[text() = "${text}"]/..`);
  }

  clickButtonWithText(text) {
    browser.pause(2000);
    //browser.waitUntil(() => this.buttonWithText, { timeout : 20000, interval : 500 });
    const button = this.buttonWithText(text);
    button.click();
  }

  clickOnAcceptCookieBtn() {
    if(this.acceptButton !=''){
      browser.waitUntil(() => this.acceptButton, { timeout : 6000, interval : 500 });
      if (this.acceptButton.isDisplayed()) {
        this.acceptButton.click();
       }
    }
  }

  clickClosePopup() {
    browser.pause(10000);
    if(this.popupIframe !='' & $(this.popupIframe).isExisting()){;
      this.selectIFrame(this.popupIframe); 
      //browser.waitUntil(() => this.close, { timeout : 10000, interval : 500 });  // doesn't work in pcaskin
      this.close.click();
    }
    else if(this.close.isExisting()){
      console.log("inside popup");
      //browser.waitUntil(() => this.close, { timeout : 10000, interval : 500 });    // doesn't work in pcaskin
      this.close.click();
      console.log("outside popup");
    }
    // this.acceptButton.click();----------this is accept btn for soundstrue
  }

  openBanner(){
   browser.pause(10000);
   //this.pcaskinPopup.click();
   console.log("inside openbanner");
   //browser.pause(10000);
   if(this.ageVerification.isExisting()){
    this.ageVerification.click();
   }
   //browser.waitUntil(() => this.clickTakeQuizBtn, { timeout : 3000, interval : 500 });  // doesn't work in pcaskin
   this.clickTakeQuizBtn.click();
   console.log("clicked on take quiz");
   this.selectIFrame(this.lureIframeId);
  }
}

module.exports = new Marketview();

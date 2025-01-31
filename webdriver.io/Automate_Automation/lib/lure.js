const config = require('config');
const PageLib = require('./pagelib');

/**
 * Lure Class page
 *
 * @class Lure
 * @classdesc Library of Lure widget
 * @extends PageLib
 */
class Lure extends PageLib {
  /**
       * define selectors using getter methods
       */

  /** @type {cssSelectorObj} */
  get popupIframe() { return $(config.get('popup.iFramePopup')); }

  get closePopup() { return $(config.get('popup.clickClosePopup')); }

  get clickTakeQuizBtn() { return $(config.get('quiz.clickOnTakeQuiz')); }

  get scrollDown() { return config.get('scrollSelector.Filorga'); }

  get clickLureBtn() { return $(config.get('lure.clickOnlure')); }

  get acceptButton() { return $(config.get('env.acceptCookieBtn')); }

  get lureIframeId() { return config.get('env.lureIframeId'); }

  get pcaskinPopup() { return $(config.get('banner.clickclosePcaSkinPopup')); }

  get clickRgimenBtn() { return $(config.get('regimen.clickOnRegimenBtn')); }

  get accptbtn() { return $(config.get('accept.btn')); }

  get ageVerification() { return $(config.get('ageVerification.clickAgeVerification')); }

  findProductElement(productName) {
    $(`//span[text()="${productName}"]`).waitForDisplayed({ timeout : 30000 });
    return $(`//span[text()="${productName}"]`);
  }

  switchToIframeTitle(iframeElement) {
    iframeElement.waitForDisplayed();
    this.selectIFrame(iframeElement);
  }

  buttonWithText(text) {
    $(`//button/*[text() = "${text}"]/..`).waitForDisplayed({ timeout : 30000 });
    return $(`//button/*[text() = "${text}"]/..`);
  }

  clickButtonWithText(text) {
    const button = this.buttonWithText(text);
    button.click();
  }

  clickOnAcceptCookieBtn() {
    if (this.acceptButton !== '') {
      browser.waitUntil(() => this.acceptButton, { timeout : 6000, interval : 500 });
      if (this.acceptButton.isDisplayed()) {
        this.acceptButton.click();
      }
    }
  }

  clickClosePopup() {
    if (this.popupIframe !== '' && this.popupIframe.isExisting()) {
      this.selectIFrame(this.popupIframe);
      this.closePopup.click();
    } else if (this.closePopup.isExisting()) {
      this.closePopup.click();
    }
  }

  openLure() {
    this.selectIFrame(this.lureIframeId);
    this.clickLureBtn.waitForDisplayed({ timeout : 5000 });
    this.clickLureBtn.click();
  }

  openBanner() {
    if (this.clickTakeQuizBtn.isDisplayedInViewport()) {
      this.clickTakeQuizBtn.moveTo();
    }
    this.clickTakeQuizBtn.waitForClickable();
    this.clickTakeQuizBtn.click();
    this.selectIFrame(this.lureIframeId);
  }
}

module.exports = new Lure();

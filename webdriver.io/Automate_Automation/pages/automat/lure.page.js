const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class Lure extends Page {
  /**
       * define selectors using getter methods
       */
  get clickOnLure() {
    return $('.css-17r89so');
  }

  get iFrame() {
    // return $('//iframe[@id="automat-webchat-0a2c72bb-3ea8-43d8-89d3-51810ac85662"]');
    return $('#automat-webchat-0a2c72bb-3ea8-43d8-89d3-51810ac85662');
  }

  get blondeRepairShampoo() {
    return $('//span[text()="bust your brass cool blonde repair shampoo"]');
  }

  async click_button_with_text(text) {
    const button = await this.button_with_text(text);
    await button.click();
  }

  /**
       * a method to encapsule automation code to interact with the page
       * e.g. to login using username and password
       */
  async button_with_text(text) {
    await expect($(`//button/*[text() = "${text}"]/..`)).toBeExisting();
    return await $(`//button/*[text() = "${text}"]/..`);
  }

  async openLure() {
    await expect(browser.$("//iframe[@title='Virtual Product Advisor']")).toBeExisting();
    const webchatFrame = await browser.$("//iframe[@title='Virtual Product Advisor']");
    await browser.switchToFrame(webchatFrame);
    await this.clickOnLure.click();
  }

  async is_blondeRepairShampoo_recommended() {
    await expect(browser.$("//span[text()='bust your brass cool blonde repair shampoo']")).toBeExisting();
    const isExisting = await browser.$("//span[text()='bust your brass cool blonde repair shampoo']").isExisting()
    console.log(isExisting);
  }

  async is_velveteenShampoo_recommended() {
    await expect(browser.$("//span[text()='velveteen dream smoothing shampoo']")).toBeExisting();
    const isExisting = await browser.$("//span[text()='velveteen dream smoothing shampoo']").isExisting()
    console.log(isExisting);
  }

  open() {
    return super.open(`https://loveamika.com/`);
  }
}

module.exports = new Lure();

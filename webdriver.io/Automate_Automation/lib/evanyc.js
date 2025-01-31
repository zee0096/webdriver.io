const PageLib = require('./pagelib');

/**
 * Lure Class page
 *
 * @class Lure
 * @classdesc Library of Lure widget
 * @extends PageLib
 */
class Eva extends PageLib {
    /**
     * define selectors using getter methods
     */

    /** @type {cssSelectorObj} */
    get lureIframe() { return 'automat-webchat-66612fdb-1126-4f7a-b8e6-8ea3f01f9a91'; }

    /** @type {cssSelectorObj} */
    get clickOnLure() { return $('.css-1g5cbd7'); }

    get acceptButton() { return $('//button[text()="Accept"]') }

    findProductElement(productName) {
        return $(`//span[text()="${productName}"]`);
    }

    webchat_button_with_text(text) {
        browser.pause(2000);
        return $(`//button/*[text() = "${text}"]/..`);
    }

    click_webchat_button_with_text(text) {
        browser.pause(2000);
        const button = this.webchat_button_with_text(text);
        button.click();
    }

    openLure() {
        this.acceptButton.click(); 
        this.selectIFrame(this.lureIframe);
        this.clickOnLure.waitForDisplayed({ timeout: 3000 });
        this.clickOnLure.click();
    }

}

module.exports = new Eva();

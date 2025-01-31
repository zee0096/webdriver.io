const { VAST_TAG } = require('../constants/constants');

class ActionsPage {
    get allowNotificationsButton() { return $('//XCUIElementTypeButton[@name="Allow"]'); }
    get enterURLTextField() { return $('//XCUIElementTypeTextField'); }
    get submitButton() { return $('//XCUIElementTypeButton[@name="Submit"]'); }
    get playButton() { return $('//XCUIElementTypeStaticText[@name="Play"]'); }
    get pauseButton() { return $('//XCUIElementTypeStaticText[@name="Pause"]'); }
    get notificationShortLookView() { return $('//XCUIElementTypeOther[@name="NotificationShortLookView"]'); }
    get linkOpenInWeb() { return $("//XCUIElementTypeLink[@name='Home, Starbucks']"); }
    get accessContactsPopupOkButton() { return $('//XCUIElementTypeButton[@name="OK"]'); }
    get mapAllowPopUp() { return $('//XCUIElementTypeStaticText[@name="Allow “Maps” to use your location?"]'); }
    get allowOnceBtnOnPopUp() { return $('//XCUIElementTypeButton[@name="Allow Once"]'); }

    /**
   * Clicks the 'Allow Notifications' button.
   * Waits for the button to be displayed, checks if it has the text 'Allow',
   * and then clicks it.
   */

    async clickAllowNotificationsButton() {
        await expect(this.allowNotificationsButton).toBeDisplayed();
        expect(this.allowNotificationsButton).toHaveText('Allow');
        await this.allowNotificationsButton.click();
    }

    /**
  * Enters a URL in the text field and clicks the Submit button.
  * Waits for the text field and Submit button to be displayed.
  * @param {string} vastTag - The VAST_TAG value to append to the URL.
  */
    async enterURL(vastTag) {

        // Waiting for element to be displayed
        await expect(this.enterURLTextField).toBeDisplayed();
        await this.enterURLTextField.setValue(`${VAST_TAG}${vastTag}`);
    }

    /**
     * Clicks the Submit button.
     * Waits for the Submit button to be displayed.
     */
    async clickSubmitButton() {
        const submitBtn = await $('//XCUIElementTypeButton[@name="Submit"]'); 

        // Waiting for element to be displayed
        await expect(submitBtn).toBeDisplayed();
        submitBtn.click()
    }

    /**
     * Clicks the Play button and then waits for the Pause button.
     * Waits for both buttons to be displayed.
     */
    async clickPlayButtonAndPause() {
        // Waiting for element to be displayed
        await expect(this.playButton).toBeDisplayed();
        await this.playButton.click();
        await expect(this.pauseButton).toBeDisplayed();
    }

    /**
     * Simulates pressing the home button using browser.execute.
     */

    async simulateHomeButton() {
        await browser.execute('mobile: pressButton', { name: 'home' });
    }

    /**
     * Clicks on the Notification Short Look View.
     * Waits for the view to be displayed.
     */

    async clickNotificationShortLookView() {
        // Waiting for element to be displayed
        await expect(this.notificationShortLookView).toBeDisplayed();
        await this.notificationShortLookView.click();
    }

     /**
     * Waits for the view to be displayed.
     */
     async verifyLinkOpenInBrowser() {
        const browserBottomToolbarMenu = await $('//XCUIElementTypeToolbar[@name="BottomBrowserToolbar"]');
        await expect(browserBottomToolbarMenu).toBeDisplayed()
    }

 /**
     * Clicks on the Notification Short Look View.
     * Waits for the view to be displayed.
     */
 async clickAccessContactsPopupOkButton() {
    // Waiting for element to be displayed
    await expect(this.accessContactsPopupOkButton).toBeDisplayed()
    await this.accessContactsPopupOkButton.click();
}

 /**
     * Clicks on the Notification Short Look View.
     * Waits for the view to be displayed.
     */
 async clickAllowOnceButtonOnPopUp() {
    await expect(this.allowOnceBtnOnPopUp).toBeDisplayed()

    await this.allowOnceBtnOnPopUp.click();
}

 /**
     * Waits for the view to be displayed.
     */
 async verifyBrowserIsDisplayed() {
    const browserBottomToolbarMenu = await $('//XCUIElementTypeToolbar[@name="BottomBrowserToolbar"]'); 
    await expect(browserBottomToolbarMenu).toBeDisplayed()
}
 /**
     * Waits for the view to be displayed.
     */
 async verifyMapIsDisplayed() {
    await expect(this.mapAllowPopUp).toBeDisplayed()
}
 /**
     * Waits for the view to be displayed.
     */
 async verifyBarCodeIsDisplayed() {
    const barCode = await $('//XCUIElementTypeImage[contains(@name , "Barcode")]'); 
    await expect(barCode).toBeDisplayed()
}
 /**
     * Waits for the view to be displayed.
     */
 async verifySearchResultsOnMap() {
    const searchResultsOnMap = await $('//XCUIElementTypeOther[@name="ResultsTitleView"]'); 
    await expect(searchResultsOnMap).toBeDisplayed()
}
 /**
     * Waits for the view to be displayed.
     */
 async verifyFromToDirectionComponentOnMap() {
    const fromToDirectionComponent = await $('//XCUIElementTypeStaticText[@name="From"]//parent::XCUIElementTypeOther'); 
    await expect(fromToDirectionComponent).toBeDisplayed()
}
      /**
     * Waits for the view to be displayed.
     */
      async verifyContactsOpen() {
        /**
        TODO:- App is able to create new contact but contact app is not opened.
        */

        throw new Error('pp is able to create new contact but contact app is not opened')
    }

     /**
     * Waits for the view to be displayed.
     */
     async verifyCallOpen() {

        /**
        TODO:- Unable to open call in simulator.
        */

        throw new Error('Unable to open call in simulator')
       
    }
    
}

module.exports = new ActionsPage;
var assert = require('assert');
const ActionsPage = require('../../pageobjects/ActionsPage');

describe('MozIM SDK Tester App', () => {

	describe('MozIM SDK Tester App Runs', () => {
		beforeEach(async () => {
			// Launch the app on the iOS device
			await browser.launchApp();
		});
		it('As a user, I verify that when the user clicks on the notification, the browser opens', async () => {
			const vastTagValue = "2f2a1b7d-d8bc-4245-9962-84301eb4ecae";

			await ActionsPage.clickAllowNotificationsButton();

			await ActionsPage.enterURL(vastTagValue);
			
			await ActionsPage.clickSubmitButton();
			
			await ActionsPage.clickPlayButtonAndPause();

			await ActionsPage.simulateHomeButton();

			await ActionsPage.clickNotificationShortLookView();

			await ActionsPage.verifyLinkOpenInBrowser();

		});

		it('As a user, I verify that when the user clicks on the notification, the Call opens', async () => {
			const vastTagValue = "9914cfbb-8be5-4371-9c3f-97d4afb50df6";

			await ActionsPage.clickAllowNotificationsButton();

			await ActionsPage.enterURL(vastTagValue);
			
			await ActionsPage.clickSubmitButton();
			
			await ActionsPage.clickPlayButtonAndPause();

			await ActionsPage.simulateHomeButton();

			await ActionsPage.clickNotificationShortLookView();

			await ActionsPage.verifyCallOpen();

		});

		it('As a user, I verify that when the user clicks on the notification, the no display after save, no confirmation', async () => {
			const vastTagValue = "240fde9d-d4d1-44ed-996a-fda1528ccfb0";

			await ActionsPage.clickAllowNotificationsButton();

			await ActionsPage.enterURL(vastTagValue);
			
			await ActionsPage.clickSubmitButton();
			
			await ActionsPage.clickPlayButtonAndPause();

			await ActionsPage.simulateHomeButton();

			await ActionsPage.clickNotificationShortLookView();

			await ActionsPage.clickAccessContactsPopupOkButton();

		});

		it('As a user, I verify that when the user clicks on the notification, the Contacts opens', async () => {
			const vastTagValue = "5cfa7ca2-d5a6-4028-ac01-cd227b4a93e9";

			await ActionsPage.clickAllowNotificationsButton();

			await ActionsPage.enterURL(vastTagValue);
			
			await ActionsPage.clickSubmitButton();
			
			await ActionsPage.clickPlayButtonAndPause();

			await ActionsPage.simulateHomeButton();

			await ActionsPage.clickNotificationShortLookView();

			await ActionsPage.clickAccessContactsPopupOkButton();

			await ActionsPage.verifyContactsOpen();

		});

		it('As a user, I verify that when the user clicks on the notification, Open App Listing Page in Browser', async () => {
			const vastTagValue = "67f0f7c2-f5b8-43c3-a6e3-ca36cad77f85";

			await ActionsPage.clickAllowNotificationsButton();

			await ActionsPage.enterURL(vastTagValue);
			
			await ActionsPage.clickSubmitButton();
			
			await ActionsPage.clickPlayButtonAndPause();

			await ActionsPage.simulateHomeButton();

			await ActionsPage.clickNotificationShortLookView();

			await ActionsPage.verifyBrowserIsDisplayed();

		});

		it('As a user, I verify that when the user clicks on the notification, Open Nearby Locations in Maps app', async () => {
			const vastTagValue = "bd77edea-1eba-481f-8b9c-144b9f661a95";

			await ActionsPage.clickAllowNotificationsButton();

			await ActionsPage.enterURL(vastTagValue);
			
			await ActionsPage.clickSubmitButton();
			
			await ActionsPage.clickPlayButtonAndPause();

			await ActionsPage.simulateHomeButton();

			await ActionsPage.clickNotificationShortLookView();

			await ActionsPage.verifyMapIsDisplayed();

			await ActionsPage.clickAllowOnceButtonOnPopUp();

			await ActionsPage.verifySearchResultsOnMap();

		});

		it('As a user, I verify that when the user clicks on the notification, Open Directions in Maps app', async () => {
			const vastTagValue = "52fd4a67-b55c-4fcf-a183-84b59148f12a";

			await ActionsPage.clickAllowNotificationsButton();

			await ActionsPage.enterURL(vastTagValue);
			
			await ActionsPage.clickSubmitButton();
			
			await ActionsPage.clickPlayButtonAndPause();

			await ActionsPage.simulateHomeButton();

			await ActionsPage.clickNotificationShortLookView();

			await ActionsPage.verifyMapIsDisplayed();

			await ActionsPage.clickAllowOnceButtonOnPopUp();

			await ActionsPage.verifyFromToDirectionComponentOnMap();

		});
		it('As a user, I verify that when the user clicks on the notification, Save Image to Gallery', async () => {
			const vastTagValue = "b8582ba5-86a9-4564-b62b-11e688712468";

			await ActionsPage.clickAllowNotificationsButton();

			await ActionsPage.enterURL(vastTagValue);
			
			await ActionsPage.clickSubmitButton();
			
			await ActionsPage.clickPlayButtonAndPause();

			await ActionsPage.simulateHomeButton();

			await ActionsPage.clickNotificationShortLookView();

			await ActionsPage.clickAccessContactsPopupOkButton();


			/** 
			 * Note:- Photo is saved to gallery but Photo app is not opened
			 * todo:- After flow is corrected collect and add locators to verify photo is saved and photo app is opened
			 * */

			throw new Error('Photo app is not opened after permission is granted')

		});
		it('As a user, I verify that when the user clicks on the notification, Send an Email', async () => {
			const vastTagValue = "30286a23-0aab-45db-a694-06bd114bc0d1";

			await ActionsPage.clickAllowNotificationsButton();

			await ActionsPage.enterURL(vastTagValue);
			
			await ActionsPage.clickSubmitButton();
			
			await ActionsPage.clickPlayButtonAndPause();

			await ActionsPage.simulateHomeButton();

			await ActionsPage.clickNotificationShortLookView();

			/** 
			 * Note:- App is Crashing After Clicking on Notification
			 * todo:- Collect locator and Execute last step to verify Email is Open after clicking notification 
			 * */

			throw new Error('App is Crashing and unable collect locator to verify Email')
		});
		it('As a user, I verify that when the user clicks on the notification, Add to Wallet', async () => {
			const vastTagValue = "4df36011-d15b-46c5-8c6c-84fe2a51b4e3";

			await ActionsPage.clickAllowNotificationsButton();

			await ActionsPage.enterURL(vastTagValue);
			
			await ActionsPage.clickSubmitButton();
			
			await ActionsPage.clickPlayButtonAndPause();

			await ActionsPage.simulateHomeButton();

			await ActionsPage.clickNotificationShortLookView();

			await ActionsPage.verifyBarCodeIsDisplayed();

		});

		afterEach(async () => {
			// Quit the WebDriver session after each test case
			await browser.closeApp();
			// await browser.deleteSession();
		  });
	});
});

//XCUIElementTypeOther[@name="ResultsTitleView"]
//XCUIElementTypeButton[@name="Allow Once"]
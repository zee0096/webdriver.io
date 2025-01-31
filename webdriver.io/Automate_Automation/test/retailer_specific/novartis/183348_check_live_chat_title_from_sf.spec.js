const StorefrontPage = require('../../../pages/storefront.page');
const speclib = require('../../../lib/speclib');
const ChatAvailabilityPage = require('../../../pages/backoffice/chatavailability.page');

speclib.descSkipIf(StorefrontPage.RETAILER !== 'novartis')(`${StorefrontPage.RETAILER} 
  Live Chat from Storefront title verification`, () => {
  it(`C183348 As a Customer, I should see "Therapeutic Expert" text 
    as Representative name when initiating a "Live Chat" request from the storefront`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('183348');


    speclib.addStepAutoNumber('Open BO page');
    ChatAvailabilityPage.openBoAndLoginByRole(ChatAvailabilityPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Turn On the leaver for available for chat');
    ChatAvailabilityPage.turnAvailableForChatTo(true);

    speclib.addStepAutoNumber('Open storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, true);

    speclib.addStepAutoNumber('Validate Chat has available status in storefront');
    expect(StorefrontPage.chatAvailableStatus()).toBeTruthy();

    speclib.addStepAutoNumber('Click on Live Chat link');
    StorefrontPage.clickLiveChatLink();

    speclib.addStepAutoNumber('Verify Live Chat text');

    const title = $('h1#AtChatTitle');
    title.waitForExist();

    const textToCheck = {
      en_US : 'Chat now with a Scientific Engagement Manager',
      fr_CA : 'Discuter en ligne avec un chargé d’engagement scientifique'
    };

    expect(title.getText()).toContain(textToCheck[`${StorefrontPage.LOCALE}`]);
  });
});

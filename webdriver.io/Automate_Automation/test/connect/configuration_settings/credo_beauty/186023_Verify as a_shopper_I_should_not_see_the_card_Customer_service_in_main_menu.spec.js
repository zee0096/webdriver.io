/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../../lib/webChat');
const speclib = require('../../../../lib/speclib');
const shoppingPage = require('../../../../pages/salestracking/shopping.page');

speclib.descSkipIf(speclib.RETAILER !== 'credobeauty')(`${speclib.RETAILER} 
Sales floor Project`, () => {
  it('C186023 Verify as a shopper I should not see the card Customer service in main menu', () => {
    speclib.addTestId('186023');
    speclib.addModule(speclib.ALLURE.module.storefront);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber(`Open ${speclib.RETAILER} page`);

    speclib.addStepAutoNumber(shoppingPage.getShoppingUrl);
    speclib.openWebPage(shoppingPage.getShoppingUrl);

    speclib.addStepAutoNumber('validating Chatbot');
    expect(webChat.isChatbotDisplayed()).toBeExisting();

    speclib.addStepAutoNumber('click on Chatbot');
    webChat.clickOnChatbot();

    speclib.addStepAutoNumber(webChat.readMessage(1));
    expect(webChat.readMessageNumber(1)).toBeExisting();

    speclib.addStepAutoNumber("verify 'Main menu' displaying");
    expect(webChat.imLookingForAnInStore).toBeExisting();

    speclib.addStepAutoNumber("verify 'customer Service Menu' Card is hidden on menu");
    expect(webChat.customerServiceMenuCard).not.toBeDisplayed();
  });
});

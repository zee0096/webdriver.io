/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../../lib/webChat');
const speclib = require('../../../../lib/speclib');
const shoppingPage = require('../../../../pages/salestracking/shopping.page');
const sidebarPage = require('../../../../pages/sidebar.page');

speclib.descSkipIf(speclib.RETAILER !== 'credobeauty')(`${speclib.RETAILER} 
Sales floor Project`, () => {
  it('C186022 Verify that get a reply by SMS option is hidden in find a rep widget.', () => {
    speclib.addTestId('C186022');
    speclib.addModule(speclib.ALLURE.module.storefront);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber(shoppingPage.getShoppingUrl);
    speclib.openWebPage(shoppingPage.getShoppingUrl);

    speclib.addStepAutoNumber('click on Store Link');
    sidebarPage.defaultStoreLnk.click();

    speclib.addStepAutoNumber('validating Chatbot');
    expect(webChat.isChatbotDisplayed()).toBeExisting();

    speclib.addStepAutoNumber('click on Chatbot');
    webChat.clickOnChatbot();

    speclib.addStep(webChat.readMessage(1));
    expect(webChat.readMessageNumber(1)).toBeExisting();

    speclib.addStepAutoNumber("verify 'main menu' displaying");
    expect(webChat.cardsOnMainMenu).toBeExisting();

    speclib.addStepAutoNumber(webChat.getVerifiedMessage(webChat.imLookingForAnInStore));
    expect(webChat.imLookingForAnInStore).toBeExisting();

    speclib.addStepAutoNumber("click on 'I am looking for an in-store stylist' card");
    webChat.imLookingForAnInStore.click();

    speclib.addStep(webChat.readMessage(3));
    expect(webChat.readMessageNumber(3)).toBeExisting();

    speclib.addStepAutoNumber('Select the rep and click on connect button');
    webChat.selecyStoreAndConnect();

    speclib.addStepAutoNumber('Verify Get a reply by SMS option is hidden when live chat is failed ');
    expect(webChat.getAReplyWithSmsOption).not.toBeExisting();
  });
});

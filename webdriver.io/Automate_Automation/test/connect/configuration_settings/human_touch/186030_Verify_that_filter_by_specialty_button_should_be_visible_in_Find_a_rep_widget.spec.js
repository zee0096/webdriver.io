/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../../lib/webChat');
const speclib = require('../../../../lib/speclib');
const shoppingPage = require('../../../../pages/salestracking/shopping.page');
const sidebarPage = require('../../../../pages/sidebar.page');

speclib.descSkipIf(speclib.RETAILER !== 'humantouch')(`${speclib.RETAILER} 
Sales floor Project`, () => {
  it('C186030 Verify that "filter by specialty" button should be visible in "Find a rep" widget', () => {
    speclib.addTestId('186030');
    speclib.addModule(speclib.ALLURE.module.storefront);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber(`Open ${speclib.RETAILER} page`);

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

    speclib.addStepAutoNumber('click on Next Item Button');
    webChat.clickOnNextItemButton();

    speclib.addStepAutoNumber('click on Next Item Button');
    webChat.clickOnNextItemButton();

    speclib.addStepAutoNumber(webChat.getVerifiedMessage(webChat.imLookingForAnInStore));
    expect(webChat.imLookingForAnInStore).toBeExisting();

    speclib.addStepAutoNumber("click on 'I am looking for an in-store stylist' card");
    webChat.imLookingForAnInStore.click();

    speclib.addStep(webChat.readMessage(3));
    expect(webChat.readMessageNumber(3)).toBeExisting();

    speclib.addStepAutoNumber('verify Specialty question is asked');
    expect(webChat.specialityOptions).toBeExisting();
  });
});

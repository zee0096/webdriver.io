/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../../lib/webChat');
const speclib = require('../../../../lib/speclib');
const shoppingPage = require('../../../../pages/salestracking/shopping.page');
const sidebarPage = require('../../../../pages/sidebar.page');

speclib.descSkipIf(speclib.RETAILER !== 'allenedmonds')(`${speclib.RETAILER} 
Sales floor Project`, () => {
  it('C185954 Verify that specialty question should be skipped in book an appointment flow', () => {
    speclib.addTestId('185954');
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

    speclib.addStepAutoNumber(webChat.getVerifiedMessage(webChat.iWantShedulAnAppointment));
    expect(webChat.iWantShedulAnAppointment).toBeExisting();

    speclib.addStepAutoNumber("click on 'I want schedule an appointment' Option");
    webChat.iWantShedulAnAppointment.click();

    speclib.addStepAutoNumber("click on 'in a store' Options");
    webChat.inAStoreOptions.click();

    speclib.addStep(webChat.readMessage(5));
    expect(webChat.readMessageNumber(5)).toBeExisting();
  });
});

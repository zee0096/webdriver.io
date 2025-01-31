/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../../lib/webChat');
const speclib = require('../../../../lib/speclib');
const shoppingPage = require('../../../../pages/salestracking/shopping.page');
const sidebarPage = require('../../../../pages/sidebar.page');

speclib.descSkipIf(false)(`${speclib.RETAILER} 
Sales floor Project`, () => {
  it('C185957 Verify that while sending a message to an associate, specialty question should be skipped', () => {
    
    speclib.addTestId('185957');
    speclib.addModule(speclib.ALLURE.module.storefront);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber(`Open ${speclib.RETAILER} page`);

    speclib.addStepAutoNumber(shoppingPage.getShoppingUrl);
    speclib.openWebPage("https://allenedmonds-widgets-qa04.salesfloor.net/tests/desktop");

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

    speclib.addStepAutoNumber(webChat.getVerifiedMessage(webChat.iWantToConnectWithAnExper));
    expect(webChat.iWantToConnectWithAnExper).toBeExisting();

    speclib.addStepAutoNumber("click on 'I'm Looking For An InStore Stylist' Option");
    webChat.iWantToConnectWithAnExper.click();

    speclib.addStepAutoNumber("verify 'Filter By Specialty' Button is hidden");
    expect(webChat.filterBySpecialtyButton).not.toBeExisting();
  });
});

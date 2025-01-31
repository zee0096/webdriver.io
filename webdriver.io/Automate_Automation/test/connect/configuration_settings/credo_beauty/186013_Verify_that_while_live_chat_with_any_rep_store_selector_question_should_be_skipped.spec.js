/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../../lib/webChat');
const speclib = require('../../../../lib/speclib');
const NewLeadsPage = require('../../../../pages/backoffice/newleads/newleads.page');
const credentials = require('../../../../credentials.json');
const shoppingPage = require('../../../../pages/salestracking/shopping.page');
const sidebarPage = require('../../../../pages/sidebar.page');

speclib.descSkipIf(false)(`${speclib.RETAILER} 
Sales floor Project`, () => {
  it('C186013 Verify that while live chat with any rep, store selector question should be skipped.', () => {
    speclib.addTestId('186013');
    speclib.addModule(speclib.ALLURE.module.storefront);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber(`Open ${speclib.RETAILER} BackOffice`);
    NewLeadsPage.openBoLoginPage(false);

    speclib.addStepAutoNumber('verify user name text field');
    expect(webChat.userNameTextField).toBeExisting();

    speclib.addStepAutoNumber('verify password text field');
    expect(webChat.passwordTextField).toBeExisting();

    speclib.addStepAutoNumber('enter value in the username text field');
    webChat.enterValueInField(webChat.userNameTextField, credentials.boSellingManagerUsername);

    speclib.addStepAutoNumber('enter value in the password text field');
    webChat.enterValueInField(webChat.passwordTextField, credentials.boOldPassword);

    speclib.addStepAutoNumber('click on sign in button');
    webChat.signInButton.click();

    speclib.addStepAutoNumber('verify home page title');
    expect(webChat.homePageTitle).toBeExisting();

    speclib.addStepAutoNumber('click on available for chat toggle button');
    webChat.clickOnAvailableForChatToggle();

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

    speclib.addStepAutoNumber(webChat.getVerifiedMessage(webChat.iWantConnectWithInStoreStylist));
    expect(webChat.iWantConnectWithInStoreStylist).toBeExisting();

    speclib.addStepAutoNumber("click on 'I want to connect with an in-store stylist' card");
    webChat.iWantConnectWithInStoreStylist.click();

    speclib.addStep(webChat.readMessage(3));
    expect(webChat.readMessageNumber(3)).toBeExisting();

    speclib.addStepAutoNumber("verify 'Chat with an in-store stylist' Option");
    expect(webChat.chatWithInSSOption).toBeExisting();

    speclib.addStepAutoNumber("Click on 'Chat with an in-store stylist' Option");
    webChat.chatWithInSSOption.click();

    speclib.addStepAutoNumber("verify 'asking Store' Option is skipped");
    expect(webChat.anyStoreWorksForMeOption).not.toBeExisting();
  });
});

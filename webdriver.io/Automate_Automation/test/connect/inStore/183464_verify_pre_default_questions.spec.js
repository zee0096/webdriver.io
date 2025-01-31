/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../lib/webChat');
const speclib = require('../../../lib/speclib');
const ShoppingPage = require('../../../pages/salestracking/shopping.page');

describe('Sales floor Project', () => {
  it('C183464 Verify as a user, I should not able to see type option while user seen pre-default questions', () => {
    speclib.addTestId('183464');
    speclib.addModule(speclib.ALLURE.module.salesfloor);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.startStep(`Open ${speclib.RETAILER} page`);

    ShoppingPage.openShoppingPage(true);

    speclib.addStepAutoNumber('validating Chatbot');
    expect(webChat.isChatbotDisplayed()).toBeExisting();

    speclib.addStepAutoNumber('click on Chatbot');
    webChat.clickOnChatbot();

    speclib.addStep(webChat.readMessage(1));
    expect(webChat.readMessageNumber(1)).toBeExisting();

    speclib.addStep(webChat.readMessage(2));
    expect(webChat.readMessageNumber(2)).toBeExisting();

    speclib.addStepAutoNumber(webChat.getVerifiedMessage(webChat.ihaveProductQuestionsOption));
    expect(webChat.ihaveProductQuestionsOption).toBeExisting();

    speclib.addStepAutoNumber('click on Next Item Button');
    webChat.clickOnNextItemButton();

    speclib.addStepAutoNumber('click on Next Item Button');
    webChat.clickOnNextItemButton();

    speclib.addStepAutoNumber(webChat.getVerifiedMessage(webChat.iNeedHelpWithMyOrderOption));
    expect(webChat.iNeedHelpWithMyOrderOption).toBeExisting();

    speclib.addStepAutoNumber('click on Next Item Button');
    webChat.clickOnNextItemButton();

    speclib.addStepAutoNumber(webChat.getVerifiedMessage(webChat.somethingElseOption));
    expect(webChat.somethingElseOption).toBeExisting();

    speclib.addStepAutoNumber(webChat.getVerifiedMessage(webChat.typeButton));
    expect(webChat.typeButton).not.toBeDisplayed();
  });
});

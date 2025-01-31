/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../lib/webChat');
const speclib = require('../../../lib/speclib');
const ShoppingPage = require('../../../pages/salestracking/shopping.page');
const { TEST_DATA } = require('../../../lib/defaultconstantslib');

describe('Sales floor Project', () => {
  it('C183877 Verify as a user, I connect with an associate from list of categories for getting a reply by SMS', () => {
    speclib.addTestId('C183877');
    speclib.addModule(speclib.ALLURE.module.tobeMigrated);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.startStep(`Open ${speclib.RETAILER} page`);

    ShoppingPage.openShoppingPage(true);

    speclib.addStepAutoNumber('validating Chatbot');
    expect(webChat.isChatbotDisplayed()).toBeExisting();

    speclib.addStepAutoNumber('click on Chatbot');
    webChat.clickOnChatbot();

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.firstMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.firstMessage)}' is displaying`);

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.secondMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.secondMessage)}' is displaying`);

    speclib.addStepAutoNumber("verify 'I have product questions' Option is displaying");
    expect(webChat.ihaveProductQuestionsOption).toBeExisting();

    speclib.addStepAutoNumber("verify 'I'm Looking For Style Advice' Option is displaying");
    expect(webChat.imLookingForStyleAdviceOption).toBeExisting();

    speclib.addStepAutoNumber("verify 'I'm Looking For An Associate' Option is displaying");
    expect(webChat.iMLookingForAnAssociateOption).toBeExisting();

    speclib.addStepAutoNumber("verify 'I Need Help With My Order' Option is displaying");
    expect(webChat.iNeedHelpWithMyOrderOption).toBeExisting();

    speclib.addStepAutoNumber("verify 'Something Else' Option is displaying");
    expect(webChat.somethingElseOption).toBeExisting();

    speclib.addStepAutoNumber('click on Next Item Button');
    webChat.clickOnNextItemButton();

    speclib.addStepAutoNumber("click on 'I'm Looking For An Associate' Option");
    webChat.iMLookingForAnAssociateOption.click();

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.thirdMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.thirdMessage)}' is displaying`);

    speclib.addStepAutoNumber("click on 'Associates' in the List");
    webChat.firstAssociatesInList.click();

    speclib.addStepAutoNumber("Verify 'connect' button is showing enabled");
    expect(webChat.connectButton.isEnabled() === true);

    speclib.addStepAutoNumber("click on 'connect' Button");
    webChat.connectButton.click();

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.forthMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.forthMessage)}' is displaying`);

    speclib.addStepAutoNumber('click on \'Get A Reply By SMS\' Options');
    webChat.getAReplyBySmsOptions.click();

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.fifthMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.fifthMessage)}' is displaying`);

    speclib.addStepAutoNumber(` enter text in type field: ${TEST_DATA.request.sfr.rendomData}`);
    webChat.enterValueInTypeField(webChat.typeButton, TEST_DATA.request.sfr.rendomData);

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.sixthMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.sixthMessage)}' is displaying`);

    speclib.addStepAutoNumber(`enter text in type field: ${TEST_DATA.request.sfr.name}`);
    webChat.enterValueInTypeField(webChat.typeButton, TEST_DATA.request.sfr.name);

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.eighthMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.eighthMessage)}' is displaying`);

    speclib.addStepAutoNumber(`enter text in emails field: ${TEST_DATA.request.sfr.phone}`);
    webChat.enterValueInTypeField(webChat.phoneTextFeild, TEST_DATA.request.sfr.phone);

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.tenthMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.tenthMessage)}' is displaying`);

    speclib.addStepAutoNumber("verify 'Main menu' displaying");
    expect(webChat.ihaveProductQuestionsOption).toBeExisting();
  });
});

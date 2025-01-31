/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../lib/webChat');
const speclib = require('../../../lib/speclib');
const ShoppingPage = require('../../../pages/salestracking/shopping.page');

describe('Sales floor Project', () => {
  it('C183870 Verify as a user, I am able to see the list of associates for specific store on clicking "filter by specialty" button', () => {
    speclib.addTestId('183870');
    speclib.addModule(speclib.ALLURE.module.salesfloor);
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

    speclib.addStepAutoNumber("verify 'Filter By Storez' Button is displaying");
    expect(webChat.filterBySpecialtyButton).toBeExisting();

    speclib.addStepAutoNumber("verify 'Filter By Store' Button is displaying");
    expect(webChat.filterByStoreButton).toBeExisting();

    speclib.addStepAutoNumber("verify 'list Of Associates' is displaying");
    expect(webChat.listOfAssociates).toBeExisting();

    speclib.addStepAutoNumber("click on 'Filter By Specialty' Button");
    webChat.filterBySpecialtyButton.click();

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.forthMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.forthMessage)}' is displaying`);

    speclib.addStepAutoNumber("verify 'list Of Associates' is displaying");
    expect(webChat.listOfAssociates).toBeExisting();
  });
});

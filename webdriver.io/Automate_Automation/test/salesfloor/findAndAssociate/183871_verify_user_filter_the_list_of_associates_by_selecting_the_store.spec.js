/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../lib/webChat');
const speclib = require('../../../lib/speclib');
const ShoppingPage = require('../../../pages/salestracking/shopping.page');

describe('Sales floor Project', () => {
  it('C183871 Verify as a user, I filter the list of associates by selecting the store', () => {
    speclib.addTestId('183871');
    speclib.addModule(speclib.ALLURE.module.tobeMigrated);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.startStep(`Open ${speclib.RETAILER} page`);

    ShoppingPage.openShoppingPage(true);

    speclib.addStepAutoNumber('validating Chatbot');
    expect(webChat.isChatbotDisplayed()).toBeExisting();

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber('click on Chatbot');
    webChat.clickOnChatbot();

    speclib.addStep(webChat.readMessage(1));
    expect(webChat.readMessageNumber(1)).toBeExisting();

    speclib.addStep(webChat.readMessage(2));
    expect(webChat.readMessageNumber(2)).toBeExisting();

    speclib.addStepAutoNumber('click on Next Item Button');
    webChat.clickOnNextItemButton();

    speclib.addStepAutoNumber(webChat.getVerifiedMessage(webChat.iMLookingBeautySpeciaOption));
    expect(webChat.iMLookingBeautySpeciaOption).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'I'm Looking For A Beauty Specialist' Option");
    webChat.iMLookingBeautySpeciaOption.click();

    speclib.addStep(webChat.readMessage(4));
    expect(webChat.readMessageNumber(4)).toBeExisting();

    speclib.addStepAutoNumber("verify 'Filter By Specialty' Button is displaying");
    expect(webChat.filterBySpecialtyButton).toBeExisting();

    speclib.addStepAutoNumber("verify 'Filter By Store' Button is displaying");
    expect(webChat.filterByStoreButton).toBeExisting();

    speclib.addStepAutoNumber("verify 'list Of Associates' is displaying");
    expect(webChat.listOfAssociates).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'Filter By Store' option");
    webChat.filterByStoreButton.click();

    speclib.addStep(webChat.readMessage(6));
    expect(webChat.readMessageNumber(6)).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on store 'confirm' button");
    webChat.confirmButton.click();

    speclib.addStep(webChat.readMessage(7));
    expect(webChat.readMessageNumber(7)).toBeExisting();

    speclib.addStep(webChat.readMessage(8));
    expect(webChat.readMessageNumber(8)).toBeExisting();

    speclib.addStepAutoNumber("verify 'List Of Reps Associated With Store' is displaying");
    expect(webChat.listOfRepsAssociatedWithStore).toBeExisting();

    speclib.addStep('End of test');
  });
});

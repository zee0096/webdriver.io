/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../lib/webChat');
const speclib = require('../../../lib/speclib');
const ShoppingPage = require('../../../pages/salestracking/shopping.page');
const { TEST_DATA } = require('../../../lib/defaultconstantslib');

describe('Sales floor Project', () => {
  it('C183482 Verify as a user, I see that robot does not ask your name and phone number while booking an in-store appointment with "I have product questions".', () => {
    speclib.addTestId('C183482');
    speclib.addModule(speclib.ALLURE.module.tobeMigrated);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    let getStoreName = '';

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

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber(webChat.getClickElementText(webChat.ihaveProductQuestionsOption));
    webChat.ihaveProductQuestionsOption.click();

    speclib.addStepAutoNumber(webChat.readMessage(4));
    expect(webChat.readMessageNumber(4)).toBeExisting();

    speclib.addStep('End of step');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber('click on \'book an appointment\' Options');
    webChat.bookAnAppointmentOptions.click();

    speclib.addStepAutoNumber(webChat.readMessage(6));
    expect(webChat.readMessageNumber(6)).toBeExisting();

    speclib.addStep('End of step');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'in a store' Options");
    webChat.inAStoreOptions.click();

    speclib.addStepAutoNumber("Verify 'list Of Categories' is displaying");
    expect(webChat.listOfCategories).toBeExisting();

    speclib.addStepAutoNumber('select category');
    webChat.categoryItem.click();

    speclib.addStepAutoNumber("click on 'Continue' button");
    webChat.categoriesContinueButton.click();

    speclib.addStep('End of step');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber(` enter text in type field: ${TEST_DATA.request.sfr.rendomData}`);
    webChat.enterValueInTypeField(webChat.typeButton, TEST_DATA.request.sfr.rendomData);

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    getStoreName = webChat.getMessageText(webChat.storeNamelabel);

    speclib.addStepAutoNumber("click on 'confirm' button");
    webChat.confirmButton.click();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'Anyone Would Work' option");
    webChat.anyoneWouldWorkOption.click();

    speclib.addStep(webChat.readMessage(13));
    expect(webChat.readMessageNumber(13)).toBeExisting();

    speclib.addStepAutoNumber("click on 'Select A Time And Date' Option");
    webChat.selectATimeAndDate.click();

    speclib.addStepAutoNumber("verify 'calender With Timer'  Slot is displaying");
    expect(webChat.calenderWithTimrSlot).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'calender With Timer' Option");
    webChat.calenderWithTimrSlot.click();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'continue' Button");
    webChat.associateContinueButton.click();

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber(`enter text in type field: ${TEST_DATA.request.sfr.name}`);
    webChat.enterValueInTypeField(webChat.typeButton, TEST_DATA.request.sfr.name);

    speclib.addStep(webChat.readMessage(19));
    expect(webChat.readMessageNumber(19)).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'SMS' Option");
    webChat.smsButton.click();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber(`enter text in emails field: ${TEST_DATA.request.sfr.phone}`);
    webChat.enterValueInTypeField(webChat.phoneTextFeild, TEST_DATA.request.sfr.phone);

    speclib.addStep(webChat.readMessage(23));
    expect(webChat.readMessageNumber(23)).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'no, Thank You' Option");
    webChat.noThankYouBtn.click();

    speclib.addStep(webChat.readMessage(25));
    expect(webChat.readMessageNumber(25)).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'no, I'm Good' Option");
    webChat.noImGoodOption.click();

    speclib.addStep(webChat.readMessage(27));
    expect(webChat.readMessageNumber(27)).toBeExisting();

    speclib.addStep(webChat.readMessage(28));
    expect(webChat.readMessageNumber(28)).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on '1' Option");
    webChat.clickOnScore(1);

    speclib.addStep(webChat.readMessage(30));
    expect(webChat.readMessageNumber(30)).toBeExisting();

    speclib.addStep(webChat.readMessage(31));
    expect(webChat.readMessageNumber(31)).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'Not Now' Option");
    webChat.NotNowOption.click();

    speclib.addStep(webChat.readMessage(33));
    expect(webChat.readMessageNumber(33)).toBeExisting();

    speclib.addStep(webChat.readMessage(34));
    expect(webChat.readMessageNumber(34)).toBeExisting();

    speclib.addStepAutoNumber("verify 'Main menu' displaying");
    expect(webChat.ihaveProductQuestionsSecondOption).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber(webChat.getClickElementText(webChat.ihaveProductQuestionsOption));
    webChat.ihaveProductQuestionsOption.click();

    speclib.addStep(webChat.readMessage(36));
    expect(webChat.readMessageNumber(36)).toBeExisting();

    speclib.addStep(webChat.readMessage(37));
    expect(webChat.readMessageNumber(37)).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber('click on \'book an appointment\' Options');
    webChat.bookAnAppointmentOptions.click();

    speclib.addStepAutoNumber(webChat.readMessage(39));
    expect(webChat.readMessageNumber(39)).toBeExisting();

    speclib.addStep('End of step');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'in a store' Options");
    webChat.inAStoreOptions.click();

    speclib.addStepAutoNumber("Verify 'list Of Categories' is displaying");
    expect(webChat.listOfCategories).toBeExisting();

    speclib.addStepAutoNumber('select category');
    webChat.categoryItem.click();

    speclib.addStepAutoNumber("click on 'Continue' button");
    webChat.categoriesContinueButton.click();

    speclib.addStep('End of step');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber(` enter text in type field: ${TEST_DATA.request.sfr.rendomData}`);
    webChat.enterValueInTypeField(webChat.typeButton, TEST_DATA.request.sfr.rendomData);

    speclib.addStep('verify store name');
    expect(webChat.readMessageStorName(getStoreName)).toBeExisting();

    speclib.addStepAutoNumber("verify 'Yes' Button is displaying");
    expect(webChat.yesButton).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'Yes' Button");
    webChat.yesButton.click();

    speclib.addStep(webChat.readMessage(43));
    expect(webChat.readMessageNumber(43)).toBeExisting();

    speclib.addStep('End of test');

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'Anyone Would Work' option");
    webChat.anyoneWouldWorkOption.click();

    speclib.addStep(webChat.readMessage(45));
    expect(webChat.readMessageNumber(45)).toBeExisting();

    speclib.addStepAutoNumber("click on 'Select A Time And Date' Option");
    webChat.selectATimeAndDateSecButton.click();

    speclib.addStepAutoNumber("click on 'calender With Timer' Option");
    webChat.calenderWithTimrSlot.click();

    speclib.addStepAutoNumber("click on 'continue' Button");
    webChat.associateContinueButton.click();

    speclib.addStep('End of test');

    speclib.addStepAutoNumber("click on 'Ok Look's Good' Option");
    webChat.okLooksGoodOption.click();

    speclib.addStep(webChat.readMessage(50));
    expect(webChat.readMessageNumber(50)).toBeExisting();

    speclib.startStep('Start Step');

    speclib.addStepAutoNumber("click on 'no, I'm Good' Option");
    webChat.noImGoodOption.click();

    speclib.addStep(webChat.readMessage(51));
    expect(webChat.readMessageNumber(51)).toBeExisting();

    speclib.addStep(webChat.readMessage(52));
    expect(webChat.readMessageNumber(52)).toBeExisting();

    speclib.addStep('End of test');
  });
});

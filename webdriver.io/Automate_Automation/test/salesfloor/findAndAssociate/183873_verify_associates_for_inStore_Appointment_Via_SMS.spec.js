/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../lib/webChat');
const speclib = require('../../../lib/speclib');
const ShoppingPage = require('../../../pages/salestracking/shopping.page');
const { TEST_DATA } = require('../../../lib/defaultconstantslib');

describe('Sales floor Project', () => {
  it('C183873 Verify as a user, I connect with an associate from list of associates for booking an in-store appointment via SMS', () => {
    speclib.addTestId('C183873');
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

    speclib.addStepAutoNumber("Verify 'Continue' button is showing enabled");
    expect(webChat.connectButton.isEnabled() === true);

    speclib.addStepAutoNumber("click on 'connect' Button");
    webChat.connectButton.click();

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.forthMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.forthMessage)}' is displaying`);

    speclib.addStepAutoNumber('click on \'Book An In Store Appointment\' Options');
    webChat.bookAnInStoreAppointmentOptions.click();

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.fifthMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.fifthMessage)}' is displaying`);

    speclib.addStepAutoNumber(` enter text in type field: ${TEST_DATA.request.sfr.rendomData}`);
    webChat.enterValueInTypeField(webChat.typeButton, TEST_DATA.request.sfr.rendomData);

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.sixthMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.sixthMessage)}' is displaying`);

    speclib.addStepAutoNumber("click on 'Select A Time And Date' Option");
    webChat.selectATimeAndDate.click();

    speclib.addStepAutoNumber("verify 'calender With Timer'  Slot is displaying");
    expect(webChat.calenderWithTimrSlot).toBeExisting();

    speclib.addStepAutoNumber("click on 'calender With Timer' Option");
    webChat.calenderWithTimrSlot.click();

    speclib.addStepAutoNumber("click on 'continue' Button");
    webChat.associateContinueButton.click();

    speclib.addStepAutoNumber(`enter text in type field: ${TEST_DATA.request.sfr.name}`);
    webChat.enterValueInTypeField(webChat.typeButton, TEST_DATA.request.sfr.name);

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.eighthMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.eighthMessage)}' is displaying`);

    speclib.addStepAutoNumber("click on 'SMS' Option");
    webChat.smsButton.click();

    speclib.addStepAutoNumber(`enter text in emails field: ${TEST_DATA.request.sfr.phone}`);
    webChat.enterValueInTypeField(webChat.phoneTextFeild, TEST_DATA.request.sfr.phone);

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.tenthMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.tenthMessage)}' is displaying`);

    speclib.addStepAutoNumber("click on 'no, Thank You' Option");
    webChat.noThankYouBtn.click();

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.eleventhMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.eleventhMessage)}' is displaying`);

    speclib.addStepAutoNumber("click on 'no, I'm Good' Option");
    webChat.noImGoodOption.click();

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.twelfthMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.twelfthMessage)}' is displaying`);

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.thirteenMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.thirteenMessage)}' is displaying`);

    speclib.addStepAutoNumber("click on 'Score' Option");
    webChat.selectScore.click();

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.fourteenMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.fourteenMessage)}' is displaying`);

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.fifteenMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.fifteenMessage)}' is displaying`);

    speclib.addStepAutoNumber("click on 'Not Now' Option");
    webChat.NotNowOption.click();

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.sixteenMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.sixteenMessage)}' is displaying`);

    speclib.addStepAutoNumber('Verify Message is displaying');
    expect(webChat.seventeenMessage).toBeExisting();
    speclib.addStep(`verified Message with text '${webChat.getMessageText(webChat.seventeenMessage)}' is displaying`);

    speclib.addStepAutoNumber("verify 'Main menu' displaying");
    expect(webChat.ihaveProductQuestionsOption).toBeExisting();
  });
});

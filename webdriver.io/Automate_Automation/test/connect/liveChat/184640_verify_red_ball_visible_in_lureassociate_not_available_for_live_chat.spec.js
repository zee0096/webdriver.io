/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../lib/webChat');
const speclib = require('../../../lib/speclib');
const { CREDENTIAL } = require('../../../lib/defaultconstantslib');

describe('Sales floor Project', () => {
  it('C184640 Verify that red ball is visible in the lure when associate is not available for live chat.', () => {
    speclib.addTestId('184640');
    speclib.addModule(speclib.ALLURE.module.tobeMigrated);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.startStep(`Open ${speclib.RETAILER} page`);

    speclib.addStepAutoNumber(webChat.backofficeUrl);
    speclib.openWebPage(webChat.backofficeUrl);    

    speclib.addStepAutoNumber('verify user name text field');
    expect(webChat.userNameTextField).toBeExisting();

    speclib.addStepAutoNumber('verify password text field');
    expect(webChat.passwordTextField).toBeExisting();

    speclib.addStepAutoNumber('enter value in the username text field');
    webChat.enterValueInField(webChat.userNameTextField, CREDENTIAL.request.auth.email);

    speclib.addStepAutoNumber('enter value in the username text field');
    webChat.enterValueInField(webChat.passwordTextField, CREDENTIAL.request.auth.password);

    speclib.addStepAutoNumber('click on sign in button');
    webChat.signInButton.click();

    speclib.addStepAutoNumber('verify home page title');
    expect(webChat.homePageTitle).toBeExisting();

    speclib.addStepAutoNumber('verify available for chat toggle is disable');
    expect(webChat.isAvailableForChatToggleIsDisable()).toBeExisting();

    speclib.addStepAutoNumber(webChat.storefrontUrl);
    webChat.openAndSwitchToNewTab(webChat.storefrontUrl);

    speclib.addStepAutoNumber('verify liveChat option');
    expect(webChat.liveChatOption).toBeExisting();

    speclib.addStepAutoNumber('verify appointment request option');
    expect(webChat.appointmentRequestOption).toBeExisting();

    speclib.addStepAutoNumber('verify style advice option');
    expect(webChat.styleAdviceOption).toBeExisting();

    speclib.addStepAutoNumber('verify appointment request option');
    expect(webChat.appointmentRequestOption).toBeExisting();

    speclib.addStepAutoNumber('verify contact me option');
    expect(webChat.contactMeOption).toBeExisting();

    speclib.addStepAutoNumber('verify unavailable on live chat option');
    expect(webChat.unavailableOnLive).toBeExisting();
  });
});

const SidebarPage = require('../../../pages/sidebar.page');
const LiveChat = require('../../../lib/livechat');
const ChatAvailabilityPage = require('../../../pages/backoffice/chatavailability.page');
const speclib = require('../../../lib/speclib');
const EmailMe = require('../../../lib/emailme');
const {TEST_DATA} = require('../../../lib/defaultconstantslib');

speclib.descSkipIf(SidebarPage.isProdEnv || SidebarPage.RETAILER !== 'hbc')(`${SidebarPage.RETAILER} 
  Live Chat from Sidebar customer can initiate a contact request via 'Leave a Message' button`, () => {
  it(`C183374 Verify that customer can initiate a contact request 
  when selecting an unavailable specialty in live chat`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addTestId('183374');

    ChatAvailabilityPage.liveChatFrom = ChatAvailabilityPage.IT_IS_COMMING_FROM.sidebar;
    LiveChat.liveChatFrom = ChatAvailabilityPage.IT_IS_COMMING_FROM.sidebar;

    speclib.addStepAutoNumber('Login BO page as rep');
    ChatAvailabilityPage.openBoAndLoginByRole(ChatAvailabilityPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Turn available chat ON');
    ChatAvailabilityPage.turnAvailableForChatTo(true);

    speclib.addStepAutoNumber('Open Sidebar page');
    SidebarPage.openSidebarPage({ openNewWindow : true });

    speclib.addStepAutoNumber('Click on widget');
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Validate widget/live chat is available');
    expect(LiveChat.isChatAvailable()).toBeTruthy();
    LiveChat.clickOnLiveChat();

    speclib.addStepAutoNumber('Connect button is visible');
    expect(LiveChat.chatSubmitButton.getText()).toContain('CONNECT');

    speclib.addStepAutoNumber('Open the specialities dropdown and under UNAVAILABLE specialities section');
    LiveChat.selectSpecialtyOpt('unavailable');

    speclib.addStepAutoNumber('Connect button should became LEAVE A MESSAGE and the form should not navigate to live chat waiting room');
    expect(LiveChat.chatSubmitButton.getText()).toContain('LEAVE A MESSAGE');

    LiveChat.chatSubmitButton.scrollIntoView();
    LiveChat.chatSubmitButton.waitForEnabled();
    LiveChat.chatSubmitButton.click();

    speclib.addStepAutoNumber('Request email me form');
    EmailMe.requestEmailFrm(
      TEST_DATA.request.sb.email,
      TEST_DATA.request.sb.emailMessage,
      TEST_DATA.request.sb.name,
      TEST_DATA.request.sb.phone
    );
    speclib.addStepAutoNumber('Verify sent message to be displayed');
    expect(EmailMe.sentMsgTxt).toBeDisplayed();
  });
});

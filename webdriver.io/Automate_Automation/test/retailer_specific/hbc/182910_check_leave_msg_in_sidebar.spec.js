const SidebarPage = require('../../../pages/sidebar.page');
const LiveChat = require('../../../lib/livechat');
const ChatAvailabilityPage = require('../../../pages/backoffice/chatavailability.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(SidebarPage.isProdEnv || SidebarPage.RETAILER !== 'hbc')(`${SidebarPage.RETAILER} 
  Live Chat from Sidebar 'Leave a Message' button verification`, () => {
  it(`C182910 Verify that live chat form shows Leave a Message button 
  when rep is online and customer doesn't select rep's speciality`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addTestId('182910');

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
  });
});

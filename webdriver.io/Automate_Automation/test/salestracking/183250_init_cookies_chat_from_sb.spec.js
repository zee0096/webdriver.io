// test/salestracking/initiationcookieschat.spec.js
/*
* split and refactored by Marco T Ribeiro 08/02/2021
* this file was splited from newSalestracing.spec.js test
*/

const SidebarPage = require('../../pages/sidebar.page');
const ChatAvailabilityPage = require('../../pages/backoffice/chatavailability.page');
const CookiePage = require('../../lib/cookie');
const LiveChat = require('../../lib/livechat');
const speclib = require('../../lib/speclib');

// it was not created a new pagefrom, because use the same procedure that sb
// ChatAvailabilityPage.pageFrom = 'sb';
ChatAvailabilityPage.liveChatFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;
LiveChat.liveChatFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;
const email = `qatest_chat${SidebarPage.rawDateString()}@salesfloor.net`;

speclib.descSkipIf(
  SidebarPage.isProdEnv || SidebarPage.isTeamMode
  || !SidebarPage.hasSidebar
  || !SidebarPage.hasLiveChat
)(`${SidebarPage.RETAILER} New Salestracking`, () => {
  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  it('C183250 [rep mode] Salestracking Initiation - Cookies - Chat', () => {
    speclib.addTestId('183250');
    speclib.addStepAutoNumber('Log in BO');
    ChatAvailabilityPage.openBoAndLoginByRole(ChatAvailabilityPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Turn on Live Chat');
    ChatAvailabilityPage.turnAvailableForChatTo(true);

    speclib.addStepAutoNumber('Open Sidebar');
    SidebarPage.openSidebarPage({ openNewWindow : true });
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Open Live Chat');
    LiveChat.clickOnLiveChat();

    speclib.addStepAutoNumber('Request Live Chat');
    LiveChat.requestLiveChat(email, { textMessage : 'Test:C183250' });

    ChatAvailabilityPage.switchToBackofficeWindow();

    speclib.addStepAutoNumber('Accept Live Chat');
    ChatAvailabilityPage.acceptLiveChat();

    SidebarPage.switchToWidgetWindow();

    speclib.addStepAutoNumber('Customer send a msg');
    LiveChat.customerSendsMsg('This is a customer message in Live Chat from sb');

    speclib.addStepAutoNumber('Switch to Sidebar');
    SidebarPage.switchToFrontendWindow();

    speclib.addStepAutoNumber('Refresh Sidebar page');
    SidebarPage.refreshPage(2000);

    speclib.addStepAutoNumber('Verify Cookie Tracking');
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('sidebar-chat');
    expect(CookiePage.valueOfTrackingCookie()).toEqual('true');
    expect(CookiePage.valueOfTrackingRepCookie()).toEqual(SidebarPage.REP_NAME);
  });
});

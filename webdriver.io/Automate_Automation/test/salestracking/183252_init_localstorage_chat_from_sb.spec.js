// test/salestracking/localstoragechat.spec.js

const SidebarPage = require('../../pages/sidebar.page');
const ChatAvailabilityPage = require('../../pages/backoffice/chatavailability.page');
const LiveChat = require('../../lib/livechat');
const LocalStoragePage = require('../../pages/salestracking/localStorage.page');
const Contact = require('../../pages/salestracking/contact');
const Cookie = require('../../lib/cookie');
const speclib = require('../../lib/speclib');

// ChatAvailabilityPage.pageFrom = 'sb';
ChatAvailabilityPage.liveChatFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;
LiveChat.liveChatFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;

speclib.descSkipIf(
  SidebarPage.isProdEnv
  || SidebarPage.isCookieTracking
  || !SidebarPage.hasSidebar
  || !SidebarPage.hasLiveChat
)(`${SidebarPage.RETAILER} New Salestracking`, () => {
  it('C183252 [rep mode] Salestracking Initiation - Local Storage - Chat', () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('183252');

    speclib.addStepAutoNumber('Log in BO');
    ChatAvailabilityPage.openBoAndLoginByRole(ChatAvailabilityPage.ROLE.rep, false);
    ChatAvailabilityPage.turnAvailableForChatTo(true);

    speclib.addStepAutoNumber('Open Sidebar');
    SidebarPage.openSidebarPage({ openNewWindow : true });
    SidebarPage.clickOnWidgetIco();

    LiveChat.clickOnLiveChat();

    speclib.addStepAutoNumber('Request Live Chat');
    LiveChat.requestLiveChat(Contact.email);
    browser.pause(1000);

    ChatAvailabilityPage.switchToBackofficeWindow();

    speclib.addStepAutoNumber('Request Live Chat');
    ChatAvailabilityPage.acceptLiveChat();
    SidebarPage.switchToFrontendWindow();

    // necessary pause for give the server time to update the localstorage in browser
    browser.pause(2000);

    speclib.addStepAutoNumber('Refresh Sidebar Page');
    SidebarPage.refreshPage();

    speclib.addStepAutoNumber('Verify Local Storage');
    expect(Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_tracking_rep))
      .toEqual(SidebarPage.REP_NAME);
    expect(LocalStoragePage.valueOfTracking()).toEqual('true');
  });
});

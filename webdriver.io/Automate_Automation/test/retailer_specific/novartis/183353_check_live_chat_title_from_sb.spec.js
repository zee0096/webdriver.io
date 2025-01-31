const SidebarPage = require('../../../pages/sidebar.page');
const LiveChat = require('../../../lib/livechat');
const ChatAvailabilityPage = require('../../../pages/backoffice/chatavailability.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(SidebarPage.RETAILER !== 'novartis')(`${SidebarPage.RETAILER} 
  Live Chat from Sidebar title verification`, () => {
  it(`C183353 As a Customer, i should see "Scientific Engagement Manager" text 
  as Representative name when initiating a live chat session from the sidebar`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('183353');

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

    speclib.addStepAutoNumber('Verify Live Chat text');
    const title = $('h1#AtChatTitle');
    title.waitForExist();

    const textToCheck = {
      en_US : 'Chat now with a Scientific Engagement Manager',
      fr_CA : 'Discuter en ligne avec un chargé d’engagement scientifique'
    };

    expect(title.getText()).toContain(textToCheck[`${SidebarPage.LOCALE}`]);
  });
});

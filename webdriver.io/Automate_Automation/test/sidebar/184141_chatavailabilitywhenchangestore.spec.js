/* eslint-disable prefer-arrow-callback */

const SidebarPage = require('../../pages/sidebar.page');
const ChatAvailabilityPage = require('../../pages/backoffice/chatavailability.page');
const LiveChat = require('../../lib/livechat');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(
  ChatAvailabilityPage.isProdEnv || !SidebarPage.hasSidebar || !SidebarPage.hasCheckGeo,
)(`${SidebarPage.RETAILER} Chat status after have changed store`, () => {
  it('C184141 Chat status is updated when changing stores', () => {
    speclib.addModule(speclib.ALLURE.module.sidebar);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184141');

    speclib.addStepAutoNumber('Login BO page as rep');
    ChatAvailabilityPage.openBoAndLoginByRole(ChatAvailabilityPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Turn available chan ON');
    ChatAvailabilityPage.turnAvailableForChatTo(true);
    browser.pause(1000);

    speclib.addStepAutoNumber('Open Sidebar page');
    SidebarPage.openSidebarPage({ openNewWindow : true });

    speclib.addStepAutoNumber('Click on windget');
    SidebarPage.clickOnWidgetIco();

    // FIXME identify when shows store and shows rep name
    speclib.addStepAutoNumber('Get the current store name');
    LiveChat.saveStoreName();

    speclib.addStepAutoNumber('Change the store name');
    LiveChat.clickOnStoreName();
    LiveChat.pickNextStore(LiveChat.storeName);

    speclib.addStepAutoNumber('Validate changed store name');
    expect(LiveChat.isChatAvailable()).toBeFalsy();
  });
});

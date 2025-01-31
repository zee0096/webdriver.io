const SidebarPage = require('../../pages/sidebar.page');
const speclib = require('../../lib/speclib');
const LiveChat = require('../../lib/livechat');

speclib.descSkipIf(!SidebarPage.hasSidebar)(`${SidebarPage.RETAILER} Sidebar Email`, () => {

  it('C180877 Validate that, Names are displayed correctly when searching for a rep from the widget', () => {
    speclib.addTestId('180877');

    speclib.addStepAutoNumber('Open Sidebar');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();
    speclib.addStepAutoNumber('Click on widget ico');
    SidebarPage.clickOnWidgetIco();
    speclib.addStepAutoNumber('Click on search an associate link');
    LiveChat.clickOnSearchAnAssociateLnk();
    expect(SidebarPage.verifyRepHasNameAndLastname()).toBeTruthy();
  });

});

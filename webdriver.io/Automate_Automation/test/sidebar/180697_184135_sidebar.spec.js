const SidebarPage = require('../../pages/sidebar.page');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(!SidebarPage.hasSidebar)(`${SidebarPage.RETAILER} Sidebar`, () => {
  it('C180697 Sidebar is present', () => {
    speclib.addModule(speclib.ALLURE.module.sidebar);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('180697');

    speclib.addStepAutoNumber('Open sidebar page');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();
    speclib.addStepAutoNumber('Verify widget is visible');
    expect(SidebarPage.isWidgetVisible(false)).toBeTruthy();
  });

  speclib.itSkipIf(!SidebarPage.isProdEnv || SidebarPage.useWidgetsPage)(`C184135 Sidebar Is Visible
    On Other Pages`, () => {
    speclib.addModule(speclib.ALLURE.module.sidebar);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('184135');

    speclib.addStepAutoNumber('Open product page');
    SidebarPage.goToProductPage();
    speclib.addStepAutoNumber('Verify product page is opened');
    expect(SidebarPage.weAreOnProductPage()).toBeTruthy();
    speclib.addStepAutoNumber('Verify widget is visible');
    expect(SidebarPage.isWidgetVisible(true)).toBeTruthy();
  });
});

/* eslint-disable wdio/await-expect */
const SidebarPage = require('../../pages/sidebar.page');
const FindStore = require('../../lib/findstore');
const speclib = require('../../lib/speclib');

describe(`${SidebarPage.RETAILER} Sidebar - validate Visit Store link into widget`, () => {
  speclib.itSkipIf(!FindStore.hasVisitStorefrontBtn || !SidebarPage.hasSidebar)(`C180704 
    As a Customer, I can go to the storefront from the Store locator window `, () => {
    speclib.addTestId('180704');
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addModule(speclib.ALLURE.module.sidebar);

    speclib.addStepAutoNumber('Open Sidebar');
    FindStore.widgetWindowComingFrom = FindStore.IT_IS_COMMING_FROM.sidebar;
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();

    speclib.addStepAutoNumber('Click on Widget Icon');
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Click on find Store link');
    FindStore.clickOnFindStoreLnk();

    speclib.addStepAutoNumber('Validate URL has the store name into "Visit this Store" link');
    expect(FindStore.storeNameInVisitThisStoreLnk(0)).toHaveHrefContaining(FindStore.REP_NAME);

    speclib.addStepAutoNumber('Click on find Store link');
    FindStore.clickOnVisitThisStoreLnk(0);

    speclib.addStepAutoNumber('Validate URL of new tab has the store name');
    expect(browser).toHaveUrlContaining(FindStore.REP_NAME);
  });
});

/* eslint-disable wdio/await-expect */
const SidebarPage = require('../../../pages/sidebar.page');
const speclib = require('../../../lib/speclib');
const GNCPage = require('../../../pages/retailer_specific/gnc/180558_customer_service.page');

speclib.descSkipIf(SidebarPage.RETAILER !== 'gnc')(`${SidebarPage.RETAILER} 
  Check Customer Service Page`, () => {
  it(`C180558 As a Customer, I can click on Contact Customer Service button
    on the widget landing page and navigate to Customer Service production
    page on retailer's website`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('180558');

    speclib.addStepAutoNumber('Open sidebar page and click on Widget');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Click on Contact Customer Service');
    GNCPage.clickOnCustomerService();

    speclib.addStepAutoNumber('Switch to the Customer Service window');
    const windows = browser.getWindowHandles();
    browser.switchToWindow(windows[2]);

    speclib.addStepAutoNumber('Verify the Customer Service url');
    expect(browser).toHaveUrlContaining('https://www.gnc.com/help/contact-us.html#chat');

    speclib.addStepAutoNumber('Verify the Customer Service page is opened: check the title for proof)');
    expect(browser).toHaveTitleContaining('Contact Us | GNC');
  });
});

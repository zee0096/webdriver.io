const SidebarPage = require('../../../pages/sidebar.page');
const ChatAvailabilityPage = require('../../../pages/backoffice/chatavailability.page');
const SalesTrackingPage = require('../../../pages/salestracking/salestracking.page');
const LiveChatPage = require('../../../lib/livechat');
const LocalStoragePage = require('../../../pages/salestracking/localStorage.page');
const Contact = require('../../../pages/salestracking/contact');
const speclib = require('../../../lib/speclib');
const ReportSalesPage = require('../../../pages/backoffice/reports/reportsales.page');

LiveChatPage.liveChatFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;

speclib.descSkipIf(SidebarPage.isProdEnv || !SidebarPage.hasSidebar
  || !SidebarPage.hasLiveChat || SalesTrackingPage.isCookieTracking)(`${SidebarPage.RETAILER}
  Localstorage Chat from Sidebar`, () => {
  it(`C88510 Local storage salestracking is applied
    when initiating a live chat from the sidebar widget`, () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('88510');

    speclib.addStepAutoNumber('Log in BO');
    ChatAvailabilityPage.openBoAndLoginByRole(ChatAvailabilityPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Turn on Live Chat');
    ChatAvailabilityPage.turnAvailableForChatTo(true);

    speclib.addStepAutoNumber('Open Sidebar');
    SidebarPage.openSidebarPage({ openNewWindow : true });

    speclib.addStepAutoNumber('Click on Widget icon, then click on live chat');
    SidebarPage.clickOnWidgetIco();
    LiveChatPage.clickOnLiveChat();

    speclib.addStepAutoNumber('Request Live Chat');
    LiveChatPage.requestLiveChat(Contact.email);

    speclib.addStepAutoNumber('Accept Live Chat');
    ChatAvailabilityPage.switchToBackofficeWindow();
    ChatAvailabilityPage.acceptLiveChat();

    speclib.addStepAutoNumber('Customer send a msg');
    SidebarPage.switchToWidgetWindow();
    LiveChatPage.customerSendsMsg('This is a customer message in Live Chat from sb');

    speclib.addStepAutoNumber('Switch back to the Sidebar');
    SidebarPage.switchToFrontendWindow();

    // Wait time for cookies to update (they don't update immediately on page load)
    speclib.addStepAutoNumber('Refresh sidebar page for 2s');
    SidebarPage.refreshPage(2000);

    speclib.addStepAutoNumber('Verify Local Storage');
    expect(LocalStoragePage.valueOfTracking()).toEqual('true');
    expect(LocalStoragePage.valueOfTrackingRep()).toEqual(SidebarPage.REP_NAME);
    expect(LocalStoragePage.valueOfAcquisition()).toEqual('sidebar-chat');

    speclib.addStepAutoNumber('Pause for 1 minute for expiration to be updated');
    // eslint-disable-next-line wdio/no-pause
    browser.pause(60000);

    speclib.addStepAutoNumber('Refresh page');
    SidebarPage.refreshPage(1000, { pauseForLocalStorage : true });

    speclib.addStepAutoNumber('Verify widget is visible');
    expect(SidebarPage.isWidgetVisible()).toBe(true);

    speclib.addStepAutoNumber('Verify Local Storage after refresh - tracking value');
    browser.switchToParentFrame();
    expect(LocalStoragePage.valueOfTracking()).toEqual('true');
    speclib.addStepAutoNumber('Verify Local Storage after refresh - Rep Name');
    expect(LocalStoragePage.valueOfTrackingRep()).toEqual(SidebarPage.REP_NAME);
    speclib.addStepAutoNumber('Verify Local Storage after refresh - acquisition');
    expect(LocalStoragePage.valueOfAcquisition()).toEqual('sidebar-chat');

    if (!SidebarPage.isProdEnv) {
      speclib.addStepAutoNumber('Do a Transaction');
      SalesTrackingPage.makeTransaction({ productId : 'fakeForC88510' });

      speclib.addStepAutoNumber('Switch to BO');
      ChatAvailabilityPage.switchToBackofficeWindow();

      speclib.addStepAutoNumber('Get the information of the sale for the specified transaction ID');
      const SALE = SalesTrackingPage.getSale(SalesTrackingPage.transaction.ID);

      speclib.addStepAutoNumber('Verify Sale\'s data - acquisition');
      expect(SALE.acquisition).toEqual('sidebar-chat');
      speclib.addStepAutoNumber('Verify Sale\'s data - attribution');
      expect(SALE.attribution).toEqual('sidebar-chat');
      speclib.addStepAutoNumber('Verify Sale\'s data - full name');
      expect(SALE.customer_name).toEqual(Contact.fullName);
      speclib.addStepAutoNumber('Verify Sale\'s data - customer email');
      expect(SALE.customer_email).toEqual(Contact.email);
      speclib.addStepAutoNumber('Verify Sale\'s data - Unit price');
      expect(SALE.total).toEqual(`${SalesTrackingPage.transaction.unitPrice}00`);

      speclib.addStepAutoNumber('Open BO');
      ReportSalesPage.openBoLoginPage(true);

      speclib.addStepAutoNumber('Navigate to the Reports');
      ReportSalesPage.clickOnReportsMnu();

      speclib.addStepAutoNumber('Navigate to the Sales sub tab');
      ReportSalesPage.clickOnSalesTab();

      speclib.addStepAutoNumber(`Find the transaction by id:${SalesTrackingPage.transaction.ID}`);
      const trxInReportsObj = ReportSalesPage.findTransactionInRow(SalesTrackingPage.transaction.ID);

      speclib.addStepAutoNumber('Verify the transaction details');
      expect(trxInReportsObj).toBeGreaterThanOrEqual(0);

      speclib.addStepAutoNumber(`Verify the price:${SalesTrackingPage.transaction.unitPrice}`);
      expect(ReportSalesPage.saleAmountTotal(trxInReportsObj).getText())
        .toContain(`${SalesTrackingPage.transaction.unitPrice}`);

      speclib.addStepAutoNumber('Click show more details');
      ReportSalesPage.clickOnShowDetails(trxInReportsObj);

      speclib.addStepAutoNumber('Verify the transaction details(show more)');
      expect(ReportSalesPage.valuesOfPrd).toContain('1X');
      expect(ReportSalesPage.valuesOfPrd).toContain(`${SalesTrackingPage.transaction.productId}`);
    }
  });
});

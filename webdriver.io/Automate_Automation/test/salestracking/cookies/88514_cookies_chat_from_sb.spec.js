const SidebarPage = require('../../../pages/sidebar.page');
const ChatAvailabilityPage = require('../../../pages/backoffice/chatavailability.page');
const CookiePage = require('../../../lib/cookie');
const LiveChat = require('../../../lib/livechat');
const speclib = require('../../../lib/speclib');
const SalesTrackingPage = require('../../../pages/salestracking/salestracking.page');
const ReportSalesPage = require('../../../pages/backoffice/reports/reportsales.page');

ChatAvailabilityPage.liveChatFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;
LiveChat.liveChatFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;

speclib.descSkipIf(
  SidebarPage.isProdEnv || SidebarPage.isTeamMode
  || !SidebarPage.hasSidebar || !SidebarPage.hasLiveChat
  || !SalesTrackingPage.isCookieTracking
)(`${SidebarPage.RETAILER} Salestracking cookies Live Chat from Sidebar`, () => {
  it('C88514 As a customer, salestracking cookies are applied '
    + 'when initiating a live chat from the sidebar widget', () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('88514');
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
    LiveChat.requestLiveChat(LiveChat.liveChatEmailNameInReq, { textMessage : 'Test:C88514' });

    ChatAvailabilityPage.switchToBackofficeWindow();

    speclib.addStepAutoNumber('Accept Live Chat');
    ChatAvailabilityPage.acceptLiveChat();

    SidebarPage.switchToWidgetWindow();

    speclib.addStepAutoNumber('Customer send a msg');
    LiveChat.customerSendsMsg('This is a customer message in Live Chat from sb');

    speclib.addStepAutoNumber('Switch to Sidebar');
    SidebarPage.switchToFrontendWindow();

    speclib.addStepAutoNumber('Pause for 1 minute for expiration to be updated');
    // eslint-disable-next-line wdio/no-pause
    browser.pause(60000);

    speclib.addStepAutoNumber('Refresh Sidebar page');
    SidebarPage.refreshPage(2000);

    speclib.addStepAutoNumber('Verify Acquisition Cookie');
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('sidebar-chat');
    speclib.addStepAutoNumber('Verify value of tracking Cookie');
    expect(CookiePage.valueOfTrackingCookie()).toEqual('true');
    speclib.addStepAutoNumber('Verify value of tracking rep cookie');
    expect(CookiePage.valueOfTrackingRepCookie()).toEqual(SidebarPage.REP_NAME);

    browser.switchToParentFrame();

    if(!SalesTrackingPage.isProdEnv && SalesTrackingPage.hasProducts) {
      speclib.addStepAutoNumber('Do a Transaction');
      SalesTrackingPage.makeTransaction({productId: 'fakeForC88514'});

      speclib.addStepAutoNumber('Switch to BO');
      ChatAvailabilityPage.switchToBackofficeWindow();

      speclib.addStepAutoNumber('Get the information of the sale for the specified transaction ID');
      const SALE = SalesTrackingPage.getSale(SalesTrackingPage.transaction.ID);

      speclib.addStepAutoNumber('Verify Sale\'s data:acquisition');
      expect(SALE.acquisition).toEqual('sidebar-chat');

      speclib.addStepAutoNumber('Verify Sale\'s data:customer_name');
      expect(SALE.customer_name).toEqual(SalesTrackingPage.transaction.customerName);

      speclib.addStepAutoNumber('Verify Sale\'s data:customer_email');
      expect(SALE.customer_email).toEqual(SalesTrackingPage.transaction.customerEmail);

      speclib.addStepAutoNumber('Verify Sale\'s data:price');
      expect(SALE.total).toEqual(`${SalesTrackingPage.transaction.unitPrice}00`);

      speclib.addStepAutoNumber('Verify Sale\'s data:quantities');
      expect(SALE.quantities).toEqual(SalesTrackingPage.transaction.quantity);

      speclib.addStepAutoNumber('Open BO');
      ReportSalesPage.openBoLoginPage(true);

      speclib.addStepAutoNumber('Navigate to the Reports');
      ReportSalesPage.clickOnReportsMnu();

      speclib.addStepAutoNumber('Navigate to the Sales sub tab');
      ReportSalesPage.clickOnSalesTab();

      speclib.addStepAutoNumber(`Find the transaction by id:${SalesTrackingPage.transaction.ID}`);
      // const trxInReportsObj = ReportSalesPage.findTransactionInRow(SalesTrackingPage.transaction.ID);
      ReportSalesPage.findTransactionInRow(SalesTrackingPage.transaction.ID);

      speclib.addStepAutoNumber('Verify the transaction details');
      expect(ReportSalesPage.trxInReportsObj).toBeGreaterThanOrEqual(0);

      speclib.addStepAutoNumber(`Verify the price:${SalesTrackingPage.transaction.unitPrice}`);
      expect(ReportSalesPage.saleAmountTotal(ReportSalesPage.trxInReportsObj).getText())
        .toContain(`${SalesTrackingPage.transaction.unitPrice}`);

      speclib.addStepAutoNumber('Click show more details');
      ReportSalesPage.clickOnShowDetails(ReportSalesPage.trxInReportsObj);

      speclib.addStepAutoNumber('Verify the transaction details(show more)');
      expect(ReportSalesPage.valuesOfPrd).toContain('1X');
      expect(ReportSalesPage.valuesOfPrd).toContain(`${SalesTrackingPage.transaction.productId}`);
    }
  });
});

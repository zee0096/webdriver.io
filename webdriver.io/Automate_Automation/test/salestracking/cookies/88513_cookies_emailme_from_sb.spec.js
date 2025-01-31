const NewLeadsPage = require('../../../pages/backoffice/newleads/newleads.page');
const SidebarPage = require('../../../pages/sidebar.page');
const CookiePage = require('../../../lib/cookie');
const EmailMe = require('../../../lib/emailme');
const speclib = require('../../../lib/speclib');

const { TEST_DATA } = require('../../../lib/defaultconstantslib');
const SalesTrackingPage = require('../../../pages/salestracking/salestracking.page');
const ReportSalesPage = require('../../../pages/backoffice/reports/reportsales.page');

NewLeadsPage.liveChatFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;

speclib.descSkipIf(
  SidebarPage.isProdEnv
  || SidebarPage.isTeamMode || !SidebarPage.hasSidebar
  || !SidebarPage.hasEmailMeRequest || !NewLeadsPage.hasNewLeads
)(`${SidebarPage.RETAILER} Salestracking cookies Email Me from Sidebar`, () => {
  it('C88513 As a customer, salestracking cookies are applied ' +
    'when initiating a customer request from the sidebar widget', () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('88513');

    speclib.addStepAutoNumber('Log in BO');
    NewLeadsPage.openBoAndLoginByRole(NewLeadsPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Open Sidebar');
    SidebarPage.openSidebarPage({ openNewWindow : true });

    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Open Email Me Request');
    EmailMe.clickOnEmailMeOpt();

    speclib.addStepAutoNumber('Request Email Me');
    EmailMe.requestEmailFrm(
      TEST_DATA.request.sb.email,
      TEST_DATA.request.sb.emailMessage,
      TEST_DATA.request.sb.name,
      TEST_DATA.request.sb.phone,
    );

    speclib.addStepAutoNumber('Email Me Request was sent');
    expect(EmailMe.sentMsgTxt).toBeDisplayed();

    NewLeadsPage.switchToBackofficeWindow();

    speclib.addStepAutoNumber('Switch to New Leads Page');
    NewLeadsPage.clickOnNewLeads();
    expect(NewLeadsPage.actOnLeadInHomePage(0, 'accept')).toBe(true);

    SidebarPage.switchToFrontendWindow();

    speclib.addStepAutoNumber('Pause for 1 minute for expiration to be updated');
    // eslint-disable-next-line wdio/no-pause
    browser.pause(60000);

    speclib.addStepAutoNumber('Refresh New Leads Page');
    NewLeadsPage.refreshPage(1500);

    speclib.addStepAutoNumber('Verify Cookie Tracking: Acquisition');
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('sidebar-email-me');

    speclib.addStepAutoNumber('Verify Cookie Tracking: Tracking Cookie');
    expect(CookiePage.valueOfTrackingCookie()).toEqual('true');

    speclib.addStepAutoNumber('Verify Cookie Tracking: Tracking Rep Cookie');
    expect(CookiePage.valueOfTrackingRepCookie()).toEqual(SidebarPage.REP_NAME);

    browser.switchToParentFrame();

    speclib.addStepAutoNumber('Do a Transaction');
    SalesTrackingPage.makeTransaction({ productId : 'fakeForC88513'});

    speclib.addStepAutoNumber('Switch to BO');
    SalesTrackingPage.switchToBackofficeWindow();

    speclib.addStepAutoNumber('Get the information of the sale for the specified transaction ID');
    const SALE = SalesTrackingPage.getSale(SalesTrackingPage.transaction.ID);

    speclib.addStepAutoNumber('Verify Sale\'s data:acquisition');
    expect(SALE.acquisition).toEqual('sidebar-email-me');

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
    const trxInReportsObj = ReportSalesPage.findTransactionInRow(SalesTrackingPage.transaction.ID);

    speclib.addStepAutoNumber('Verify the transaction details');
    expect(trxInReportsObj).toBeGreaterThanOrEqual(0);

    speclib.addStepAutoNumber(`Verify the price:${SalesTrackingPage.transaction.unitPrice}`);
    expect(ReportSalesPage.saleAmountTotal(trxInReportsObj).getText())
      .toContain(`${SalesTrackingPage.transaction.unitPrice}`);

    speclib.addStepAutoNumber('Click show more details');
    ReportSalesPage.clickOnShowDetails(trxInReportsObj);

    // getting text on product(s) column after click on show details
    const valuesOfPrd = ReportSalesPage.skuPrdOfItem(trxInReportsObj).getText();

    speclib.addStepAutoNumber('Verify the transaction details(show more)');
    expect(valuesOfPrd).toContain('1X');
    expect(valuesOfPrd).toContain(`${SalesTrackingPage.transaction.productId}`);
  });
});

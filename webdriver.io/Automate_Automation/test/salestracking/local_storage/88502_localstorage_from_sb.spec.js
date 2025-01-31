/* eslint-disable wdio/await-expect */
// localstoragesalestrackingfromsb test

// this test has a pause of 60 seconds to refresh the expiration date
// therefore, the configuration file should have a timeout at least of 2 minutes
const SidebarPage = require('../../../pages/sidebar.page');
const EmailMe = require('../../../lib/emailme');
const NewLeadsPage = require('../../../pages/backoffice/newleads/newleads.page');
const LocalStorage = require('../../../pages/salestracking/localStorage.page');
const ReportSalesPage = require('../../../pages/backoffice/reports/reportsales.page');
const SalesTrackingPage = require('../../../pages/salestracking/salestracking.page');
const Cookie = require('../../../lib/cookie');
const speclib = require('../../../lib/speclib');

const { TEST_DATA } = require('../../../lib/defaultconstantslib');

const email = `qatest_emailme${SidebarPage.rawDateString()}@salesfloor.net`;

speclib.descSkipIf(
  SidebarPage.isProdEnv
  || SidebarPage.isCookieTracking
  || !SidebarPage.hasSidebar
  || !SidebarPage.hasEmailMeRequest
)(`${SidebarPage.RETAILER} Salestracking by Sidebar for LocalStorage rep`, () => {
  it('C88502 Incoming Email Me request', () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('88502');
    NewLeadsPage.liveChatFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;

    speclib.addStepAutoNumber('Open Sidebar');
    SidebarPage.openSidebarPage();
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Open Email Me Request');
    EmailMe.clickOnEmailMeOpt();

    speclib.addStepAutoNumber('Request Email Me');
    EmailMe.requestEmailFrm(
      email,
      TEST_DATA.request.sb.emailMessage,
      TEST_DATA.request.sb.name,
      TEST_DATA.request.sb.phone,
    );

    speclib.addStepAutoNumber('Verify Request Email Me is sent');
    expect(EmailMe.sentMsgTxt).toBeDisplayed();

    speclib.addStepAutoNumber('Log in BO');
    NewLeadsPage.openBoAndLoginByRole(NewLeadsPage.ROLE.rep, true);

    speclib.addStepAutoNumber('Navigate to the New Leads');
    NewLeadsPage.clickOnNewLeads();

    speclib.addStepAutoNumber('Find and accept New Lead');
    NewLeadsPage.findAndAcceptNewLead(TEST_DATA.request.sb.name);

    speclib.addStepAutoNumber('Switch tp sidebar window');
    SidebarPage.switchToFrontendWindow();
    // necessary pause for give the server time to update the localstorage in browser
    speclib.addStepAutoNumber('Refresh Sidebar page');
    // eslint-disable-next-line wdio/no-pause
    browser.pause(3000);
    SidebarPage.refreshPage();

    speclib.addStepAutoNumber('Verify Local Storage');
    expect(LocalStorage.valueOfAcquisition()).toEqual('sidebar-email-me');
    expect(LocalStorage.valueOfTracking()).toEqual('true');
    expect(Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_tracking_rep))
      .toEqual(SidebarPage.REP_NAME);

    speclib.addStepAutoNumber('Verify expiration dates');
    // difference de 24h +- 3 minutes
    LocalStorage.setTrackingRepTimeStamp(LocalStorage.getExpirationDateOfTrackingRep());
    expect(LocalStorage.expirationDateOfTrackingRep()).toBeGreaterThan(82800000);
    expect(LocalStorage.expirationDateOfTrackingRep()).toBeLessThan(86400000);

    // difference de 24h +- 3 minutes
    LocalStorage.setTrackingTimeStamp(LocalStorage.getExpirationDateOfTracking());
    expect(LocalStorage.expirationDateOfTracking()).toBeGreaterThan(82800000);
    expect(LocalStorage.expirationDateOfTracking()).toBeLessThan(86400000);

    // IMPORTANT - the pause MUST HAVE TO BE 60 seconds at least,
    // if not the experition date is not updated.
    speclib.addStepAutoNumber('Pause for 1 minute');
    // eslint-disable-next-line wdio/no-pause
    browser.pause(60000);

    speclib.addStepAutoNumber('Refresh Sidebar page');
    SidebarPage.refreshPage(5000);

    speclib.addStepAutoNumber('Verify Local Storage');
    expect(Cookie.getCookieValue(Cookie.COOKIE_NAMES.sf_wdt_tracking_rep))
      .toEqual(SidebarPage.REP_NAME);

    speclib.addStepAutoNumber('Verify expiration dates');
    // difference de 24h +- 3 minutes
    expect(LocalStorage.expirationDateOfTrackingRep()).toBeGreaterThan(82800000);
    expect(LocalStorage.expirationDateOfTrackingRep()).toBeLessThan(86400000);

    // difference de 24h +- 3 minutes
    expect(LocalStorage.expirationDateOfTracking()).toBeGreaterThan(82800000);
    expect(LocalStorage.expirationDateOfTracking()).toBeLessThan(86400000);

    // the first timestamp should be less than the current
    expect(LocalStorage.sf_wdt_tracking_rep_timeStamp)
      .toBeLessThan(LocalStorage.getExpirationDateOfTrackingRep());
    expect(LocalStorage.sf_wdt_tracking_timeStamp)
      .toBeLessThan(LocalStorage.getExpirationDateOfTracking());

    speclib.addStepAutoNumber('Do a Transaction');
    SalesTrackingPage.makeTransaction({
      email,
      name      : TEST_DATA.request.sb.name,
      productId : 'fakeForC88502'
    });

    speclib.addStepAutoNumber('Switch to BO');
    SalesTrackingPage.switchToBackofficeWindow();

    speclib.addStepAutoNumber('Get the information of the sale for the specified transaction ID');
    const SALE = SalesTrackingPage.getSale(SalesTrackingPage.transaction.ID);

    speclib.addStepAutoNumber('Verify Sale\'s data');
    expect(SALE).toBeTruthy();
    expect(SALE.acquisition).toEqual('sidebar-email-me');
    expect(SALE.attribution).toEqual('sidebar-email-me');
    expect(SALE.customer_name).toEqual(TEST_DATA.request.sb.name);
    expect(SALE.customer_email).toEqual(email);
    expect(SALE.total).toEqual(`${SalesTrackingPage.transaction.unitPrice}00`);
    expect(SALE.quantities).toEqual('1');

    speclib.addStepAutoNumber('Open BO');
    NewLeadsPage.openBoLoginPage(true);

    speclib.addStepAutoNumber('Navigate to the Reports');
    ReportSalesPage.clickOnReportsMnu();

    speclib.addStepAutoNumber('Navigate to the Sales sub tab');
    ReportSalesPage.clickOnSalesTab();

    speclib.addStepAutoNumber(`Find the transaction by id:${SalesTrackingPage.transaction.ID}`);
    ReportSalesPage.findTransactionInRow(SalesTrackingPage.transaction.ID);

    speclib.addStepAutoNumber('Verify the transaction details');
    //  trxInreportsObj = -1 means not found
    expect(ReportSalesPage.trxInReportsObj).toBeGreaterThanOrEqual(0);

    speclib.addStepAutoNumber(`Verify the price:${SalesTrackingPage}`);
    // validating total sales
    expect(ReportSalesPage.saleAmountTotal(ReportSalesPage.trxInReportsObj).getText())
      .toContain(`${SalesTrackingPage.transaction.unitPrice}`);

    speclib.addStepAutoNumber('Click show more details');
    ReportSalesPage.clickOnShowDetails(ReportSalesPage.trxInReportsObj);

    speclib.addStepAutoNumber('Verify the transaction details(show more)');
    expect(ReportSalesPage.valuesOfPrd).toContain('1X');
    expect(ReportSalesPage.valuesOfPrd).toContain(`${SalesTrackingPage.transaction.productId}`);
  });
});

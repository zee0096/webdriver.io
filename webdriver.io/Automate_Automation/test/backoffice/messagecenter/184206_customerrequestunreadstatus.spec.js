/* eslint-disable mocha/no-top-level-hooks */
const CustomerRequestsPage = require('../../../pages/backoffice/messagecenter/customerrequests.page');
const speclib = require('../../../lib/speclib');

const { hasAppointmentRequest: hasAppointmentRequestFT } = require('../../../pages/footer.page');
const { hasAppointmentRequest: hasAppointmentRequestSB } = require('../../../pages/sidebar.page');
const { hasAppointmentRequest: hasAppointmentRequestSF } = require('../../../pages/storefront.page');

speclib.descSkipIf(
  (CustomerRequestsPage.isProdEnv && CustomerRequestsPage.isTeamMode) || !CustomerRequestsPage.hasMessageCenter
  || (!hasAppointmentRequestSF && !hasAppointmentRequestSB && !hasAppointmentRequestFT),
)(`${CustomerRequestsPage.RETAILER} Customer Requests`, () => {
  it('C184206 Rep accepts appointment request', () => {
    /**
     * We need two appointment requests for the current day with a future time to run these test cases
     */
    speclib.addTestId('184206');
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.minor);

    speclib.addStepAutoNumber('Login BO page as rep');
    CustomerRequestsPage.openBoAndLoginByRole(CustomerRequestsPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Open Customer Request option in message center');
    CustomerRequestsPage.clickOnCustomerRequestOpt();

    speclib.addStepAutoNumber('Click on Unresolved menu');
    CustomerRequestsPage.clickOnUnresolvedMenu();

    speclib.addStepAutoNumber('Filter request by getAppointments');
    CustomerRequestsPage.filterRequests('getAppointments()');
    CustomerRequestsPage.pagePagination.waitForDisplayed();

    speclib.addStepAutoNumber('Validation page with status');
    expect(CustomerRequestsPage.pageWithStatusFilteredBy(CustomerRequestsPage.customerReqStatuses.NewUnread))
      .toBeTruthy();

    const reqId = CustomerRequestsPage.findRequestId(CustomerRequestsPage.customerReqStatuses.NewUnread);
    speclib.addStepAutoNumber(`Open request #${reqId}`);
    CustomerRequestsPage.openRequestId(reqId);

    speclib.addStepAutoNumber('Accept/confirm appointment');
    CustomerRequestsPage.clickOnAcceptAppntBtn();

    speclib.addStepAutoNumber('Validation msg appointment was accepted');
    expect(CustomerRequestsPage.acceptedMsgInThread.waitForDisplayed()).toBeTruthy();
  });
});

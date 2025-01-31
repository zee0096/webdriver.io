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
  /**
   * We need two appointment requests for the current day with a future time to run these test cases
   */
  it('C184205 As a Rep, if I open a customer request, it loses its unread status', () => {
    speclib.addTestId('184205');
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.critical);

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

    speclib.addStepAutoNumber('Click on Customer Request tab');
    CustomerRequestsPage.clickOnCustomerRequestTab();

    speclib.addStepAutoNumber('Validation if request is marked as read');
    expect(CustomerRequestsPage.requestIsMarkedAsRead(reqId)).toBeTruthy();
  });
});

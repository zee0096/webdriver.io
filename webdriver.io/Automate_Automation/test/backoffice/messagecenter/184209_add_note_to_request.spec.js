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
  it('C184209 Add note to request', () => {
    speclib.addTestId('184209');
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

    speclib.addStepAutoNumber('Validation page with status');
    expect(CustomerRequestsPage.pageWithStatusFilteredBy(CustomerRequestsPage.customerReqStatuses.New)).toBeTruthy();

    const reqId = CustomerRequestsPage.findRequestId(CustomerRequestsPage.customerReqStatuses.New);
    speclib.addStepAutoNumber(`Open request #${reqId}`);
    CustomerRequestsPage.openRequestId(reqId);

    speclib.addStepAutoNumber('Click on note button');
    CustomerRequestsPage.clickOnNoteBtn();
    CustomerRequestsPage.refreshPage(2000);

    speclib.addStepAutoNumber('Validation Rep adds a note to a request worked');
    expect(CustomerRequestsPage.hasNoteMsgInThread).toBeTruthy();
  });
});

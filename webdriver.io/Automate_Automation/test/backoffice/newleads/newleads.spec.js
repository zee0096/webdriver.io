/* eslint-disable mocha/no-top-level-hooks */
const NewLeadsPage = require('../../../pages/backoffice/newleads/newleads.page');
const { hasPersonalShopper, hasPersonalShopperInSb } = require('../../../lib/personalshopper');
const { hasSidebar, hasAppointmentRequest, hasEmailMeRequest } = require('../../../pages/sidebar.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(NewLeadsPage.isProdEnv || !hasSidebar || !NewLeadsPage.hasNewLeads)(`${NewLeadsPage.RETAILER} Back Office New Leads,`, () => {
  before(() => {
    speclib.addStepAutoNumber('Open back office and log in as test rep');
    NewLeadsPage.openBoAndLoginByRole(NewLeadsPage.ROLE.rep, false);
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addStepAutoNumber('Click new leads link');
    NewLeadsPage.clickOnNewLeads();
  });

  speclib.itSkipIf(!hasAppointmentRequest)('C43107a As a Rep, I can view Appointment Request lead details', () => {
    speclib.addTestId('43107a');
    speclib.addStepAutoNumber('Verify appointment request is correct');
    expect(NewLeadsPage.viewLeadDetails('appt')).toBeTruthy();
  });

  speclib.itSkipIf(!hasPersonalShopper || !hasPersonalShopperInSb)('C43107b As a Rep, I can view Personal Shopper Request lead details', () => {
    speclib.addTestId('43107b');
    speclib.addStepAutoNumber('Verify personal shopper request is correct');
    expect(NewLeadsPage.viewLeadDetails('product')).toBeTruthy();
  });

  speclib.itSkipIf(!hasEmailMeRequest)('C43107c As a Rep, I can view Email Me Request lead details', () => {
    speclib.addTestId('43107c');
    speclib.addStepAutoNumber('Verify email request is correct');
    expect(NewLeadsPage.viewLeadDetails('question')).toBeTruthy();
  });

  speclib.itSkipIf(!hasAppointmentRequest
    && !hasEmailMeRequest
    && !hasPersonalShopperInSb)(`C112225 Accept a new lead,
    in Lead Home page`, () => {
    speclib.addTestId('112225');
    speclib.addStepAutoNumber('Verify accepting new lead in home page');
    expect(NewLeadsPage.actOnLeadInHomePage(Math.floor(Math.random() * 2), 'accept')).toBeTruthy();
  });

  speclib.itSkipIf(!hasAppointmentRequest
    && !hasEmailMeRequest
    && !hasPersonalShopperInSb)('C43109 Accept a new lead, in Lead detail page', () => {
    speclib.addTestId('43109');
    speclib.addStepAutoNumber('Verify accepting new lead in lead details page');
    expect(NewLeadsPage.actOnLeadInDetailPage(Math.floor(Math.random() * 2), 'accept')).toBeTruthy();
  });

  speclib.itSkipIf(!NewLeadsPage.hasCustomerService
    && !hasAppointmentRequest
    && !hasEmailMeRequest
    && !hasPersonalShopperInSb)('C112227 Forward a lead to customer service, in Lead detail page', () => {
    speclib.addTestId('112227');
    speclib.addStepAutoNumber('Verify forwarding lead to customer service');
    expect(NewLeadsPage.actOnLeadInDetailPage(Math.floor(Math.random() * 2), 'forward')).toBeTruthy();
  });
});

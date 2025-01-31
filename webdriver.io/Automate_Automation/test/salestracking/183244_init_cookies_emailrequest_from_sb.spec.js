/* eslint-disable wdio/await-expect */
// test/salestracking/initiationcookiesnonchatrequest.spec.js

/**
 * Created by agultsov on 01/17/20.
 * split and refactored by Marco T Ribeiro 08/02/2021
 */
const NewLeadsPage = require('../../pages/backoffice/newleads/newleads.page');
const SidebarPage = require('../../pages/sidebar.page');
const ChatAvailabilityPage = require('../../pages/backoffice/chatavailability.page');
const CookiePage = require('../../lib/cookie');
const EmailMe = require('../../lib/emailme');
const speclib = require('../../lib/speclib');

const { TEST_DATA } = require('../../lib/defaultconstantslib');

NewLeadsPage.liveChatFrom = SidebarPage.IT_IS_COMMING_FROM.sidebar;

speclib.descSkipIf(
  SidebarPage.isProdEnv
  || SidebarPage.isTeamMode || !SidebarPage.hasSidebar
  || !SidebarPage.hasEmailMeRequest || !NewLeadsPage.hasNewLeads
)(`${SidebarPage.RETAILER} New Salestracking`, () => {
  it('C183244 [rep mode] Salestracking Initiation - Cookies - Non-Chat Request', () => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('183244');

    speclib.addStepAutoNumber('Log in BO');
    NewLeadsPage.openBoAndLoginByRole(NewLeadsPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Turn on Live Chat');
    ChatAvailabilityPage.turnAvailableForChatTo(false);

    speclib.addStepAutoNumber('Open Sidebar');
    SidebarPage.openSidebarPage({ openNewWindow : true });

    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Open Email Me Request');
    EmailMe.clickOnEmailMeOpt();

    expect(SidebarPage.contactBox).toBeDisplayed();

    speclib.addStepAutoNumber('Request Email Me');
    EmailMe.requestEmailFrm(
      TEST_DATA.request.sb.email,
      TEST_DATA.request.sb.emailMessage,
      TEST_DATA.request.sb.name,
      TEST_DATA.request.sb.phone,
    );

    expect(EmailMe.sentMsgTxt).toBeDisplayed();

    NewLeadsPage.switchToBackofficeWindow();

    speclib.addStepAutoNumber('Switch to New Leads Page');
    NewLeadsPage.clickOnNewLeads();
    expect(NewLeadsPage.actOnLeadInHomePage(0, 'accept')).toBe(true);

    SidebarPage.switchToFrontendWindow();

    speclib.addStepAutoNumber('Refresh New Leads Page');
    NewLeadsPage.refreshPage(1500);

    speclib.addStepAutoNumber('Verify Cookie Tracking');
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('sidebar-email-me');
    expect(CookiePage.valueOfTrackingCookie()).toEqual('true');
    expect(CookiePage.valueOfTrackingRepCookie()).toEqual(SidebarPage.REP_NAME);
  });
});

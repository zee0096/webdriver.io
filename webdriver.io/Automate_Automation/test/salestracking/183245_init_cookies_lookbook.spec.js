/**
 * Created by agultsov on 01/17/20.
 * split and refactored by Marco T Ribeiro 08/02/2021
 */
const ChatAvailabilityPage = require('../../pages/backoffice/chatavailability.page');
const CookiePage = require('../../lib/cookie');
const speclib = require('../../lib/speclib');

// it was not created a new pagefrom, because use the same procedure that sb
ChatAvailabilityPage.liveChatFrom = ChatAvailabilityPage.IT_IS_COMMING_FROM.sidebar;

speclib.descSkipIf(ChatAvailabilityPage.isProdEnv || ChatAvailabilityPage.isTeamMode)(`${ChatAvailabilityPage.RETAILER} New Salestracking`, () => {
  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.salestracking);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  it('C183245 [rep mode] Salestracking Initiation - Cookies - Lookbook', () => {
    speclib.addTestId('183245');
    speclib.addStepAutoNumber('Log in BO');
    ChatAvailabilityPage.openBoAndLoginByRole(ChatAvailabilityPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Open Lookbook page');
    ChatAvailabilityPage.openBoPageByUrl(
      `/lookbooks/${ChatAvailabilityPage.REP_NAME}/54d3863bc7f645b?sf_rep=${ChatAvailabilityPage.REP_NAME}&event_source=lookbook`
    );
    browser.pause(500);

    speclib.addStepAutoNumber('Verify Cookie Tracking');
    expect(CookiePage.valueOfAcquisitionCookie()).toEqual('shoppingLink');
    expect(CookiePage.valueOfTrackingCookie()).toEqual('true');
    expect(CookiePage.valueOfTrackingRepCookie()).toEqual(ChatAvailabilityPage.REP_NAME);
  });
});

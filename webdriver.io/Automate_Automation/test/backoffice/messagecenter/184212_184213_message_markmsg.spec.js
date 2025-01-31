/* eslint-disable wdio/await-expect */
const MessagePage = require('../../../pages/backoffice/messagecenter/message.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf((MessagePage.isProdEnv && MessagePage.isTeamMode)
  || !MessagePage.hasMessageCenter)(`${MessagePage.RETAILER} My Messages-Mark messages`, () => {
  before(() => {
    MessagePage.openBoAndLoginByRole(MessagePage.ROLE.rep, false);
    MessagePage.clickOnMyMessages();
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  // We need one unread message available in the inbox for this entire test suite to run correctly
  // To get the message, run the following command and wait a couple of minutes before testing:
  // node_modules/.bin/mocha test/utils/sendMail.js

  it('C184212 Mark message as read', () => {
    speclib.addTestId('184212');
    if (MessagePage.hasPaginationDisplayed) {
      speclib.addStepAutoNumber('Apply "unread" filter');
      MessagePage.applyFilter(MessagePage.filterMsgOpts.unread);
      if (MessagePage.messageLinkUnread.length > 0) {
        speclib.addStepAutoNumber('Check first message');
        MessagePage.checkFirstMsg();
        speclib.addStepAutoNumber('Click mark read button');
        MessagePage.clickOnMarkReadLnk();
        speclib.addStepAutoNumber('Verify message marked as read');
        expect(MessagePage.messageLinkRead.length).toBeGreaterThanOrEqual(1);
      } else {
        speclib.addStepAutoNumber('The retailer doesn\'t have read messages (skipped)');
      }
    } else {
      speclib.addStepAutoNumber('The page doesn\'t have pagination displayed (skipped)');
    }
  });

  it('C184213 Mark message as unread', () => {
    speclib.addTestId('184213');
    if (MessagePage.hasPaginationDisplayed) {
      speclib.addStepAutoNumber('Apply "read" filter');
      MessagePage.applyFilter(MessagePage.filterMsgOpts.read);
      speclib.addStepAutoNumber('Check first message');
      MessagePage.checkFirstMsg();
      speclib.addStepAutoNumber('Click mark unread button');
      MessagePage.clickOnMarkUnreadLnk();
      speclib.addStepAutoNumber('Verify message marked as unread');
      expect(MessagePage.messageLinkUnread.length).toBeGreaterThanOrEqual(1);

      MessagePage.checkFirstMsg();
    } else {
      speclib.addStepAutoNumber('The page doesn\' have pagination displayed (skipped)');
    }
  });
});

/* eslint-disable wdio/await-expect */
const MessagePage = require('../../../pages/backoffice/messagecenter/message.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(
  (MessagePage.isProdEnv && MessagePage.isTeamMode) || !MessagePage.hasMessageCenter
)(`${MessagePage.RETAILER} My Messages`, () => {
  before(() => {
    MessagePage.openBoAndLoginByRole(MessagePage.ROLE.rep, false);
    MessagePage.clickOnMyMessages();
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  // checking Left menu options
  it('C184216 Trash messages displayed', () => {
    speclib.addTestId('184216');
    speclib.addStepAutoNumber('Apply all messages filter');
    MessagePage.applyFilter(MessagePage.filterMsgOpts.allMessages);
    speclib.addStepAutoNumber('Click on trash option');
    MessagePage.clickOnTrashOpt();
    speclib.addStepAutoNumber('Verify url');
    expect(browser).toHaveUrlContaining('/messages/trash');
  });

  it('C184217 Archived messages displayed', () => {
    speclib.addTestId('184217');
    speclib.addStepAutoNumber('Click on archive option');
    MessagePage.clickOnArchivedOpt();
    speclib.addStepAutoNumber('Verify url');
    expect(browser).toHaveUrlContaining('/messages/archive');
  });

  it('C184218 Sent messages displayed', () => {
    speclib.addTestId('184218');
    speclib.addStepAutoNumber('Click on sent option');
    MessagePage.clickOnSentOpt();
    speclib.addStepAutoNumber('Verify url');
    expect(browser).toHaveUrlContaining('/messages/sent');
  });

  it('C184219 Inbox messages displayed', () => {
    speclib.addTestId('184219');
    speclib.addStepAutoNumber('Click on inbox option');
    MessagePage.clickOnInboxOpt();
    speclib.addStepAutoNumber('Verify url');
    expect(browser).toHaveUrlContaining('/messages/inbox');
  });
});

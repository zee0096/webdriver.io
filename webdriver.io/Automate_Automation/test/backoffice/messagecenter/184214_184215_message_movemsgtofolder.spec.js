/* eslint-disable wdio/await-expect */
const MessagePage = require('../../../pages/backoffice/messagecenter/message.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf((MessagePage.isProdEnv && MessagePage.isTeamMode)
  || !MessagePage.hasMessageCenter)(`${MessagePage.RETAILER} My Messages side menu`, () => {
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

  // checking Left menu options

  it('C184214 Move message to archived folder', () => {
    speclib.addTestId('184214');
    if (MessagePage.messageLink.length > 0) {
      speclib.addStepAutoNumber('Click inbox left menu option');
      MessagePage.msgLeftMenuOption(MessagePage.msgLeftMenuOpts.Inbox);
      speclib.addStepAutoNumber('Apply "All messages" filter');
      MessagePage.applyFilter(MessagePage.filterMsgOpts.allMessages);
      speclib.addStepAutoNumber('Check first message');
      MessagePage.checkFirstMsg();
      speclib.addStepAutoNumber('Click archive button');
      MessagePage.archivedButton.moveTo();
      MessagePage.archivedButton.click();
      speclib.addStepAutoNumber('Get ajax message');
      const msgNotification = MessagePage.getAjaxMsg();
      speclib.addaddStepAutoNumberStep('Verify message moved to archive');
      expect(msgNotification).toEqual('Messages were moved to archive');
    }
  });

  it('C184215 Move message to trash folder', () => {
    speclib.addTestId('184215');
    if (MessagePage.messageLink.length > 0) {
      speclib.addStepAutoNumber('Click inbox left menu option');
      MessagePage.msgLeftMenuOption(MessagePage.msgLeftMenuOpts.Inbox);
      speclib.addStepAutoNumber('Apply "All messages" filter');
      MessagePage.applyFilter(MessagePage.filterMsgOpts.allMessages);
      speclib.addStepAutoNumber('Check first message');
      MessagePage.checkFirstMsg();
      speclib.addStepAutoNumber('Click delete button');
      MessagePage.deleteButton.moveTo();
      MessagePage.deleteButton.click();
      speclib.addStepAutoNumber('Get ajax message');
      const msgNotification = MessagePage.getAjaxMsg();
      speclib.addStepAutoNumber('Verify message was deleted');
      expect(msgNotification).toEqual('Message was moved to trash');
    }
  });
});

/* eslint-disable wdio/await-expect */
const MessagePage = require('../../../pages/backoffice/messagecenter/message.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf((MessagePage.isProdEnv && MessagePage.isTeamMode)
  || !MessagePage.hasMessageCenter)(`${MessagePage.RETAILER} My Messages filters and next/previous btn`, () => {
  before(() => {
    MessagePage.openBoAndLoginByRole(MessagePage.ROLE.rep, false);
    MessagePage.clickOnMyMessages();
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  // checking pagination
  it('C184230 Next Page button works', () => {
    speclib.addTestId('184230');
    if (MessagePage.hasMoreThanOnePage) {
      speclib.addStepAutoNumber('Verify next page button');
      expect(MessagePage.MessagePagening('Next')).toBeTruthy();
    } else {
      speclib.addStepAutoNumber('Verify next page button (Skipped)');
    }
  });

  it('C184231 Previous Page button works', () => {
    speclib.addTestId('184231');
    if (MessagePage.hasMoreThanOnePage) {
      if (MessagePage.takeStartNumber() === 1) {
        MessagePage.waitForLoadingIconDisappear(10000);
        MessagePage.clickOnNextPageBtn();
      }
      speclib.addStepAutoNumber('Verify previous button');
      expect(MessagePage.MessagePagening('Previous')).toBeTruthy();
    } else {
      speclib.addStepAutoNumber('Verify previous button (Skipped)');
    }
  });

  // checking filters
  it('C184232 Read filter works', () => {
    speclib.addTestId('184232');
    MessagePage.waitForLoadingIconDisappear();
    speclib.addStepAutoNumber('Apply "read" filter');
    MessagePage.applyFilter(MessagePage.filterMsgOpts.read);
    MessagePage.waitForLoadingIconDisappear(10000);

    speclib.addStepAutoNumber('Verify "read" filter works');
    expect(MessagePage.totalOfLines()).toEqual(MessagePage.messageLinkRead.length);
    // expect(MessagePage.messageLink.length).toEqual(MessagePage.messageLinkRead.length);
  });

  it('C184233 Unread filter works', () => {
    speclib.addTestId('184233');
    speclib.addStepAutoNumber('Apply "unread" filter');
    MessagePage.applyFilter(MessagePage.filterMsgOpts.unread);

    if (MessagePage.messageLinkUnread.length > 0) {
      speclib.addStepAutoNumber('Verify "unread" filter works');
      MessagePage.waitForLoadingIconDisappear(10000);
      expect(MessagePage.totalOfLines()).toEqual(MessagePage.messageLinkUnread.length);
    } else {
      speclib.addStepAutoNumber('The retailer doesn\'t have uread messages (skipped)');
    }
  });

  it('C184234 All Messages filter works', () => {
    speclib.addTestId('184234');
    speclib.addStepAutoNumber('Apply "all messages" filter');
    MessagePage.applyFilter(MessagePage.filterMsgOpts.allMessages);
    speclib.addStepAutoNumber('Verify "all messages" filter works');
    expect(MessagePage.messageLink.length).toEqual((MessagePage.messageLinkUnread.length
      + MessagePage.messageLinkRead.length));
  });
});

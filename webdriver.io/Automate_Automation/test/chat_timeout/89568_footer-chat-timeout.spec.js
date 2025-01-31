// footer-chat-timeout.spec.js

/*
 * If chat and chat timeout specs are kept within the same suite,
 * they end up being launched simultaneously,
 * as a result they overlap and error out with false positives.
 * To prevent this, timeouts are now in a separate suite and Jenkins job will
 * launch them one by one.
 */

const ChatAvailabilityPage = require('../../pages/backoffice/chatavailability.page');
const ChatTimeoutPage = require('../../pages/chat_timeout/chattimeout.page');
const FooterPage = require('../../pages/footer.page');
const LiveChat = require('../../lib/livechat');
const speclib = require('../../lib/speclib');

ChatAvailabilityPage.liveChatFrom = FooterPage.IT_IS_COMMING_FROM.footer;
LiveChat.liveChatFrom = FooterPage.IT_IS_COMMING_FROM.footer;

const LINKTIMEOUT = ChatTimeoutPage.getLinkTimeout();
const CHATTIMEOUT = ChatTimeoutPage.getChatTimeout(FooterPage.IT_IS_COMMING_FROM.footer);
const EMAIL = `qatest_ft_chat_timeout${FooterPage.rawDateString()}@salesfloor.net`;

speclib.descSkipIf(FooterPage.isProdEnv
  || !FooterPage.hasFooter || !FooterPage.hasLiveChat)(`${FooterPage.RETAILER} (${ChatTimeoutPage.chatMode}) Footer Chat Timeout`, () => {
  it('C184160 Footer live chat timeout workflow', () => {
    speclib.addTestId('184160');
    speclib.addModule(speclib.ALLURE.module.chatTimeout);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addStepAutoNumber('Open BO page and log in as test rep');
    ChatTimeoutPage.openBoAndLoginByRole(ChatAvailabilityPage.ROLE.rep, false);
    speclib.addStepAutoNumber('Turn on available for chat toggle');
    ChatAvailabilityPage.turnAvailableForChatTo(true);
    speclib.addStepAutoNumber('Open footer page');
    FooterPage.openFooterPage({ openNewWindow : true });
    FooterPage.waitForLiveChatAvailable();
    speclib.addStepAutoNumber('Click on live chat');
    FooterPage.clickLiveChatLnk();
    speclib.addStepAutoNumber('Request live chat');
    LiveChat.requestLiveChat(EMAIL, { textMessage : 'Test:C89568' });
    speclib.addStepAutoNumber('Switch back to backoffice');
    ChatAvailabilityPage.switchToBackofficeWindow();
    speclib.addStepAutoNumber('Get countdown value');
    const STARTTIME = Date.now();
    const INITIALCOUNTDOWN = ChatTimeoutPage.getCountdownValue();

    // ******** Phase I - Redirect link on chat ********
    speclib.addStepAutoNumber('Switch to widget window');
    FooterPage.switchToWidgetWindow();
    speclib.addStepAutoNumber('Wait for redirect link');
    ChatTimeoutPage.redirectLink.waitForDisplayed({ timeout : (LINKTIMEOUT + 1) * 1000 });

    speclib.addStepAutoNumber('Verify time when the link was displayed');
    const ENDTIME_LINK = (Date.now() - STARTTIME) / 1000;
    expect(ENDTIME_LINK).toBeGreaterThanOrEqual(LINKTIMEOUT - 2);
    expect(ENDTIME_LINK).toBeLessThan(LINKTIMEOUT + 1);
    expect(ChatTimeoutPage.redirectLink).toBeDisplayed();

    // ****** Phase II - time out *************
    speclib.addStepAutoNumber('Switch back to backoffice');
    ChatAvailabilityPage.switchToBackofficeWindow();
    speclib.addStepAutoNumber('Wait for request chat timeout');
    ChatTimeoutPage.waitRequestChatTimeoutIn(CHATTIMEOUT + 2 - ENDTIME_LINK);

    speclib.addStepAutoNumber('Verify end time');
    const ENDTIME = (Date.now() - STARTTIME) / 1000;
    expect(ENDTIME).toBeGreaterThanOrEqual(CHATTIMEOUT - 2);
    expect(ENDTIME).toBeLessThan(CHATTIMEOUT + 5.5);
    expect(INITIALCOUNTDOWN).toBeLessThanOrEqual(CHATTIMEOUT);
    expect(INITIALCOUNTDOWN).toBeGreaterThanOrEqual(CHATTIMEOUT - 8);
    expect(ChatTimeoutPage.countdownText).not.toBeDisplayed();

    // ****** Phase III  - Redirect to email form in chat *************
    speclib.addStepAutoNumber('Switch to widget window');
    FooterPage.switchToWidgetWindow();
    speclib.addStepAutoNumber('Verify presence of email page');
    expect(ChatTimeoutPage.emailPage).toBeDisplayed();
  });
});

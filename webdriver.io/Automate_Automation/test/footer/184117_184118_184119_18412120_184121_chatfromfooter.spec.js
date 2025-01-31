const ContactsMenuPage = require('../../pages/backoffice/contacts/contactsmenu.page');

const BackOfficePage = require('../../pages/backoffice.page');
const FooterPage = require('../../pages/footer.page');
const LiveChat = require('../../lib/livechat');
const ChatAvailabilityPage = require('../../pages/backoffice/chatavailability.page');
const speclib = require('../../lib/speclib');

const sentURL = 'www.example.com';
const email = `qatest_chat${FooterPage.rawDateString()}@salesfloor.net`;

speclib.descSkipIf(LiveChat.isProdEnv || !FooterPage.hasFooter || !FooterPage.hasLiveChat)(`${FooterPage.RETAILER} Footer Chat`, () => {
  // eslint-disable-next-line mocha/no-top-level-hooks
  before(() => {
    // setting the class variables
    ChatAvailabilityPage.liveChatFrom = ChatAvailabilityPage.IT_IS_COMMING_FROM.footer;
    LiveChat.liveChatFrom = ChatAvailabilityPage.IT_IS_COMMING_FROM.footer;
    speclib.addModule(speclib.ALLURE.module.footer);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
  });

  it('C184117 As a Rep, I receive distinct notifications for chat from footer', () => {
    speclib.addTestId('184117');

    speclib.addStepAutoNumber('Login BO page as rep');
    ChatAvailabilityPage.openBoAndLoginByRole(ChatAvailabilityPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Turn available chan ON');
    ChatAvailabilityPage.turnAvailableForChatTo(true);

    speclib.addStepAutoNumber('Open Footer page');
    FooterPage.openFooterPage({ openNewWindow : true });

    FooterPage.waitForLiveChatAvailable();

    speclib.addStepAutoNumber('Click on live chat link in footer');
    FooterPage.clickLiveChatLnk();

    speclib.addStepAutoNumber('Click on Request a live chat (email)');
    LiveChat.requestLiveChat(email);

    speclib.addStepAutoNumber('Switch to BO Window and accept live chat');
    ChatAvailabilityPage.switchToBackofficeWindow();
    ChatAvailabilityPage.acceptLiveChat();

    speclib.addStepAutoNumber('Verify send message button id displayed');
    expect(LiveChat.sendMessageBtn).toBeDisplayed();
  });

  it('C184118 Live Chat - Customer sends a msg to Rep', () => {
    speclib.addTestId('184118');

    speclib.addStepAutoNumber('Switch to Widget window');
    FooterPage.switchToWidgetWindow();
    const customerMsg = 'This is a customer message';

    speclib.addStepAutoNumber('Customer sends msg');
    LiveChat.customerSendsMsg(customerMsg);

    speclib.addStepAutoNumber('Validate chat client has last msg sent');
    expect(LiveChat.chatClientlastMsgSend).toHaveText(customerMsg);

    speclib.addStepAutoNumber('Switch to Rep Live chat');
    ChatAvailabilityPage.switchToRepLiveChatWindow();

    speclib.addStepAutoNumber('Validate Rep received customer msg');
    expect(LiveChat.chatRepLastMsgReceived).toHaveTextContaining(customerMsg);
  });

  it('C184118 Live Chat - Rep send msg to Customer', () => {
    speclib.addTestId('184118');

    speclib.addStepAutoNumber('Switch to Rep live Chat window');
    ChatAvailabilityPage.switchToRepLiveChatWindow();
    const repMsg = 'This is a rep message';

    speclib.addStepAutoNumber('Rep send a msg to customer');
    LiveChat.repSendsMsg(repMsg);

    speclib.addStepAutoNumber('Validate msg in chat rep window');
    expect(LiveChat.chatReplastMsgSend).toHaveTextContaining(repMsg);

    speclib.addStepAutoNumber('SaddStepAutoNumberwitch to Widget window');
    FooterPage.switchToWidgetWindow();

    speclib.addStepAutoNumber('Validate msg in customer chat window');
    expect(LiveChat.chatClientlastMsgReceived).toHaveTextContaining(repMsg);
  });

  it('C184119 Live Chat - Rep sends a url to customer', () => {
    speclib.addTestId('184119');

    speclib.addStepAutoNumber('Switch to Rep live Chat window');
    ChatAvailabilityPage.switchToRepLiveChatWindow();

    speclib.addStepAutoNumber(`Rep send an URL (${sentURL}) to customer`);
    LiveChat.repSendsMsg(sentURL);

    speclib.addStepAutoNumber('Validate msg (url) sent customer in Rep chat window');
    expect(LiveChat.chatReplastMsgSend).toHaveTextContaining(sentURL);

    speclib.addStepAutoNumber('Swtich to Customer window');
    FooterPage.switchToWidgetWindow();

    speclib.addStepAutoNumber('Click on URL received (open the url)');
    LiveChat.clickInUrlOnChatBox();

    try {
      speclib.addStepAutoNumber('Validate the page has URL clicked/received');
      expect(browser).toHaveUrl(`http://${sentURL}/`);
    // eslint-disable-next-line no-empty
    } catch (e) {
    } finally {
      speclib.addStepAutoNumber('Close URL page received');
      ChatAvailabilityPage.closeWindowAndReturnToOtherWindow(ChatAvailabilityPage.chatRepWindowId);
    }
  });

  speclib.itSkipIf(!BackOfficePage.hasProducts)('C184120 Rep Share a product to client and both sides are validated', () => {
    speclib.addStepAutoNumber('184120');

    speclib.addStepAutoNumber('Switch to Rep live Chat window');
    ChatAvailabilityPage.switchToRepLiveChatWindow();

    speclib.addStepAutoNumber('Click on add product Icon');
    LiveChat.clickOnAddProductIcn();

    speclib.addStepAutoNumber('Check a product and get the product description');
    LiveChat.checkAnProdInProdLib();

    speclib.addStepAutoNumber('Click on Add button');
    LiveChat.clickOnAddBtn();

    speclib.addStepAutoNumber('Verify prod was sent from Rep');
    expect(LiveChat.getProductName).toContain(LiveChat.lastProdSendByRep.getText());

    speclib.addStepAutoNumber('Switch to Widget window');
    FooterPage.switchToWidgetWindow();

    speclib.addStepAutoNumber('Verify customer received the product');
    expect(LiveChat.getProductName).toContain(LiveChat.chatClientlastProdReceived.getText());
  });

  speclib.itSkipIf(!ContactsMenuPage.hasContacts)('C184121 Email specified in Chat request form shows up in Contact list', () => {
    speclib.addTestId('184121');

    speclib.addStepAutoNumber('open Backoffice page as rep and go to contact page');
    ChatAvailabilityPage.switchToBackofficeWindow();
    ChatAvailabilityPage.openMyContacts();

    speclib.addStepAutoNumber('Validate contact email is deleted');
    expect(ContactsMenuPage.deleteContact(email)).toBeTruthy();
  });
});

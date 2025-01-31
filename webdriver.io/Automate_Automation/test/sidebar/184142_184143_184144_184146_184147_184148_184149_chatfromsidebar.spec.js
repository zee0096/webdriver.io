// chat.spec.js

const ContactsMenuPage = require('../../pages/backoffice/contacts/contactsmenu.page');

const SidebarPage = require('../../pages/sidebar.page');
const LiveChat = require('../../lib/livechat');
const ChatAvailabilityPage = require('../../pages/backoffice/chatavailability.page');
const speclib = require('../../lib/speclib');
const BackOfficePage = require('../../pages/backoffice.page');

const sentURL = 'www.example.com';
const email = `qatest_chat${SidebarPage.rawDateString()}@salesfloor.net`;

speclib.descSkipIf(speclib.isProdEnv || !SidebarPage.hasSidebar)(`${SidebarPage.RETAILER} Sidebar Chat`, () => {
  // eslint-disable-next-line mocha/no-top-level-hooks
  before(() => {
    // setting the class variables
    ChatAvailabilityPage.liveChatFrom = ChatAvailabilityPage.IT_IS_COMMING_FROM.sidebar;
    LiveChat.liveChatFrom = ChatAvailabilityPage.IT_IS_COMMING_FROM.sidebar;
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.sidebar);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
  });

  it('C184142 As a Rep, I receive distinct notifications for chat from sidebar', () => {
    speclib.addTestId('184142');

    speclib.addStepAutoNumber('Login BO page as rep');
    ChatAvailabilityPage.openBoAndLoginByRole(ChatAvailabilityPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Turn available chan ON');
    ChatAvailabilityPage.turnAvailableForChatTo(true);

    speclib.addStepAutoNumber('Open Sidebar page');
    SidebarPage.openSidebarPage({ openNewWindow : true });

    if (ChatAvailabilityPage.hasDotChatWidget) {
      speclib.addStepAutoNumber('Validate Dot chat widget is available');
      expect(ChatAvailabilityPage.chatIsAvailable).toBeTruthy();
    }

    speclib.addStepAutoNumber('Click on widget');
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Validate widget/live chat is available');
    expect(LiveChat.isChatAvailable()).toBeTruthy();
    LiveChat.clickOnLiveChat();

    speclib.addStepAutoNumber('Request a live chat (email)');
    LiveChat.requestLiveChat(email);

    speclib.addStepAutoNumber('Switch to BO Window and accept live chat');
    ChatAvailabilityPage.switchToBackofficeWindow();
    ChatAvailabilityPage.acceptLiveChat();

    speclib.addStepAutoNumber('Verify send message button id displayed');
    expect(LiveChat.sendMessageBtn).toBeDisplayed();
  });

  it('C184143 Live Chat - Customer sends a msg to Rep', () => {
    speclib.addTestId('184143');

    speclib.addStepAutoNumber('switch to Widget window');
    SidebarPage.switchToWidgetWindow();

    speclib.addStepAutoNumber('Customer send a msg');
    LiveChat.customerSendsMsg('This is a customer message');

    speclib.addStepAutoNumber('Validate chat client send msg');
    expect(LiveChat.chatClientlastMsgSend).toHaveText('This is a customer message');

    speclib.addStepAutoNumber('Switch to Rep Live Chat Window');
    ChatAvailabilityPage.switchToRepLiveChatWindow();

    speclib.addStepAutoNumber('Validate chat rep window received customer msg');
    expect(LiveChat.chatRepLastMsgReceived).toHaveTextContaining('This is a customer message');
  });

  it('C184144 Live Chat - Rep send msg to Customer', () => {
    speclib.addTestId('184144');

    speclib.addStepAutoNumber('Switch to Rep window');
    ChatAvailabilityPage.switchToRepLiveChatWindow();

    speclib.addStepAutoNumber('Rep send a msg');
    LiveChat.repSendsMsg('This is a rep message');

    speclib.addStepAutoNumber('Validate chat rep send msg');
    expect(LiveChat.chatReplastMsgSend).toHaveTextContaining('This is a rep message');

    speclib.addStepAutoNumber('Switch to customer chat Window');
    SidebarPage.switchToWidgetWindow();
    LiveChat.switchToWidgetIframe();

    speclib.addStepAutoNumber('Validate chat customer window received rep msg');
    expect(LiveChat.chatClientlastMsgReceived).toHaveTextContaining('This is a rep message');
  });

  it('C184146 Live Chat - Rep sends a url to customer', () => {
    speclib.addTestId('184146');

    speclib.addStepAutoNumber('Switch to Rep window');
    ChatAvailabilityPage.switchToRepLiveChatWindow();

    speclib.addStepAutoNumber('Rep send an URL');
    LiveChat.repSendsMsg(sentURL);

    speclib.addStepAutoNumber('Verify Rep chat has url msg');
    expect(LiveChat.chatReplastMsgSend).toHaveTextContaining(sentURL);
  });

  it('C184147 Customer click on url received and check the page', () => {
    speclib.addTestId('184147');

    speclib.addStepAutoNumber('Switch to widget window');
    SidebarPage.switchToWidgetWindow();

    speclib.addStepAutoNumber('Open URL from chat');
    LiveChat.clickInUrlOnChatBox();

    speclib.addStepAutoNumber('Verify open a new window with expected Url from chat');
    expect(browser).toHaveUrl(`http://${sentURL}/`);

    ChatAvailabilityPage.closeWindowAndReturnToOtherWindow(ChatAvailabilityPage.chatRepWindowId);
  });

  speclib.itSkipIf(!BackOfficePage.hasProducts)('C184148 Rep Share a product to client and both sides are validated', () => {
    speclib.addTestId('184148');

    speclib.addStepAutoNumber('Switch to Rep chat window');
    // see the synchronization of products DB when it is failled (error)
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
    SidebarPage.switchToWidgetWindow();
    LiveChat.switchToWidgetIframe();

    speclib.addStepAutoNumber('Verify customer received the product');
    expect(LiveChat.getProductName).toContain(LiveChat.chatClientlastProdReceived.getText());
  });

  speclib.itSkipIf(!ContactsMenuPage.hasContacts)('C184149 Email specified in Chat request form shows up in Contact list', () => {
    speclib.addTestId('184149');

    speclib.addStepAutoNumber('Open contact menu page');
    ChatAvailabilityPage.switchToBackofficeWindow();
    ChatAvailabilityPage.openMyContacts();

    speclib.addStepAutoNumber('Verify Contact was deleted');
    expect(ContactsMenuPage.deleteContact(email)).toBeTruthy();
  });
});

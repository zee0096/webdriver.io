/* eslint-disable wdio/await-expect */
const ContactsMenuPage = require('../../pages/backoffice/contacts/contactsmenu.page');
const LiveChat = require('../../lib/livechat');
const StorefrontPage = require('../../pages/storefront.page');
const ChatAvailabilityPage = require('../../pages/backoffice/chatavailability.page');
const speclib = require('../../lib/speclib');
const BackOfficePage = require('../../pages/backoffice.page');

// const name = 'Reggie Repartie';
const sentURL = 'www.example.com';
const email = `qatest_chat${StorefrontPage.rawDateString()}@salesfloor.net`;

speclib.descSkipIf(
  StorefrontPage.isProdEnv || !StorefrontPage.hasLiveChat
)(`${StorefrontPage.RETAILER} Storefront Chat`, () => {
  // eslint-disable-next-line mocha/no-top-level-hooks
  before(() => {
    // setting the class variables
    StorefrontPage.liveChatFrom = StorefrontPage.IT_IS_COMMING_FROM.storefront;
    LiveChat.liveChatFrom = StorefrontPage.IT_IS_COMMING_FROM.storefront;
  }, 3);

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.storefront);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
  });

  it('C184063 As a Rep, I receive distinct notifications for chat from storefront', () => {
    speclib.addTestId('184063');

    speclib.addStepAutoNumber('Open BO page as rep');
    ChatAvailabilityPage.openBoAndLoginByRole(ChatAvailabilityPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Validate chat button is present');
    expect(ChatAvailabilityPage.isChatButtonPresent()).toBeTruthy();

    speclib.addStepAutoNumber('Turn On the leaver for available for chat');
    ChatAvailabilityPage.turnAvailableForChatTo(true);

    speclib.addStepAutoNumber('Open rep storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME, true);

    speclib.addStepAutoNumber('Validate Chat has available status in storefront');
    expect(StorefrontPage.chatAvailableStatus()).toBeTruthy();

    speclib.addStepAutoNumber('Click on live chat link');
    StorefrontPage.clickLiveChatLink();

    speclib.addStepAutoNumber('Request live chat form using email');
    LiveChat.requestLiveChat(email);

    speclib.addStepAutoNumber('Switch to BO window');
    ChatAvailabilityPage.switchToBackofficeWindow();

    speclib.addStepAutoNumber('Accept live chat');
    ChatAvailabilityPage.acceptLiveChat();

    speclib.addStepAutoNumber('Validate send msg button is displayed');
    expect(LiveChat.sendMessageBtn).toBeDisplayed();
  });

  it('C180734 Live Chat from Storefront - Customer and Rep can chat together', () => {
    speclib.addTestId('180734');

    speclib.addStepAutoNumber('Switch to widget window');
    StorefrontPage.switchToWidgetWindow();

    speclib.addStepAutoNumber('Customer send message');
    LiveChat.customerSendsMsg('This is a customer message');

    speclib.addStepAutoNumber('Customer Widget display the msg sent');
    expect(LiveChat.chatClientlastMsgSend).toHaveText('This is a customer message');

    speclib.addStepAutoNumber('Switch to Rep chat window');
    ChatAvailabilityPage.switchToRepLiveChatWindow();

    speclib.addStepAutoNumber('Validate Chat Rep received customer msg');
    expect(LiveChat.chatRepLastMsgReceived).toHaveTextContaining('This is a customer message');

    speclib.addStepAutoNumber('Switch to Rep window');
    ChatAvailabilityPage.switchToRepLiveChatWindow();

    speclib.addStepAutoNumber('Rep send a msg');
    LiveChat.repSendsMsg('This is a rep message');

    speclib.addStepAutoNumber('Validate chat rep send msg');
    expect(LiveChat.chatReplastMsgSend).toHaveTextContaining('This is a rep message');

    speclib.addStepAutoNumber('Switch to customer chat Window');
    StorefrontPage.switchToWidgetWindow();

    speclib.addStepAutoNumber('Validate chat customer window received rep msg');
    expect(LiveChat.chatClientlastMsgReceived).toHaveTextContaining('This is a rep message');
  });

  it('C180729 Live Chat - Customer click on url received and check the page', () => {
    speclib.addTestId('180729');

    speclib.addStepAutoNumber('Switch to Rep window');
    ChatAvailabilityPage.switchToRepLiveChatWindow();

    speclib.addStepAutoNumber('Rep send an URL');
    LiveChat.repSendsMsg(sentURL);

    speclib.addStepAutoNumber('Verify Rep chat has url msg');
    expect(LiveChat.chatReplastMsgSend).toHaveTextContaining(sentURL);

    speclib.addStepAutoNumber('Switch to widget window');
    StorefrontPage.switchToWidgetWindow();

    speclib.addStepAutoNumber('Open URL from chat');
    LiveChat.clickInUrlOnChatBox();

    speclib.addStepAutoNumber('Verify open a new window with expected Url from chat');
    expect(browser).toHaveUrl(`http://${sentURL}/`);

    ChatAvailabilityPage.closeWindowAndReturnToOtherWindow(ChatAvailabilityPage.chatRepWindowId);
  });

  speclib.itSkipIf(!BackOfficePage.hasProducts)('C180796 Rep Share a product to client and both sides are validated', () => {
    speclib.addTestId('180796');

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
    StorefrontPage.switchToWidgetWindow();

    speclib.addStepAutoNumber('Verify customer received the product');
    expect(LiveChat.getProductName).toContain(LiveChat.chatClientlastProdReceived.getText());
  });

  speclib.itSkipIf(!ContactsMenuPage.hasContacts)(`C180735 Email specified in Chat request form 
    shows up in Contact list`, () => {
    speclib.addTestId('180735');

    speclib.addStepAutoNumber('Open contact menu page');
    ChatAvailabilityPage.switchToBackofficeWindow();
    ChatAvailabilityPage.openMyContacts();

    speclib.addStepAutoNumber('Verify Contact was deleted');
    expect(ContactsMenuPage.deleteContact(email)).toBeTruthy();
  });
});

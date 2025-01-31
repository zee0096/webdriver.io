const ComposePage = require('../../../pages/backoffice/messagecenter/compose.page');
const MessagePage = require('../../../pages/backoffice/messagecenter/message.page');
const speclib = require('../../../lib/speclib');

const customer = 'qatest+sub@salesfloor.net';

speclib.descSkipIf(!MessagePage.hasMessageCenter)(`${ComposePage.RETAILER} Compose Email`, () => {
  before(() => {
    speclib.addStepAutoNumber('Login BO page as rep');
    ComposePage.openBoAndLoginByRole(ComposePage.ROLE.rep, false);
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    browser.refresh();
    speclib.addStepAutoNumber('Go to compose page via deep link');
    ComposePage.deeplinkToComposeMessagePage();
  });

  speclib.itSkipIf(ComposePage.isTeamMode && ComposePage.isProdEnv)('C184235 Send a message using Address Book (multiple recipients)', () => {
    speclib.addTestId('184235');
    speclib.addStepAutoNumber('Set recipients by address book');
    const recipients = ComposePage.setRecipientByAddressBook([customer]);
    speclib.addStepAutoNumber('Get chosen recipients');
    const results = ComposePage.getRecipients();
    speclib.addStepAutoNumber('Verify recipients are correct');
    expect(ComposePage.recipientsMatch(recipients, results)).toBeTruthy();
    speclib.addStepAutoNumber('Set subject');
    ComposePage.setSubject('# This is a QA Test using Address Book');
    speclib.addStepAutoNumber('Set message');
    ComposePage.setMessage('This is the body of the message. Nothing to see here!');
    speclib.addStepAutoNumber('Verify message was sent correctly');
    expect(ComposePage.sendMessage()).toBeTruthy();
  });

  speclib.itSkipIf(!MessagePage.hasProducts)('C184236 Send direct email to customer with product attached', () => {
    speclib.addTestId('184236');
    speclib.addStepAutoNumber('Set recipients by text');
    ComposePage.setRecipientsByText(customer);
    speclib.addStepAutoNumber('Set subject');
    ComposePage.setSubject('# This is a QA Test message with a product');
    speclib.addStepAutoNumber('Attach product');
    const expectedDescription = ComposePage.attachProduct();
    speclib.addStepAutoNumber('Get attached products text');
    const description = ComposePage.getAttachedProductText();
    speclib.addStepAutoNumber('Verify products text is correct');
    expect(expectedDescription).toEqual(description);
    if (!(ComposePage.isTeamMode && ComposePage.isProdEnv)) {
      speclib.addStepAutoNumber('Set message');
      ComposePage.setMessage('This is the body of the message.');
      speclib.addStepAutoNumber('Verify message was sent correctly');
      expect(ComposePage.sendMessage()).toBeTruthy();
    }
  });

  speclib.itSkipIf(!MessagePage.hasAssets)('C184237 Send direct email to customers with asset attached', () => {
    speclib.addTestId('184237');
    speclib.addStepAutoNumber('Set recipients by text');
    ComposePage.setRecipientsByText([customer]);
    speclib.addStepAutoNumber('Get recipients');
    const results = ComposePage.getRecipients();
    speclib.addStepAutoNumber('Verify recipients are correct');
    expect(ComposePage.recipientsMatch([customer], results)).toBeTruthy();
    speclib.addStepAutoNumber('Set subject');
    ComposePage.setSubject('# This is a QA Test message with an asset');
    speclib.addStepAutoNumber('Set message');
    ComposePage.setMessage('This is the body of the message with the asset.');
    speclib.addStepAutoNumber('Attach asset');
    ComposePage.attachAsset();
    speclib.addStepAutoNumber('Wait for asset to be attached');
    ComposePage.waitForAssetAttach();
    if (!(ComposePage.isTeamMode && ComposePage.isProdEnv)) {
      speclib.addStepAutoNumber('Verify message was sent correctly');
      expect(ComposePage.sendMessage()).toBeTruthy();
    }
  });
});

const ContactsMenuPage = require('../../../pages/backoffice/contacts/contactsmenu.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(
  (ContactsMenuPage.isProdEnv && ContactsMenuPage.isTeamMode) || !ContactsMenuPage.hasContacts,
)(`${ContactsMenuPage.RETAILER} Contacts`, () => {
  it('C112221 Add new email-based contact from menu option', () => {
    speclib.addModule(speclib.ALLURE.module.contacts);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('112221');

    speclib.addStepAutoNumber('Open back office page and login as rep');
    ContactsMenuPage.openBoAndLoginByRole(ContactsMenuPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Click add contact from menu');
    ContactsMenuPage.addContactFromMenu();
    speclib.addStepAutoNumber('Add new email-based contact and verify it is added');
    expect(ContactsMenuPage.addNewContact(ContactsMenuPage.customer.email)).toBe(true);
    speclib.addStepAutoNumber('Click on contacts and my contacts option');
    ContactsMenuPage.openMyContacts();
    speclib.addStepAutoNumber('Delete email-based contact and verify it is deleted');
    expect(ContactsMenuPage.deleteContact(ContactsMenuPage.customer.email, 'email')).toBe(true);

    speclib.addStepAutoNumber('Click add contact from page');
    ContactsMenuPage.addContactFromPage();
    speclib.addStepAutoNumber('Add new phone-based contact and verify it is added');
    expect(ContactsMenuPage.addNewContact('', 'QA', 'Tester', ContactsMenuPage.customer.phone, false))
      .toBe(true);
    speclib.addStepAutoNumber('Delete phone-based contact and verify it is deleted');
    expect(ContactsMenuPage.deleteContact(ContactsMenuPage.customer.phone, 'phone')).toBe(true);
  });
});

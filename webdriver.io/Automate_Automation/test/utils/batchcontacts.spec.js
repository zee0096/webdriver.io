const ContactsMenuPage = require('../../pages/backoffice/contacts/contactsmenu.page');
const contact = require('../../pages/salestracking/contact');
const speclib = require('../../lib/speclib');

describe(`${ContactsMenuPage.RETAILER} Batch Contacts`, () => {
  before(() => {
    ContactsMenuPage.openBoAndLoginByRole(ContactsMenuPage.ROLE.rep, false);
  });

  it('C84734 Add basic contact: Asub Scriber', () => {
    ContactsMenuPage.openContactsPage();
    ContactsMenuPage.addContactFromPage();
    const email = 'qatest+sub@salesfloor.net';
    expect(
      ContactsMenuPage.addNewContact(
        email,
        'Asub',
        'Scriber',
        '+15145559876',
        true
      )
    ).toBeTruthy();
  });

  it('C84735 Add basic contact: Non Subscriber', () => {
    ContactsMenuPage.openContactsPage(ContactsMenuPage.ROLE.rep);
    ContactsMenuPage.addContactFromPage();
    const email = 'qatest+nonsub@salesfloor.net';
    expect(
      ContactsMenuPage.addNewContact(
        email,
        'Non',
        'SubScriber',
        '',
        false,
      )
    ).toBeTruthy();
  });

  speclib.itSkipIf(ContactsMenuPage.isProdEnv)('C64905 Add basic contact: FNTaskToUpdate LNTaskToUpdate', () => {
    ContactsMenuPage.openContactsPage();
    ContactsMenuPage.addContactFromPage();
    const email = 'qatest+C64905@salesfloor.net';
    expect(
      ContactsMenuPage.addNewContact(
        email,
        'FNTaskToUpdate',
        'LNTaskToUpdate',
        '+15145564905',
        true
      )
    ).toBeTruthy();
  });

  for (let i = 0; i < 20; i++) {
    it(`C84736 Add contact #${i}`, () => {
      if (i === 0) {
        ContactsMenuPage.openContactsPage();
      }
      ContactsMenuPage.refreshPage();
      ContactsMenuPage.addContactFromPage();
      contact.createContact();
      expect(ContactsMenuPage.addNewContact(contact.email, contact.firstName, contact.lastName)).toBeTruthy();
    });
  }
});

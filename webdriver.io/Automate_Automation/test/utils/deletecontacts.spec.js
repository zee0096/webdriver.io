const moment = require('moment/moment');
const DeleteContactPage = require('../../pages/utils/deletecontact.page');
const speclib = require('../../lib/speclib');

const entriesToDeletePattern = DeleteContactPage.SF_ARGS.entriesToDeletePattern ?? `qatest+cust${moment().year()}`;

describe(`${DeleteContactPage.RETAILER} Delete Contact`, () => {
  it('C84754 Delete All Failed Chat Contacts', () => {
    speclib.addModule(speclib.ALLURE.module.utils);
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addTestId('84754');

    speclib.addStepAutoNumber('Open Backoffice page as admin');
    DeleteContactPage.openBoAndLoginByRole(DeleteContactPage.ROLE.admin);
    speclib.addStepAutoNumber('Open contact php page');
    DeleteContactPage.openContactsPhpPage();
    speclib.addStepAutoNumber('Delete contacts');
    const deletedContacts = DeleteContactPage.deleteFailedContacts(entriesToDeletePattern);
    expect(deletedContacts).toBeGreaterThanOrEqual(0);
    speclib.addStepAutoNumber(`It was deleted ${deletedContacts} contacts that are starting by ${entriesToDeletePattern} email`);
  });
});

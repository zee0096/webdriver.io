/* eslint-disable wdio/await-expect */
const SettingsPage = require('../../../pages/backoffice/accountsettings/settings.page');
const credentials = require('../../../credentials.json');
const speclib = require('../../../lib/speclib');

describe(`${SettingsPage.RETAILER} Settings rep password`, () => {
  it('C180953 Change rep password', () => {
    speclib.addTestId('180953');
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addModule(speclib.ALLURE.module.accountSettings);

    try {
      speclib.addStepAutoNumber('Open BO page and log in as rep');
      SettingsPage.openBoAndLoginByRole(SettingsPage.ROLE.rep, false);
      speclib.addStepAutoNumber('Open Settings option');
      SettingsPage.clickOnSettingsOpt();
      speclib.addStepAutoNumber('Change password');
      SettingsPage.editPassword(credentials.boPassword, credentials.boChangedPassword);
      speclib.addStepAutoNumber('Logout backoffice');
      SettingsPage.backofficeLogin(SettingsPage.ROLE.rep);
      speclib.addStepAutoNumber('Validate error login message');
      expect(SettingsPage.badLoginMessage).toBeDisplayed();
    } finally {
      speclib.addStepAutoNumber('Open BO page and log in as rep');
      SettingsPage.openBoAndLoginByRole(SettingsPage.ROLE.changed, false);
      speclib.addStepAutoNumber('Open Settings option');
      SettingsPage.clickOnSettingsOpt();
      speclib.addStepAutoNumber('Change password to standard pw');
      SettingsPage.editPassword(credentials.boChangedPassword, credentials.boPassword);
      speclib.addStepAutoNumber('Logout backoffice');
      SettingsPage.backofficeLogin(SettingsPage.ROLE.rep);
      speclib.addStepAutoNumber('Validate standard pw works');
      expect(SettingsPage.username).not.toBeDisplayed();
    }
  });
});

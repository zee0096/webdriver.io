/* eslint-disable wdio/await-expect */
const SettingsPage = require('../../../pages/backoffice/accountsettings/settings.page');
const speclib = require('../../../lib/speclib');

const domain = '@salesfloor.net';
const defaultEmail = `qatest+${SettingsPage.RETAILER}_${SettingsPage.ENVIRONMENT}${domain}`;
const changedEmail = `${SettingsPage.fingerprint('changedEmail')}${domain}`;

describe(`${SettingsPage.RETAILER} Settings rep email`, () => {
  it('C180952 Change contact info', () => {
    speclib.addTestId('180952');
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addModule(speclib.ALLURE.module.accountSettings);

    try {
      speclib.addStepAutoNumber('Open BO page and log in as rep');
      SettingsPage.openBoAndLoginByRole(SettingsPage.ROLE.rep, false);

      speclib.addStepAutoNumber('Open Settings option');
      SettingsPage.clickOnSettingsOpt();

      speclib.addStepAutoNumber('Change email');
      SettingsPage.editEmail(changedEmail);

      speclib.addStepAutoNumber('Verify the success message is displayed');
      expect(SettingsPage.successMsg).toBeDisplayed();

      speclib.addStepAutoNumber('Verify the success message content');
      expect(SettingsPage.successMsg.getText()).toContain('Settings updated successfully');

      speclib.addStepAutoNumber('Log out');
      SettingsPage.logout();

      speclib.addStepAutoNumber('Open BO page and log in as rep');
      SettingsPage.openBoAndLoginByRole(SettingsPage.ROLE.rep, false);

      speclib.addStepAutoNumber('Open Settings option');
      SettingsPage.clickOnSettingsOpt();

      speclib.addStepAutoNumber('Verify the email info');
      expect(SettingsPage.emailInfo.getText()).toContain(changedEmail);
    } finally {
      SettingsPage.logoutWithoutUI();
      speclib.addStepAutoNumber('Open BO page and log in as rep');
      SettingsPage.openBoAndLoginByRole(SettingsPage.ROLE.rep);

      speclib.addStepAutoNumber('Open Settings option');
      SettingsPage.clickOnSettingsOpt();

      speclib.addStepAutoNumber('Change email back to default');
      SettingsPage.editEmail(defaultEmail);
    }
  });
});

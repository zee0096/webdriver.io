const UserManagementPage = require('../../../pages/backoffice/accountsettings/usermanagement.page');
const credentials = require('../../../credentials.json');
const speclib = require('../../../lib/speclib');

// -->
// use web onboarding for create the required user via SF_ARGS option
// See the Jenkins job: https://gcpci.salesfloor.net/view/QA%20Tools/job/QA/job/Tools/job/Custom%20onBoarding/
// process.env.SF_ARGS = {"customOBName": "c181533", "customOBEmail": "qaUserFor+c181533@salesfloor.net"}
// <--
const name = 'qac181533';

speclib.descSkipIf(UserManagementPage.isProdEnv)(`${UserManagementPage.RETAILER} Login attempt count should be reset after a successful login`, () => {
  it('C183369 Backoffice Login attempt count should be reset after a successful login', () => {
    speclib.addTestId('183369');
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addModule(speclib.ALLURE.module.accountCreationLogin);

    const attempts = 4;
    for (let i = 0; i < attempts; i++) {
      speclib.addStepAutoNumber(`Open BO page and login with incorrect password for '${i}' time`);
      UserManagementPage.openBoAndLogin({ username : name, password : 'credentials.boPassword' });
      speclib.addStepAutoNumber('Verify the Login failed error message is displayed');
      expect(UserManagementPage.invalidMsgSel.waitForDisplayed()).toBe(true);
      expect(UserManagementPage.invalidMsgSel.getText()).toEqual('Login failed. Incorrect username or password.');
    }

    speclib.addStepAutoNumber('Open BO page and login with correct password');
    UserManagementPage.openBoAndLogin({ username : name, password : credentials.boPassword }, true);

    speclib.addStepAutoNumber('Ensure the user is logged on');
    expect(browser).toHaveUrlContaining('/backoffice');

    speclib.addStepAutoNumber('Log out');
    UserManagementPage.logout();
  });
});

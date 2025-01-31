const UserManagementPage = require('../../../pages/backoffice/accountsettings/usermanagement.page');
const credentials = require('../../../credentials.json');
const speclib = require('../../../lib/speclib');

// -->
// use web onboarding for create the required user via SF_ARGS option
// See the Jenkins job: https://gcpci.salesfloor.net/view/QA%20Tools/job/QA/job/Tools/job/Custom%20onBoarding/
// process.env.SF_ARGS = {"customOBName": "c181533", "customOBEmail": "qaUserFor+c181533@salesfloor.net"}
// <--
const name = 'qac181533';
const email = 'qaUserFor+c181533@salesfloor.net';

speclib.descSkipIf(UserManagementPage.isProdEnv)(`${UserManagementPage.RETAILER} Admins can reset the status of a locked out user`, () => {
  it('C181533 Salesfloor Admins can reset the status of a locked out user', () => {
    speclib.addTestId('181533');
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addModule(speclib.ALLURE.module.accountCreationLogin);

    speclib.addStepAutoNumber(`Open BO page and lock out the user:'${name}'`);
    const attempts = 5;
    for (let i = 0; i < attempts; i++) {
      UserManagementPage.openBoAndLogin({ username : name, password : 'credentials.boPassword' });
    }

    speclib.addStepAutoNumber(`Open BO page and login with the user:'${UserManagementPage.ROLE.admin}'`);
    UserManagementPage.openBoAndLoginByRole(UserManagementPage.ROLE.admin, false);
    UserManagementPage.go('/backoffice/user-management');
    UserManagementPage.waitForLoadingIconDisappear();

    speclib.addStepAutoNumber(`Find the user:'${name}'`);
    UserManagementPage.findByEmail(email);

    speclib.addStepAutoNumber(`Unlock out the user:'${name}'`);
    UserManagementPage.unlockUser(UserManagementPage.usersList[0]);

    speclib.addStepAutoNumber(`Log out the user:'${UserManagementPage.ROLE.admin}'`);
    UserManagementPage.logout();

    speclib.addStepAutoNumber(`Open BO page and login with the unlocked user:'${name}'`);
    UserManagementPage.openBoAndLogin({ username : name, password : credentials.boPassword }, true);

    speclib.addStepAutoNumber('Ensure the user is logged on');
    expect(browser).toHaveUrlContaining('/backoffice');
  });
});

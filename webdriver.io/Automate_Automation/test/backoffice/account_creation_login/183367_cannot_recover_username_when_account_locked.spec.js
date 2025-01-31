const LoginScreenPage = require('../../../pages/backoffice/login_screen/loginscreen.page');
const speclib = require('../../../lib/speclib');

const user = { username : 'qac183367', password : 'wrong' }
const email = 'qaUserFor+c183367@salesfloor.net';

speclib.descSkipIf(LoginScreenPage.isProdEnv)(`${LoginScreenPage.RETAILER}
 Cannot recover username during the account lockout period`, () => {
  it('C183367 As a SF User, I cannot recover username during the account lockout period.', () => {
    speclib.addTestId('183367');
    speclib.addSeverity(speclib.ALLURE.severity.trivial);
    speclib.addModule(speclib.ALLURE.module.accountCreationLogin);

    speclib.addStepAutoNumber('Open BO page and login with incorrect password five times');
    LoginScreenPage.loginWithWrongCredentials(user, 5);
    speclib.addStepAutoNumber('Open BO page and login with incorrect password for one more time');
    LoginScreenPage.openBoAndLogin(user);
    speclib.addStepAutoNumber('"User is locked" error message displayed');
    expect(LoginScreenPage.userLockedError).toBeDisplayed();
    speclib.addStepAutoNumber('Click Trouble logging in link');
    LoginScreenPage.clickTroubleLoggingInLink();
    speclib.addStepAutoNumber('Recover username using user email');
    LoginScreenPage.recoverUsernameWithEmail(email);
    speclib.addStepAutoNumber('"User is locked" error message displayed');
    expect(LoginScreenPage.userLockedError).toBeDisplayed();
  });
});

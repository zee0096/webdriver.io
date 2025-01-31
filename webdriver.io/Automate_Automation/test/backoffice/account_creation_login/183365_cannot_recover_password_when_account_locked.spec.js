const LoginScreenPage = require('../../../pages/backoffice/login_screen/loginscreen.page');
const speclib = require('../../../lib/speclib');

const user = { username : 'qac183365', password : 'wrong' }
const email = 'qaUserFor+c183365@salesfloor.net';

speclib.descSkipIf(LoginScreenPage.isProdEnv)(`${LoginScreenPage.RETAILER}
 Cannot recover password during the account lockout period`, () => {
  it('C183365 As a SF User, I cannot recover password during the account lockout period.', () => {
    speclib.addTestId('183365');
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
    speclib.addStepAutoNumber('Recover password using user email');
    LoginScreenPage.recoverUPasswordWithEmail(email);
    speclib.addStepAutoNumber('"User is locked" error message displayed');
    expect(LoginScreenPage.userLockedError).toBeDisplayed();
  });
});

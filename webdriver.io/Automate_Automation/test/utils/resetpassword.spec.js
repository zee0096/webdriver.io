const DeleteUserPage = require('../../pages/utils/deleteuser.page');
const CREDENTIALS = require('../../credentials.json');
const speclib = require('../../lib/speclib');

// user
// for a const must be ternary - with if declaration get errror
const USERNAME = DeleteUserPage.isProdEnv ? `salesfloor_${CREDENTIALS.boUsername}` : CREDENTIALS.boUsername;

describe(`${DeleteUserPage.RETAILER} Reset password`, () => {
  it(`C84759 Reset ${USERNAME} password`, () => {
    speclib.addModule(speclib.ALLURE.module.utils);
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addTestId('84759');
    speclib.addStepAutoNumber('Open Backoffice page (login)');
    DeleteUserPage.openBoAndLoginByRole(DeleteUserPage.ROLE.admin);

    speclib.addStepAutoNumber('User PHP page');
    DeleteUserPage.openUsersPhpPage();
    if (DeleteUserPage.userTableSearchField.isDisplayed()) {
      DeleteUserPage.userTableSearchField.setValue(USERNAME);
      DeleteUserPage.findRep(USERNAME).waitForDisplayed();
    }

    speclib.addStepAutoNumber('Find rep (search)');
    DeleteUserPage.findRep(USERNAME).click();
    speclib.addStepAutoNumber('Click on reset password');
    DeleteUserPage.clickOnResetPwLnk();
    speclib.addStepAutoNumber('Add new password');
    DeleteUserPage.newPasswordField.setValue(CREDENTIALS.boPassword);
    speclib.addStepAutoNumber('Save');
    DeleteUserPage.clickOnSaveBtn();
    speclib.addStepAutoNumber('Validation confirm message was displayed');
    expect(DeleteUserPage.confirmPwResetMsg).toBeDisplayed();
  });
});

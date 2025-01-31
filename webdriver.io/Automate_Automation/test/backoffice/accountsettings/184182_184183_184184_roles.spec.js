// 184182_184183_184184_roles.spec.js

const UserManagementPage = require('../../../pages/backoffice/accountsettings/usermanagement.page');
const DeleteUserPage = require('../../../pages/utils/deleteuser.page');
const speclib = require('../../../lib/speclib');

/**
 * @type {roles}
 */
const roles = ['admin', 'corp_admin', 'management', 'selling_manager', 'nonsell_manager', 'rep'];
const name = `${UserManagementPage.rawDateString()}`;
const email = `qatest+ob${name}@salesfloor.net`;

roles.forEach((role) => {
  describe(`${UserManagementPage.RETAILER} - Rights for ${role} Role`, () => {

    after(() => {
      speclib.addStepAutoNumber('logout without UI');
      UserManagementPage.logoutWithoutUI();
      // this pause is necessary, if not some roles are failing
      browser.pause(800);
      if (UserManagementPage.createUserRoles.includes(role) && !UserManagementPage.isProdEnv) {
        speclib.addStepAutoNumber('Login as Admin');
        UserManagementPage.backofficeLogin(UserManagementPage.ROLE.admin);
        speclib.addStepAutoNumber('Open users page');
        DeleteUserPage.openUsersPhpPage();
        speclib.addStepAutoNumber('Delete rep and invation by email');
        DeleteUserPage.deleteRepsAndInvitationsByEmail(email);
        speclib.addStepAutoNumber('Logout without UI');
        UserManagementPage.logoutWithoutUI();
      }
    });

    it(`C184182 User Management as ${role}`, () => {
      speclib.addTestId('184182');
      speclib.addSeverity(speclib.ALLURE.severity.blocker);
      speclib.addModule(speclib.ALLURE.module.accountSettings);
      speclib.addStepAutoNumber(`Open BO page and log in as ${role}`);
      UserManagementPage.openBoAndLoginByRole(role, false);
      const userManagement = (
        UserManagementPage.userManagementLnk.isExisting() === UserManagementPage.manageUserRoles.includes(role));
      expect(userManagement).toBeTruthy();
    });

    speclib.itSkipIf(!UserManagementPage.manageUserRoles.includes(role))(`C184183 Filter User as ${role}`, () => {
      speclib.addTestId('184183');
      speclib.addModule(speclib.ALLURE.module.accountSettings);
      speclib.addSeverity(speclib.ALLURE.severity.blocker);

      speclib.addStepAutoNumber('Click on Settings/user managemen option from menu');
      UserManagementPage.clickOnSettingsUserMgmtOpt();

      speclib.addStepAutoNumber('Validating role is displayed into dropdown filter');
      expect(
        UserManagementPage.roleFilterDropDown.isDisplayed() === UserManagementPage.filterUserRoles.includes(role)
      ).toBe(true);
    });

    speclib.itSkipIf(UserManagementPage.isProdEnv)(`C184184 Create User as as ${role}`, () => {
      speclib.addTestId('184184');
      speclib.addModule(speclib.ALLURE.module.accountSettings);
      speclib.addSeverity(speclib.ALLURE.severity.blocker);
      if (UserManagementPage.manageUserRoles.includes(role)) {
        speclib.addStepAutoNumber('Validating Create user button is displayed');
        const status = UserManagementPage.createUserButton.isDisplayed();
        expect(status === UserManagementPage.createUserRoles.includes(role)).toBeTruthy();
        if (status) {
          speclib.addStepAutoNumber('Create a user and validating if it was created');
          UserManagementPage.createUser(email);
          expect(UserManagementPage.verifyUserIsCreated()).toBeTruthy();
        }
      }
    });
  });
});

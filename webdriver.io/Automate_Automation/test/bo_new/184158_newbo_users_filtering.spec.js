const UserManagementPage = require('../../pages/backoffice/accountsettings/usermanagement.page');
const speclib = require('../../lib/speclib');

/**
 * Roles we have: {('admin'|'corp_admin'|'management'|'selling_manager'|'nonsell_manager'|'rep')} roles
 */
const corpAdminRole = 'corp_admin'; // test_admin0

speclib.descSkipIf(UserManagementPage.isProdEnv)(`${UserManagementPage.RETAILER} New Backoffice: Users Filtering for '${corpAdminRole}' Role`, () => {
  before(() => {
    speclib.addStepAutoNumber('Before - Open User Management');
    UserManagementPage.openNewUserManagement(corpAdminRole); // https://saks-stg.salesfloor.net/preview/#/user-management
  });

  it('C184158 As a Corporate Admin, I want to filter my search criteria according to store location,' +
    'group type, user status', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184158');

    UserManagementPage.closeOpenedUsersForm();

    speclib.addStepAutoNumber('Switch to Users');
    UserManagementPage.switchToUsers();

    UserManagementPage.findByName('');

    speclib.addStepAutoNumber('Verify users are filtered by store location');
    expect(
      UserManagementPage.verifyStoreFilter(),
    ).toBeTruthy();

    speclib.addStepAutoNumber('Verify users are filtered by group type');
    expect(
      UserManagementPage.verifyGroupFilter(),
    ).toBeTruthy();

    speclib.addStepAutoNumber('Verify users are filtered by user status');
    expect(
      UserManagementPage.verifyUserStatusFilter(),
    ).toBeTruthy();

    speclib.addStepAutoNumber('After - Log out');
    UserManagementPage.logoutWithoutUI();
  });
});

const UserManagementPage = require('../../pages/backoffice/accountsettings/usermanagement.page');
const UserManageDetPage = require('../../pages/bo_new/userManageDet.page');
const speclib = require('../../lib/speclib');

/**
 * Roles we have: {('admin'|'corp_admin'|'management'|'selling_manager'|'nonsell_manager'|'rep')} roles
 */
const corpAdminRole = 'corp_admin'; // test_admin0

const userToOperate = {
  firstName : 'Tester',
  lastName  : 'QA',
  title     : 'QA User',
};

speclib.descSkipIf(UserManagementPage.isProdEnv)(`${UserManagementPage.RETAILER} New Backoffice: Users Details for '${corpAdminRole}' Role`, () => {
  before(() => {
    speclib.addStepAutoNumber('Before - Open User Management');
    UserManagementPage.openNewUserManagement(corpAdminRole); // https://saks-stg.salesfloor.net/preview/#/user-management
  });

  it('C184162 As a Corporate Admin, I want to open Backoffice '
    + 'User Management view and modify the details of an onboarded User Record.', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184162');

    speclib.addStepAutoNumber('Switch to invited users');
    UserManagementPage.switchToInvitedUsers();

    speclib.addStepAutoNumber('Verify invited users page is opened');
    expect(browser).toHaveUrlContaining('preview/#/user-management/invited-users');

    speclib.addStepAutoNumber('Switch back to users');
    UserManagementPage.switchToUsers();

    speclib.addStepAutoNumber('Verify users page is opened');
    expect(browser).toHaveUrlContaining('preview/#/user-management');

    speclib.addStepAutoNumber(`Trying to find the user:${userToOperate.firstName} ${userToOperate.lastName}`);
    UserManagementPage.findByName(`${userToOperate.firstName} ${userToOperate.lastName}`);

    speclib.addStepAutoNumber('Show user details');
    UserManagementPage.usersList[0].click();
    UserManagementPage.waitForLoadingIconDisappear();

    speclib.addStepAutoNumber('Verify the Created by is displayed');
    expect(UserManageDetPage.createdBy.waitForDisplayed()).toBeTruthy();

    UserManageDetPage.email.waitForDisplayed();
    const initialEmail = UserManageDetPage.email.getText();
    const userToOperateTmp = {};
    userToOperateTmp.email = `qatest_${UserManagementPage.rawDateString()}@salesfloor.net`;

    speclib.addStepAutoNumber('Edit user details. Click Cancel');
    UserManagementPage.editUserByDet(userToOperateTmp, false);

    UserManageDetPage.email.waitForDisplayed();
    speclib.addStepAutoNumber('Verify the user details were not updated');
    expect(UserManageDetPage.email.getText()).toEqual(initialEmail);

    speclib.addStepAutoNumber('Edit user details. Click Save');
    UserManagementPage.editUserByDet(userToOperateTmp);

    UserManageDetPage.email.waitForDisplayed();
    speclib.addStepAutoNumber('Verify the user details were updated');
    expect(UserManageDetPage.email.getText()).toEqual(userToOperateTmp.email);

    speclib.addStepAutoNumber('Close user details');
    UserManagementPage.closeButton.click();
  });

  if (UserManagementPage.hasSms && UserManagementPage.MODE !== 'team') {
    it('C184163 As a Corporate Admin, I want to open Backoffice User Management,'
      + ' so that I can Enable Text Messaging for a User ', () => {
      speclib.addModule(speclib.ALLURE.module.userManagement);
      speclib.addSeverity(speclib.ALLURE.severity.major);
      speclib.addTestId('184163');

      UserManagementPage.closeOpenedUsersForm();

      speclib.addStepAutoNumber('Switch to users');
      UserManagementPage.switchToUsers();

      speclib.addStepAutoNumber(`Trying to find the user:${userToOperate.firstName} ${userToOperate.lastName}`);
      UserManagementPage.findByName(`${userToOperate.firstName} ${userToOperate.lastName}`);

      speclib.addStepAutoNumber('Show user details');
      UserManagementPage.usersList[0].click();

      speclib.addStepAutoNumber('Enable SMS');
      UserManageDetPage.enableSMS();

      browser.pause(500);
      speclib.addStepAutoNumber('Verify SMS Number is enabled');
      expect(UserManageDetPage.isSMSEnabled()).toBeTruthy();
    });

    it('C184164 As a Corporate Admin, I want to disable Text Messaging for a User,'
      + ' so that the text messaging is disabled. ', () => {
      speclib.addModule(speclib.ALLURE.module.userManagement);
      speclib.addSeverity(speclib.ALLURE.severity.major);
      speclib.addTestId('184164');

      UserManagementPage.closeOpenedUsersForm();

      speclib.addStepAutoNumber(`Trying to find the user:${userToOperate.firstName} ${userToOperate.lastName}`);
      UserManagementPage.findByName(`${userToOperate.firstName} ${userToOperate.lastName}`);

      speclib.addStepAutoNumber('Show user details');
      UserManagementPage.usersList[0].click();

      speclib.addStepAutoNumber('Disable SMS');
      UserManageDetPage.enableSMS(true);

      browser.pause(500);
      speclib.addStepAutoNumber('Verify SMS Number is disabled');
      expect(UserManageDetPage.isSMSEnabled()).toBeFalsy();
    });
  }

  if (UserManagementPage.hasSocialShop && UserManagementPage.MODE !== 'team') {
    it('C181555 As a Corporate Admin, I want to open Backoffice User Management, '
      + 'so that I can Enable Social Shop URL for a User', () => {
      speclib.addModule(speclib.ALLURE.module.userManagement);
      speclib.addSeverity(speclib.ALLURE.severity.major);
      speclib.addTestId('181555');

      UserManagementPage.closeOpenedUsersForm();

      speclib.addStepAutoNumber(`Trying to find the user:${userToOperate.firstName} ${userToOperate.lastName}`);
      UserManagementPage.findByName(`${userToOperate.firstName} ${userToOperate.lastName}`);

      speclib.addStepAutoNumber('Show user details');
      UserManagementPage.usersList[0].click();
      UserManagementPage.waitForLoadingIconDisappear();

      speclib.addStepAutoNumber('Enable Social Shop');
      UserManageDetPage.enableSocialShop();

      speclib.addStepAutoNumber('Verify Social Shop URL is enabled');
      expect(UserManageDetPage.socialURL.waitForDisplayed()).toBeTruthy();
    });

    it('C181559 As a Corporate Admin, I want to disable Social Shop URL for an Onboarded User ', () => {
      speclib.addModule(speclib.ALLURE.module.userManagement);
      speclib.addSeverity(speclib.ALLURE.severity.major);
      speclib.addTestId('181559');

      UserManagementPage.closeOpenedUsersForm();

      speclib.addStepAutoNumber(`Trying to find the user:${userToOperate.firstName} ${userToOperate.lastName}`);
      UserManagementPage.findByName(`${userToOperate.firstName} ${userToOperate.lastName}`);

      speclib.addStepAutoNumber('Show user details');
      UserManagementPage.usersList[0].click();
      UserManagementPage.waitForLoadingIconDisappear();

      speclib.addStepAutoNumber('Disable Social Shop');
      UserManageDetPage.enableSocialShop(true);

      speclib.addStepAutoNumber('Verify Social Shop URL is disabled');
      expect(UserManageDetPage.socialURL.isExisting()).toBeFalsy();
    });
  }

  if (UserManagementPage.MODE === 'team') {
    it('C181560 As a Corporate Admin, I want to see for a Team Mode retailer, SocialShop URL should be unavailable', () => {
      speclib.addModule(speclib.ALLURE.module.userManagement);
      speclib.addSeverity(speclib.ALLURE.severity.major);
      speclib.addTestId('181560');

      UserManagementPage.closeOpenedUsersForm();

      speclib.addStepAutoNumber(`Trying to find the user:${userToOperate.firstName} ${userToOperate.lastName}`);
      UserManagementPage.findByName(`${userToOperate.firstName} ${userToOperate.lastName}`);

      speclib.addStepAutoNumber('Show user details');
      UserManagementPage.usersList[0].click();
      UserManagementPage.waitForLoadingIconDisappear();

      speclib.addStepAutoNumber('Disable Social Shop');
      UserManageDetPage.enableSocialShop(true);

      speclib.addStepAutoNumber('Verify Social Shop URL is unavailable');
      expect(UserManageDetPage.assignSocialBtn.isExisting() && UserManageDetPage.socialURL.isExisting()).toBeFalsy();
    });
  }

  it('C181556 As a Corporate Admin, I want to deactivate the status of an on-boarded user', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('181556');

    UserManagementPage.closeOpenedUsersForm();

    speclib.addStepAutoNumber(`Trying to find the user:${userToOperate.firstName} ${userToOperate.lastName}`);
    UserManagementPage.findByName(`${userToOperate.firstName} ${userToOperate.lastName}`);

    speclib.addStepAutoNumber('Deactivate user');
    UserManagementPage.activateUser(UserManagementPage.usersList[0], true);

    speclib.addStepAutoNumber('Verify user is deactivated');
    expect(UserManagementPage.isUserActive(UserManagementPage.usersList[0])).toBeFalsy();
  });

  it('C181557 As a Corporate Admin, I want to re-activate the status of a deactivated user', () => {
    UserManagementPage.closeOpenedUsersForm();

    speclib.addStepAutoNumber('Activate user');
    UserManagementPage.activateUser(UserManagementPage.usersList[0]);

    speclib.addStepAutoNumber('Verify user is Activated');
    expect(UserManagementPage.isUserActive(UserManagementPage.usersList[0])).toBeTruthy();
  });

  it('C184165 As a Corporate Admin, I want to open Backoffice User Management, '
    + 'so that I can sort onboarded user names. ', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184165');

    UserManagementPage.closeOpenedUsersForm();
    UserManagementPage.findByName(''); // clear searching

    let firstUserName = UserManagementPage.getUserName(UserManagementPage.usersList[0]);
    let secondUserName = UserManagementPage.getUserName(UserManagementPage.usersList[1]);

    speclib.addStepAutoNumber('Verify Names are sorted by default in ascending order of alphabets');
    expect(firstUserName.localeCompare(secondUserName) <= 0).toBeTruthy();

    const nameColumnNum = 2;
    speclib.addStepAutoNumber('Sort By Table column');
    UserManagementPage.sortTableByColumn(nameColumnNum);

    firstUserName = UserManagementPage.getUserName(UserManagementPage.usersList[0]);
    secondUserName = UserManagementPage.getUserName(UserManagementPage.usersList[1]);

    speclib.addStepAutoNumber('Verify Names are sorted in descending order of alphabets');
    expect(secondUserName.localeCompare(firstUserName) <= 0).toBeTruthy();
  });

  it('C184166 As a Corporate Admin, I want to open Backoffice User Management, '
    + 'so that I can delete an invited user', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184166');

    UserManagementPage.closeOpenedUsersForm();

    speclib.addStepAutoNumber('Switch to invited users');
    UserManagementPage.switchToInvitedUsers();

    speclib.addStepAutoNumber(`Trying to find the user:${userToOperate.firstName} ${userToOperate.lastName}`);
    UserManagementPage.findByName(`${userToOperate.firstName} ${userToOperate.lastName}`);

    const tokenDeleted = UserManagementPage.getUserTokenId(UserManagementPage.usersList[0]);
    speclib.addStepAutoNumber(`Delete invited user:${tokenDeleted}`);
    UserManagementPage.deleteInvite(UserManagementPage.usersList[0]);

    speclib.addStepAutoNumber(`Trying to find the user:${tokenDeleted}`);
    UserManagementPage.findByToken(tokenDeleted);

    speclib.addStepAutoNumber(`Verify invited user:${tokenDeleted} is deleted`);
    expect(UserManagementPage.noUsersFound.waitForDisplayed()).toBeTruthy();
  });

  it('C181562 As a Corporate Admin, I want to open Backoffice User Management,'
    + ' so that I can resend an invite to the user ', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('181562');

    UserManagementPage.closeOpenedUsersForm();

    speclib.addStepAutoNumber('Switch to invited users');
    UserManagementPage.switchToInvitedUsers();

    speclib.addStepAutoNumber(`Trying to find the user:${userToOperate.firstName} ${userToOperate.lastName}`);
    UserManagementPage.findByName(`${userToOperate.firstName} ${userToOperate.lastName}`);

    const userEmail = UserManagementPage.getUserEmail(UserManagementPage.usersList[0]);

    speclib.addStepAutoNumber(`Verify invite is resent to user '${userEmail}`);
    expect(UserManagementPage.verifyResendInvite(UserManagementPage.usersList[0], userEmail)).toBeTruthy();
  });

  after(() => {
    UserManagementPage.closeOpenedUsersForm();
    UserManagementPage.logoutWithoutUI();
  });
});

const { ON_OFF_SWITCH } = require('../../lib/defaultconstantslib');
const UserManagementPage = require('../../pages/backoffice/accountsettings/usermanagement.page');
const StorefrontPage = require('../../pages/storefront.page');
const speclib = require('../../lib/speclib');

/**
 * Roles we have: {('admin'|'corp_admin'|'management'|'selling_manager'|'nonsell_manager'|'rep')} roles
 */
const corpAdminRole = 'corp_admin'; // test_admin0

const userToCreate = {
  firstName : 'Tester',
  lastName  : 'QA',
  title     : 'QA User',
};

const userToCreateMaxValues = {
  firstName : 'Max451234567890qwertyuiopasdfghjklzxcvbn123456', // 46 characters
  lastName  : 'Max451234567890qwertyuiopasdfghjklzxcvbn123456', // 46 characters
  title     : 'Max451234567890qwertyuiopasdfghjklzxcvbn123456', // 46 characters
  email     : `qatest_${UserManagementPage.rawDateString()}Max100Max451234567890qwertyuiopasdfghjklzxcvbnqwrert123456781001@salesfloor.net1`, // 101 characters
};

const usersToDelete = [];
let emailUser = '';
let emailStoreManager = '';
let emailManager = '';
let emailCorpAdmin = '';
let tokenIdManager = '';
speclib.descSkipIf(UserManagementPage.isProdEnv)(`${StorefrontPage.RETAILER} New Backoffice: Users Creation for '${corpAdminRole}' Role`, () => {
  before(() => {
    speclib.addStepAutoNumber('Before - Open User Management');
    UserManagementPage.openNewUserManagement(corpAdminRole); // https://saks-stg.salesfloor.net/preview/#/user-management
  });

  it('C184167 As a Corporate Admin, I want to fill data in User creation,'
    + 'so that it will obey characters limit of individual fields ', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184167');

    UserManagementPage.closeOpenedUsersForm();

    speclib.addStepAutoNumber('Switch to users');
    UserManagementPage.switchToUsers();

    speclib.addStepAutoNumber('Trying to create user with maximum values in fields');
    const tokenCreated = UserManagementPage.createUserByDet(userToCreateMaxValues);
    usersToDelete.push(tokenCreated);

    speclib.addStepAutoNumber('Switch to invited users');
    UserManagementPage.switchToInvitedUsers();

    UserManagementPage.findByToken(tokenCreated);

    speclib.addStepAutoNumber(`Invited user '${tokenCreated}' is created`);
    expect(
      UserManagementPage.noUsersFound.isDisplayed()
    ).toBeFalsy();
  });

  it('C184168 As a Corporate Admin, I should be able to create a Group Type: User', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184168');

    emailUser = `qatest_${UserManagementPage.rawDateString()}@salesfloor.net`;
    userToCreate.email = emailUser;
    userToCreate.group = UserManagementPage.GROUP.user.name;

    if (StorefrontPage.hasSms && StorefrontPage.MODE !== 'team') {
      userToCreate.txtMsg = ON_OFF_SWITCH.on.name;
    }

    if (UserManagementPage.hasSocialShop) {
      userToCreate.shopFeed = ON_OFF_SWITCH.on.name;
    }

    UserManagementPage.closeOpenedUsersForm();

    UserManagementPage.createUserButton.waitForDisplayed();
    UserManagementPage.createUserButton.click();
    UserManagementPage.lastName.waitForDisplayed();

    speclib.addStepAutoNumber('Generate user Id');
    const tokenCreated = UserManagementPage.generateUserId();
    usersToDelete.push(tokenCreated);

    speclib.addStepAutoNumber('Enter user details');
    UserManagementPage.editUserDetails(userToCreate);

    speclib.addStepAutoNumber(`Verify Selling Mode set to "On" and looks greyed-out`);
    expect(
      UserManagementPage.sellingModeDropDown.isEnabled()
    ).toBeFalsy();

    if (!StorefrontPage.isProdEnv) {
      speclib.addStepAutoNumber('Trying to save');
      UserManagementPage.createButton.click();
      UserManagementPage.waitForLoadingIconDisappear();
      browser.pause(500);
    } else {
      UserManagementPage.cancelButton.click();
    }
    speclib.addStepAutoNumber(`Verify Group Type: User was created`);
    expect(
      UserManagementPage.createButton.waitForDisplayed({timeout : 5000, reverse: true})
    ).toBeTruthy();
  });

  it('C184169 As a Corporate Admin, I should be able to create a Group Type: Store Manager', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184169');

    emailStoreManager = `qatest_${UserManagementPage.rawDateString()}@salesfloor.net`;
    userToCreate.email = emailStoreManager;
    userToCreate.group = UserManagementPage.GROUP.store_manager.name;

    if (StorefrontPage.hasSms && StorefrontPage.MODE !== 'team') {
      userToCreate.txtMsg = ON_OFF_SWITCH.on.name;
    }

    if (UserManagementPage.hasSocialShop) {
      userToCreate.shopFeed = ON_OFF_SWITCH.on.name;
    }

    UserManagementPage.closeOpenedUsersForm();

    UserManagementPage.createUserButton.waitForDisplayed();
    UserManagementPage.createUserButton.click();
    UserManagementPage.lastName.waitForDisplayed();

    speclib.addStepAutoNumber('Generate user Id');
    const tokenCreated = UserManagementPage.generateUserId();
    usersToDelete.push(tokenCreated);

    speclib.addStepAutoNumber('Enter user details');
    UserManagementPage.editUserDetails(userToCreate);

    speclib.addStepAutoNumber(`Verify Selling Mode set to "On" and looks enabled`);
    expect(
      UserManagementPage.sellingModeDropDown.isEnabled(),
    ).toBeTruthy();

    if (!StorefrontPage.isProdEnv) {
      speclib.addStepAutoNumber('Trying to save');
      UserManagementPage.createButton.click();
      UserManagementPage.waitForLoadingIconDisappear();
      browser.pause(500);
    } else {
      UserManagementPage.cancelButton.click();
    }

    speclib.addStepAutoNumber(`Verify Group Type: Store Manager was created`);
    expect(
      UserManagementPage.createButton.waitForDisplayed({timeout : 5000, reverse: true})
    ).toBeTruthy();
  });

  it('C184170 As a Corporate Admin, I should be able to create a Group Type: Management', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184170');

    emailManager = `qatest_${UserManagementPage.rawDateString()}@salesfloor.net`;
    userToCreate.email = emailManager;
    userToCreate.group = UserManagementPage.GROUP.management.name;

    if (StorefrontPage.hasSms && StorefrontPage.MODE !== 'team') {
      userToCreate.txtMsg = ON_OFF_SWITCH.on.name;
      userToCreate.txtMsg = ON_OFF_SWITCH.off.name;
    }

    if (UserManagementPage.hasSocialShop) {
      userToCreate.shopFeed = ON_OFF_SWITCH.on.name;
    }

    UserManagementPage.closeOpenedUsersForm();

    UserManagementPage.createUserButton.waitForDisplayed();
    UserManagementPage.createUserButton.click();
    UserManagementPage.lastName.waitForDisplayed();

    speclib.addStepAutoNumber('Generate user Id');
    tokenIdManager = UserManagementPage.generateUserId();
    usersToDelete.push(tokenIdManager);

    speclib.addStepAutoNumber('Enter user details');
    UserManagementPage.editUserDetails(userToCreate);

    speclib.addStepAutoNumber(`Verify Selling Mode set to "On" and looks enabled`);
    expect(UserManagementPage.sellingModeDropDown.isEnabled()).toBeTruthy();

    if (!StorefrontPage.isProdEnv) {
      speclib.addStepAutoNumber('Trying to save');
      UserManagementPage.createButton.click();
      UserManagementPage.waitForLoadingIconDisappear();
      browser.pause(500);
    } else {
      UserManagementPage.cancelButton.click();
    }
    speclib.addStepAutoNumber(`Verify Group Type: Management was created`);
    expect(
      UserManagementPage.createButton.waitForDisplayed({timeout : 5000, reverse: true})
    ).toBeTruthy();
  });

  it('C184171 As a Corporate Admin, I should be able to create a Group Type: Corporate Admin in Backoffice', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184171');

    emailCorpAdmin = `qatest_${UserManagementPage.rawDateString()}@salesfloor.net`;
    userToCreate.email = emailCorpAdmin;
    userToCreate.group = UserManagementPage.GROUP.corp_admin.name;

    UserManagementPage.closeOpenedUsersForm();

    UserManagementPage.createUserButton.waitForDisplayed();
    UserManagementPage.createUserButton.click();
    UserManagementPage.lastName.waitForDisplayed();

    speclib.addStepAutoNumber('Generate user Id');
    const tokenCreated = UserManagementPage.generateUserId();
    usersToDelete.push(tokenCreated);

    speclib.addStepAutoNumber('Enter user details');
    UserManagementPage.editUserDetails(userToCreate);

    if (StorefrontPage.hasSms && StorefrontPage.MODE !== 'team') {
      speclib.addStepAutoNumber(`Verify Text Messaging looks disabled`);
      expect(
        UserManagementPage.txtMsgDropDown.isEnabled()
      ).toBeFalsy();
    }

    if (UserManagementPage.hasSocialShop) {
      speclib.addStepAutoNumber(`Verify SocialShop looks disabled`);
      expect(
        UserManagementPage.shopFeedDropDown.isEnabled()
      ).toBeFalsy();
    }

    speclib.addStepAutoNumber(`Verify Selling Mode looks disabled`);
    expect(UserManagementPage.sellingModeDropDown.isEnabled()).toBeFalsy()

    speclib.addStepAutoNumber(`Verify Store record defaults to "No Store" and looks disabled`);
    expect(
      UserManagementPage.storeDropDown.isEnabled() === false
      && UserManagementPage.getTextSelectedOption(UserManagementPage.storeDropDown).includes('No Store')
    ).toBeTruthy()

    if (!StorefrontPage.isProdEnv) {
      speclib.addStepAutoNumber('Trying to save');
      UserManagementPage.createButton.click();
      UserManagementPage.waitForLoadingIconDisappear();
      browser.pause(500);
    } else {
      UserManagementPage.cancelButton.click();
    }

    speclib.addStepAutoNumber(`Verify Group Type: Corporate Admin was created`);
    expect(
      UserManagementPage.createButton.waitForDisplayed({timeout : 5000, reverse: true})
    ).toBeTruthy();
  });

  it('C184172 As a Corporate Admin, I want to open Backoffice User Management, '
    + 'so that I should not be allowed to create a User with incomplete details', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184172');

    const titleTmp = userToCreate.title;
    delete userToCreate.title;
    userToCreate.group = UserManagementPage.GROUP.corp_admin.name;

    UserManagementPage.closeOpenedUsersForm();

    UserManagementPage.createUserButton.waitForDisplayed();
    UserManagementPage.createUserButton.click();
    UserManagementPage.lastName.waitForDisplayed();

    speclib.addStepAutoNumber('Generate user Id');
    UserManagementPage.generateUserId();

    speclib.addStepAutoNumber('Enter user details');
    UserManagementPage.editUserDetails(userToCreate);

    userToCreate.title = titleTmp;

    speclib.addStepAutoNumber(`Verify the create user button is disabled`);
    expect(
      UserManagementPage.createButton.isEnabled(),
    ).toBeFalsy();

    speclib.addStepAutoNumber('Trying to save');
    UserManagementPage.createButton.click();

    speclib.addStepAutoNumber(`Verify the user is not created`);
    expect(
      UserManagementPage.createButton.waitForDisplayed()
    ).toBeTruthy();
  });

  it('C181563 As a Corporate Admin,'
    + 'I want to enter a poorly formatted email id, so that I should it will raise an error message', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addTestId('181563');

    userToCreate.email = 'test@gmailcom';
    userToCreate.group = UserManagementPage.GROUP.management.name;

    UserManagementPage.closeOpenedUsersForm();

    speclib.addStepAutoNumber('Create new user');
    UserManagementPage.createUserButton.waitForDisplayed();
    UserManagementPage.createUserButton.click();
    UserManagementPage.lastName.waitForDisplayed();

    speclib.addStepAutoNumber('Generate new user Id');
    UserManagementPage.generateUserId();

    speclib.addStepAutoNumber('Enter user details');
    UserManagementPage.editUserDetails(userToCreate);

    if (!StorefrontPage.isProdEnv) {
      speclib.addStepAutoNumber('Trying to save');
      UserManagementPage.createButton.click();
      UserManagementPage.waitForLoadingIconDisappear();
      browser.pause(500);

      speclib.addStepAutoNumber("Message 'Please enter a valid email address' presents, but was not.");
      expect(
        UserManagementPage.errCreateMsg.waitForDisplayed()
        && UserManagementPage.errCreateMsg.getText().includes('Please enter a valid email address')
      ).toBeTruthy();
    } else {
      UserManagementPage.cancelButton.click();
    }
  });

  if (StorefrontPage.MODE !== 'team') {
    it('C181564 As a Corporate Admin,'
      + 'I want to enter an already existing email id for a new user, so that it shows an error message ', () => {
      speclib.addModule(speclib.ALLURE.module.userManagement);
      speclib.addSeverity(speclib.ALLURE.severity.minor);
      speclib.addTestId('181564');

      delete userToCreate.txtMsg;
      delete userToCreate.shopFeed;
      userToCreate.email = emailManager;
      userToCreate.group = UserManagementPage.GROUP.management.name;

      UserManagementPage.closeOpenedUsersForm();

      speclib.addStepAutoNumber('Create new user');
      UserManagementPage.createUserButton.waitForDisplayed();
      UserManagementPage.createUserButton.click();
      UserManagementPage.lastName.waitForDisplayed();

      speclib.addStepAutoNumber('Generate new user Id');
      UserManagementPage.generateUserId();

      speclib.addStepAutoNumber('Enter user details');
      UserManagementPage.editUserDetails(userToCreate);

      if (!StorefrontPage.isProdEnv) {
        speclib.addStepAutoNumber('Trying to save');
        UserManagementPage.createButton.click();
        UserManagementPage.waitForLoadingIconDisappear();
        browser.pause(500);

        speclib.addStepAutoNumber(`Verify the account with email address ${emailManager} already exists.`);
        expect(
          UserManagementPage.errCreateMsg.waitForDisplayed()
          && UserManagementPage.errCreateMsg.getText().includes(emailManager),
        ).toBeTruthy();
      } else {
        UserManagementPage.cancelButton.click();
      }
    });
  }

  it('C181565 As a Corporate Admin, '
    + 'I want to enter an already assigned employee id so that it shows an error message', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addTestId('181565');

    emailManager = `qatest_${UserManagementPage.rawDateString()}@salesfloor.net`;
    userToCreate.email = emailManager;
    userToCreate.group = UserManagementPage.GROUP.management.name;

    UserManagementPage.closeOpenedUsersForm();

    speclib.addStepAutoNumber('Create new user');
    UserManagementPage.createUserButton.waitForDisplayed();
    UserManagementPage.createUserButton.click();
    UserManagementPage.lastName.waitForDisplayed();

    speclib.addStepAutoNumber('Use already existing user Id');
    UserManagementPage.userToken.click();
    UserManagementPage.userToken.setValue(tokenIdManager);

    speclib.addStepAutoNumber('Enter user details');
    UserManagementPage.editUserDetails(userToCreate);

    if (!StorefrontPage.isProdEnv) {
      speclib.addStepAutoNumber('Trying to save');
      UserManagementPage.createButton.click();
      UserManagementPage.waitForLoadingIconDisappear();
      browser.pause(500);

      speclib.addStepAutoNumber(`Verify the account with with employee id ${tokenIdManager} already exists.`);
      expect(
        UserManagementPage.errCreateMsg.waitForDisplayed()
        && UserManagementPage.errCreateMsg.getText().includes(tokenIdManager),
      ).toBeTruthy();
    } else {
      UserManagementPage.cancelButton.click();
    }
  });

  it('C181566 As a Corporate Admin, I want to open the Storefront of an Onboarded User using the icon', () => {
    speclib.addModule(speclib.ALLURE.module.userManagement);
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addTestId('181566');

    UserManagementPage.closeOpenedUsersForm();

    UserManagementPage.switchToUsers();
    UserManagementPage.clearFilters();

    speclib.addStepAutoNumber(`Trying to find the user:${userToCreate.firstName} ${userToCreate.lastName}`);
    UserManagementPage.findByName(`${userToCreate.firstName} ${userToCreate.lastName}`);

    speclib.addStepAutoNumber(`Open Storefront for user`);
    UserManagementPage.usersList[0].$(UserManagementPage.storefrontLnk).click();
    browser.pause(500);

    const tabList = browser.getWindowHandles();
    const currentTab = tabList[0];
    const newTab = tabList[1];

    browser.switchToWindow(newTab);
    browser.pause(200);

    speclib.addStepAutoNumber(`Verify the Storefront is opened`);
    expect(StorefrontPage.header.waitForDisplayed()).toBeTruthy();
    browser.switchToWindow(currentTab);
    browser.pause(200);
  });

  after(() => {
    UserManagementPage.closeOpenedUsersForm();

    UserManagementPage.switchToInvitedUsers();

    // --> delete created users for avoid big DB
    for (let i = 0; i < usersToDelete.length; i++) {
      UserManagementPage.findByToken(usersToDelete[i]);
      if (UserManagementPage.usersList.length >= 1) {
        UserManagementPage.deleteInvite(UserManagementPage.usersList[0]);
      }
    }

    UserManagementPage.logoutWithoutUI();
  });
});

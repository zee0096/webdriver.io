const UserManagementPage = require('../../../pages/backoffice/accountsettings/usermanagement.page');
const DeleteUserPage = require('../../../pages/utils/deleteuser.page');
const UserOnboardingPage = require('../../../pages/backoffice/useronboarding.page');
const speclib = require('../../../lib/speclib');

const name = UserManagementPage.SF_ARGS.customOBName || `${UserManagementPage.rawDateString()}`;
const email = UserManagementPage.SF_ARGS.customOBEmail || `qatest+ob${name}@salesfloor.net`;

speclib.descSkipIf(UserManagementPage.isProdEnv)(`${UserManagementPage.RETAILER} Web onBoarding`, () => {
  before(() => {
    speclib.addRetailer(speclib.RETAILER);
    speclib.addModule(speclib.ALLURE.module.accountCreationLogin);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber('Before: Login BO page as salesfloor admin');
    UserManagementPage.openBoAndLoginByRole(UserManagementPage.ROLE.admin, false);
    speclib.addStepAutoNumber('Before: Click on settings user management option');
    UserManagementPage.clickOnSettingsUserMgmtOpt();
    speclib.addStepAutoNumber('Before: Create user via UI');
    UserOnboardingPage.tokenID = UserManagementPage.createUser(email);
  });

  describe(`${UserManagementPage.RETAILER} Web onBoarding`, () => {
    it('C184195 Token Validation', () => {
      speclib.addModule(speclib.ALLURE.module.accountCreationLogin);
      speclib.addSeverity(speclib.ALLURE.severity.major);
      speclib.addTestId('184195');
      speclib.addStepAutoNumber('Open token screen');
      UserOnboardingPage.openTokenScreen();
      speclib.addStepAutoNumber('Verify user token is displayed');
      expect(UserOnboardingPage.userToken).toBeDisplayed();

      speclib.addStepAutoNumber('Validate retailer logo image');
      expect(UserOnboardingPage.validationRetailerLogoIsImage()).toBeTruthy();
      speclib.addStepAutoNumber('Validate retailer logo url');
      expect(UserOnboardingPage.validationRetailerLogoUrlValue()).toBeTruthy();

      speclib.addStepAutoNumber('Validate Forgot Token tooltip');
      expect(UserOnboardingPage.checkToolTip).toBeTruthy();

      speclib.addStepAutoNumber('Set token');
      UserOnboardingPage.tokenValidation(UserOnboardingPage.tokenID);
      speclib.addStepAutoNumber('Verify url');
      expect(browser).toHaveUrlContaining('create-password');
    });
  });

  if (UserManagementPage.hasAcceptAgreement) {
    describe(`${UserManagementPage.RETAILER} Web onBoarding`, () => {
      after(() => {
        speclib.addStepAutoNumber('After: Close window and return to the other window');
        UserManagementPage.closeWindowAndReturnToOtherWindow(UserManagementPage.getBoWindowId);
      });
      it('C184196 Terms and Conditions', () => {
        speclib.addModule(speclib.ALLURE.module.accountCreationLogin);
        speclib.addSeverity(speclib.ALLURE.severity.major);
        speclib.addTestId('184196');
        speclib.addStepAutoNumber('Click on terms and conditions link');
        UserOnboardingPage.clickOnTermsConditionsLnk();
        speclib.addStepAutoNumber('Verify url');
        expect(browser).toHaveUrlContaining('/setup/terms');

        speclib.addStepAutoNumber('Validate retailer logo image');
        expect(UserOnboardingPage.validationRetailerLogoIsImage()).toBeTruthy();
        speclib.addStepAutoNumber('Validate retailer logo url');
        expect(UserOnboardingPage.validationRetailerLogoUrlValue()).toBeTruthy();
      });
    });
  }

  describe(`${UserManagementPage.RETAILER} Web onBoarding`, () => {
    it('C184197 Username and Password', () => {
      speclib.addModule(speclib.ALLURE.module.accountCreationLogin);
      speclib.addSeverity(speclib.ALLURE.severity.major);
      speclib.addTestId('184197');
      speclib.addStepAutoNumber('Enter username and password');
      UserOnboardingPage.enterUserNamePassword(`qa${name}`);
      speclib.addStepAutoNumber('Verify url');
      expect(browser).toHaveUrlContaining('account');
    });
  });

  describe(`${UserManagementPage.RETAILER} Web onBoarding`, () => {
    it('C184198 Email and Vanity URL', () => {
      speclib.addModule(speclib.ALLURE.module.accountCreationLogin);
      speclib.addSeverity(speclib.ALLURE.severity.major);
      speclib.addTestId('184198');
      speclib.addStepAutoNumber('Validate retailer logo image');
      expect(UserOnboardingPage.validationRetailerLogoIsImage()).toBeTruthy();
      speclib.addStepAutoNumber('Validate retailer logo url');
      expect(UserOnboardingPage.validationRetailerLogoUrlValue()).toBeTruthy();

      speclib.addStepAutoNumber('Validate email field');
      expect(UserOnboardingPage.emailField).toHaveValue(email);

      speclib.addStepAutoNumber('Validate vanity url link');
      if (UserOnboardingPage.hasVanityUrl) {
        expect(UserOnboardingPage.checkVanityUrlLink).toBeDisplayed();
      } else {
        expect(UserOnboardingPage.checkVanityUrlLink).not.toBeDisplayed();
      }


    if (UserManagementPage.isTeamMode) {
      const storeValue = UserOnboardingPage.getCurrentStoreName();
      speclib.addStepAutoNumber('Change store');
      UserOnboardingPage.changeStore();
      speclib.addStepAutoNumber('Verify store name was changed');
      expect(UserOnboardingPage.getCurrentStoreName()).not.toEqual(storeValue);
    }

      speclib.addStepAutoNumber('Enter email');
      UserOnboardingPage.enterEmailUrl();
      speclib.addStepAutoNumber('Validate url');
      expect(browser).toHaveUrlContaining('start');
    });
  });

  describe(`${UserManagementPage.RETAILER} Web onBoarding`, () => {
    it('C184199 Start Building Profile', () => {
      speclib.addModule(speclib.ALLURE.module.accountCreationLogin);
      speclib.addSeverity(speclib.ALLURE.severity.major);
      speclib.addTestId('184199');
      speclib.addStepAutoNumber('Validate retailer logo');
      expect(UserOnboardingPage.validationRetailerLogoIsImage()).toBeTruthy();
      speclib.addStepAutoNumber('Validate retailer logo url');
      expect(UserOnboardingPage.validationRetailerLogoUrlValue()).toBeTruthy();

      speclib.addStepAutoNumber('Validate first name');
      expect(UserOnboardingPage.firstNameField).toHaveValue('Tester');

      speclib.addStepAutoNumber('Validate last name');
      expect(UserOnboardingPage.lastNameField).toHaveValue('QA');

      if (UserManagementPage.MODE === 'rep') {
          const storeValue = UserOnboardingPage.getCurrentStoreName();
          speclib.addStepAutoNumber('Change store');
          UserOnboardingPage.changeStore();
          speclib.addStepAutoNumber('Verify store is changed');
          expect(UserOnboardingPage.getCurrentStoreName()).not.toEqual(storeValue);
      }

      speclib.addStepAutoNumber('Start profile');
      UserOnboardingPage.startProfile();
      speclib.addStepAutoNumber('Verify phone field is displayed');
      expect(UserOnboardingPage.phoneField).not.toBeDisplayed();
    });
  });

  describe(`${UserManagementPage.RETAILER} Web onBoarding`, () => {
    it('C184200 Add Picture', () => {
      speclib.addModule(speclib.ALLURE.module.accountCreationLogin);
      speclib.addSeverity(speclib.ALLURE.severity.major);
      speclib.addTestId('184200');
      speclib.addStepAutoNumber('Validate retailer logo');
      expect(UserOnboardingPage.validationRetailerLogoIsImage()).toBeTruthy();
      speclib.addStepAutoNumber('Validate retailer logo url');
      expect(UserOnboardingPage.validationRetailerLogoUrlValue()).toBeTruthy();

      speclib.addStepAutoNumber('Validate avatar image');
      expect(UserOnboardingPage.isRealImage(UserOnboardingPage.avatarImageCss)).toBeTruthy();

      speclib.addStepAutoNumber('Verify file selector for change the picture is displayed');
      expect(UserOnboardingPage.fileSelector).toBeDisplayed();
      speclib.addStepAutoNumber('Click next button from picture page');
      UserOnboardingPage.clickNextButtonFromPicturePage();
    });
  });

  if (UserOnboardingPage.hasSpecialties) {
    describe(`${UserManagementPage.RETAILER} Web onBoarding`, () => {
      it('C184201 Specialties', () => {
        speclib.addModule(speclib.ALLURE.module.accountCreationLogin);
        speclib.addSeverity(speclib.ALLURE.severity.major);
        speclib.addTestId('184201');
        speclib.addStepAutoNumber('Validate retailer logo');
        expect(UserOnboardingPage.validationRetailerLogoIsImage()).toBeTruthy();
        speclib.addStepAutoNumber('Validate retailer logo url');
        expect(UserOnboardingPage.validationRetailerLogoUrlValue()).toBeTruthy();

        speclib.addStepAutoNumber('Validate selecting specialties');
        expect(UserOnboardingPage.specialties()).toBeTruthy();
      });
    });
  }

  if (UserOnboardingPage.hasImportContacts) {
    describe(`${UserManagementPage.RETAILER} Web onBoarding`, () => {
      it('C184202 Import Contacts', () => {
        speclib.addModule(speclib.ALLURE.module.accountCreationLogin);
        speclib.addSeverity(speclib.ALLURE.severity.major);
        speclib.addTestId('184202');
        speclib.addStepAutoNumber('Validate retailer logo');
        expect(UserOnboardingPage.validationRetailerLogoIsImage()).toBeTruthy();
        speclib.addStepAutoNumber('Validate retailer logo url');
        expect(UserOnboardingPage.validationRetailerLogoUrlValue()).toBeTruthy();

        speclib.addStepAutoNumber('Verify import contacts');
        UserOnboardingPage.importContacts();
        speclib.addStepAutoNumber('Verify url');

        if (UserOnboardingPage.hasSocialNetworks) {
          expect(browser).toHaveUrlContaining('connect-social');
        } else {
          expect(browser).toHaveUrlContaining('congrats');
        }
      });
    });
  }

  if (UserOnboardingPage.hasSocialNetworks) {
    describe(`${UserManagementPage.RETAILER} Web onBoarding`, () => {
      it('C184203 Check Retailer Logo', () => {
        speclib.addModule(speclib.ALLURE.module.accountCreationLogin);
        speclib.addSeverity(speclib.ALLURE.severity.major);
        speclib.addTestId('184203');
        speclib.addStepAutoNumber('Validate retailer logo');
        expect(UserOnboardingPage.validationRetailerLogoIsImage()).toBeTruthy();
        speclib.addStepAutoNumber('Validate retailer logo url');
        expect(UserOnboardingPage.validationRetailerLogoUrlValue()).toBeTruthy();

        speclib.addStepAutoNumber('Verify social networks presence');
        expect(UserOnboardingPage.verifySocialNetworks()).toBeTruthy();

        speclib.addStepAutoNumber('Verify social networks connection');
        expect(UserOnboardingPage.socialNetworksConnections('off')).toBeTruthy();

        speclib.addStepAutoNumber('Verify page url');
        expect(browser).toHaveUrlContaining('connect-social');
        speclib.addStepAutoNumber('Click skip social networks button');
        UserOnboardingPage.socialNetworkSkipBtn.click();
        speclib.addStepAutoNumber('Wait for loading to disappear');
        UserOnboardingPage.waitForLoadingIconDisappear();
      });
    });
  }

  describe(`${UserManagementPage.RETAILER} Web onBoarding`, () => {
    it('C184204 Congratulations page', () => {
      speclib.addModule(speclib.ALLURE.module.accountCreationLogin);
      speclib.addSeverity(speclib.ALLURE.severity.major);
      speclib.addTestId('184204');
      speclib.addStepAutoNumber('Verify title');
      expect(browser).toHaveTitleContaining('Congratulations');

      speclib.addStepAutoNumber('Verify app stores links');
      expect(UserOnboardingPage.verifyAppLinks()).toBeTruthy();

      speclib.addStepAutoNumber('Go to backoffice');
      UserOnboardingPage.goToBackOffice();
      speclib.addStepAutoNumber('Verify url');
      expect(browser).toHaveUrlContaining('backoffice');
    });
  });

  if (!UserManagementPage.SF_ARGS.customOBName && !UserManagementPage.SF_ARGS.customOBEmail) {
    after(() => {
      speclib.addRetailer(speclib.RETAILER);
      speclib.addModule(speclib.ALLURE.module.accountCreationLogin);
      speclib.addSeverity(speclib.ALLURE.severity.major);

      speclib.addStepAutoNumber('After: Log out');
      DeleteUserPage.logoutWithoutUI();
      speclib.addStepAutoNumber('After: Open bo as admin');
      DeleteUserPage.openBoAndLoginByRole(DeleteUserPage.ROLE.admin, false);
      speclib.addStepAutoNumber('After: Open users.php page');
      DeleteUserPage.openUsersPhpPage();
      speclib.addStepAutoNumber('After: Delete rep');
      DeleteUserPage.deleteRepsAndInvitationsByEmail(email);
    });
  }
});

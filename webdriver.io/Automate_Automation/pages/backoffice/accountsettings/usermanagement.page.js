const config = require('config');

const BackOfficePage = require('../../backoffice.page');
/**
 * UserManagementPage Class page
 * @class UserManagementPage
 * @classdesc Library
 * @extends BackOfficePage
 */
class UserManagementPage extends BackOfficePage {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  constructor() {
    super();
    /** Active Status
      * @typedef STATUS
      * @type {object}
      * @property {object} ANY_STATUS
      * @property {string} name='Any Status'
      * @property {string} value=1
      * @property {object} ACTIVE
      * @property {string} name='Active'
      * @property {string} value=2
      * @property {object} INACTIVE
      * @property {string} name='Inactive'
      * @property {string} value=3
      */
    this.STATUS = Object.freeze({
      ANY_STATUS : { name : 'Any Status', value : 1 },
      ACTIVE     : { name : 'Active', value : 2 },
      INACTIVE   : { name : 'Inactive', value : 3 },
    });

    /** GROUP
     * @typedef GROUP
     * @type {object}
     * @property {object} all
     * @property {string} name='All Groups'
     * @property {string} value=0
     * @property {object} user
     * @property {string} name='User'
     * @property {string} value=1
     * @property {object} store_manager
     * @property {string} name='Store Manager'
     * @property {string} value=2
     * @property {object} management
     * @property {string} name='Management'
     * @property {string} value=3
     * @property {object} corp_admin
     * @property {string} name='Corporate Admin'
     * @property {string} value=4
     * @property {object} sales_admin
     * @property {string} name='Salesfloor Admin'
     * @property {string} value=5
     */
    this.GROUP = Object.freeze({
      all           : { name : 'All Groups', value : 0 },
      user          : { name : 'User', value : 1 },
      store_manager : { name : 'Store Manager', value : 2 },
      management    : { name : 'Management', value : 3 },
      corp_admin    : { name : 'Corporate Admin', value : 4 },
      sales_admin   : { name : 'Salesfloor Admin', value : 5 },
    });

    /**
     * Search type
     * @typedef SEARCH
     * @type {object}
     * @property {object} by_name
     * @property {string} name='By Name'
     * @property {string} value='name'
     * @property {string} index=0
     * @property {object} by_email
     * @property {string} name='By Email'
     * @property {string} value='user_email'
     * @property {string} index=1
     * @property {object} by_token
     * @property {string} name='By Employee ID/Token'
     * @property {string} value='employee_id'
     * @property {string} index=2
     */
    this.SEARCH = {
      by_name  : { name : 'By Name', value : 'name', index : 0 },
      by_email : { name : 'By Email', value : 'user_email', index : 1 },
      by_token : { name : 'By Employee ID/Token', value : 'employee_id', index : 2 },
    };
  }

  /**  @type {boolean} */
  get hasAcceptAgreement() { return config.get('bo.onboarding.acceptAgreement'); }

  /**  @type {boolean} */
  get hasSocialShop() { return config.get('socialShop'); }

  /**  @type {roles} */
  get manageUserRoles() { return config.get('bo.roles.manageUserRoles'); }

  /**  @type {roles} */
  get filterUserRoles() { return config.get('bo.roles.filterUserRoles'); }

  /**  @type {roles} */
  get createUserRoles() { return config.get('bo.roles.createUserRoles'); }

  /** @type {cssSelectorObj} */
  get createUserButton() { return $('button.fn-account-create-user, #bo-create-button'); }

  /** Users or Invited Users
   * @type {cssSelectorArr}
   */
  get usersList() { return $$('div[ng-repeat*="user in"], tr.account-table__row--is-editable'); }

  // ----> User Form
  /** @type {cssSelectorObj} */
  get firstName() { return $('.account-edit__form #firstName, div.form-card__element > input#user-management-first-name'); }

  /** @type {cssSelectorObj} */
  get lastName() { return $('.account-edit__form #lastName, div.form-card__element > input#user-management-last-name'); }

  /** @type {cssSelectorObj} */
  get generateBtn() { return $('div.form-card__element > #bo-create-button'); }

  /** @type {cssSelectorObj} */
  get setTitle() { return $('.account-edit__form #title, div.form-card__element > input[ng-model="userFormInfos.rep_title"]'); }

  /** @type {cssSelectorObj} */
  get email() { return $('.account-edit__form #email, div.form-card__element > input[ng-change="onEmailChange()"]'); }

  /** @type {cssSelectorObj} */
  get userToken() { return $('form.account-edit__form input#token, div.form-card__element > input[ng-change="onEmployeeIdChange()"]'); }

  /** @type {cssSelectorObj} */
  get storeDropDown() { return $('.account-edit__form #store, div.form-card__element > #user-management-store'); }

  /** @type {cssSelectorObj} */
  get groupDropDown() { return $('.account-edit__form #group, div.form-card__element > #user-management-group'); }

  /** @type {cssSelectorObj} */
  get sellingModeDropDown() { return $('.account-edit__form #selling-mode, div.form-card__element > #user-management-selling-mode'); }

  /** SocialShop Enabled @type {cssSelectorObj}  */
  get shopFeedDropDown() { return $('.account-edit__form #shop-instagram-enabled, div.form-card__element > #user-management-socialShop'); }

  /** @type {cssSelectorObj} */
  get txtMsgDropDown() { return $('.account-edit__form #text-messaging-enabled, div.form-card__element > #user-management-text-message'); }

  // --> User creation
  /** @type {cssSelectorObj} */
  get createButton() { return $('.account-edit__form .fn-trigger-save, .view-container__footer  #bo-create-button'); }

  /** @type {cssSelectorObj} */
  get cancelButton() { return $('.account-edit__form .fn-trigger-close, .view-container__footer  #bo-cancel-button'); }

  /** @type {cssSelectorObj} */
  get userCreatedMessage() { return $('.message-box-success'); }
  // <--

  // --> User editing
  /** @type {cssSelectorObj} */
  get editButton() { return $('button.bo-button--is-edit'); }

  /** @type {cssSelectorObj} */
  get closeButton() { return $('button[ng-click="closePanel()"]'); }
  // <--

  /** @type {cssSelectorObj} */
  get errCreateMsg() { return $('.error-message'); }

  // <---- User Form End
  /** @type {cssSelectorObj} */
  get onConfirmBtn() { return $('[ng-click*="onConfirmClick("], button.bo-btn-type-1'); }

  /** @type {cssSelectorObj} */
  get usersMenubarItem() { return $('a=Users'); }

  /** @type {cssSelectorObj} */
  get invitedUsersMenubarItem() { return $('a=Invited Users'); }

  /** @type {cssSelectorObj} */
  get noUsersFound() { return $('div*=No Users Found'); }

  /** @type {cssSelectorObj} */
  get roleFilterDropDown() { return $('#group'); }

  // --> Find By Name, By Email, By By Employee ID/Token
  /**  @type {cssSelectorObj} */
  get searchBtn() { return $('div[ng-click="search()"], i.account__filters__search-input__icon'); }

  /**  @type {cssSelectorObj} */
  get searchInput() { return $('input[type="search"], #accountSearchInput'); }

  /**  @type {cssSelectorObj} */
  get searchDropDown() { return $('#user-management-filterSearch, #account-search-type'); }

  // --> Filtering
  /** @type {cssSelectorObj} */
  get filterBtn() { return $('button[ng-click="showFilterLibrary()"]'); }

  /** @type {cssSelectorObj} */
  get storeLocationFilterDropDown() { return $('#user-management-store'); }

  /** @type {cssSelectorObj} */
  get groupFilterDropDown() { return $('#user-management-group'); }

  /** @type {cssSelectorObj} */
  get applyFilterBtn() { return $('button[ng-click="applyFilter()"]'); }

  /**  @type {cssSelectorObj} */
  get toolsMenuOpt() { return $('.menubar__item__icon--is-tools'); }

  /**  @type {cssSelectorTxt} */
  get storefrontLnk() { return '[ng-click="openStorefront($event, user)"]'; }

  /**  @type {cssSelectorTxt} */
  get lockedOutToggle() { return 'td[title*="unlock"] div.bootstrap-switch'; }

  /**
   * openNewUserManagement
   * used only in newBO
   * @deprecated
   * @param role
   * //TODO move to newbo folder or refactore the code then we don't need this code
   */
  openNewUserManagement(role) {
    super.openBoAndLoginByRole(role, false);
    this.corporateTasksMenuOpt.waitForDisplayed();
    this.corporateTasksMenuOpt.click();
    this.waitForLoadingIconDisappear();
    this.switchToUsers();
  }

  /**
   * Open tools -> click Users link
   */
  switchToUsers() {
    this.waitForLoadingIconDisappear();
    if (!this.usersMenubarItem.isDisplayed()) {
      this.toolsMenuOpt.waitForDisplayed();
      this.toolsMenuOpt.click();
      this.waitForLoadingIconDisappear();
    }
    this.usersMenubarItem.waitForDisplayed();
    this.usersMenubarItem.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * * Open tools -> click Invited Users link
   */
  switchToInvitedUsers() {
    this.waitForLoadingIconDisappear();
    if (!this.invitedUsersMenubarItem.isDisplayed()) {
      this.toolsMenuOpt.waitForDisplayed();
      this.toolsMenuOpt.click();
      this.waitForLoadingIconDisappear();
    }
    this.invitedUsersMenubarItem.waitForDisplayed();
    this.invitedUsersMenubarItem.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * createUser() creates a new user in the backoffice with the details provided
   *
   * @param {String} [email = 'qatest@salesfloor.net'] email of for new user
   * @param {String} [firstName = 'Tester'] first namof user
   * @param {String} [lastName = 'QA'] last name of user
   * @param {String} [title = 'QA User'] title
   * @returns {String} token given for the new user
   */
  createUser(email = 'qatest@salesfloor.net', firstName = 'Tester', lastName = 'QA', title = 'QA User') {
    this.createUserButton.waitForDisplayed();
    this.createUserButton.click();
    this.firstName.waitForDisplayed();
    this.firstName.setValue(firstName);
    this.lastName.setValue(lastName);
    this.setTitle.setValue(title);
    this.email.setValue(email);
    const token = this.userToken.getValue();
    this.createButton.waitForEnabled();
    this.createButton.click();
    this.waitForLoadingIconDisappear();
    browser.pause(250);
    return (token);
  }

  /**
   *  Verifies that success message appears when user is created
   * @returns {boolean} true if message appears
   */
  verifyUserIsCreated() {
    return this.userCreatedMessage.waitForDisplayed();
  }

  /**
   * generation user's id in new BO
   * @returns {string} token
   */
  generateUserId() {
    this.generateBtn.waitForDisplayed();
    this.generateBtn.click();
    this.generateBtn.waitForEnabled({timeout : 5000, reverse: true});

    const token = this.userToken.getValue();
    return token;
  }

  /**
   * editUserDetails() edit user in the NEW backoffice based on the details provided,
   * otherwise it won't touch the form property
   *
   * @param {Object} userDetails - provide the object with details
   */
  editUserDetails(userDetails) {
    // eslint-disable-next-line
    if (userDetails.hasOwnProperty('firstName')) {
      this.firstName.click();
      this.firstName.setValue(userDetails.firstName);
    }
    // eslint-disable-next-line
    if (userDetails.hasOwnProperty('lastName')) {
      this.lastName.click();
      this.lastName.setValue(userDetails.lastName);
    }
    // eslint-disable-next-line
    if (userDetails.hasOwnProperty('title')) {
      this.setTitle.click();
      this.setTitle.setValue(userDetails.title);
    }
    // eslint-disable-next-line
    if (userDetails.hasOwnProperty('email')) {
      this.email.click();
      this.email.setValue(userDetails.email);
    }
    // eslint-disable-next-line
    if (userDetails.hasOwnProperty('store')) {
      this.storeDropDown.click();
      this.waitForLoadingIconDisappear();
      this.storeDropDown.selectByVisibleText(userDetails.store);
    }
    // eslint-disable-next-line
    if (userDetails.hasOwnProperty('group')) {
      this.groupDropDown.click();
      this.waitForLoadingIconDisappear();
      this.groupDropDown.selectByVisibleText(userDetails.group);
    }
    // eslint-disable-next-line
    if (userDetails.hasOwnProperty('sellingMode')) {
      this.sellingModeDropDown.click();
      this.waitForLoadingIconDisappear();
      this.sellingModeDropDown.selectByVisibleText(userDetails.sellingMode);
    }
    // eslint-disable-next-line
    if (userDetails.hasOwnProperty('shopFeed')) {
      this.shopFeedDropDown.click();
      this.waitForLoadingIconDisappear();
      this.shopFeedDropDown.selectByVisibleText(userDetails.shopFeed);
    }
    // eslint-disable-next-line
    if (userDetails.hasOwnProperty('txtMsg')) {
      this.txtMsgDropDown.click();
      this.waitForLoadingIconDisappear();
      this.txtMsgDropDown.selectByVisibleText(userDetails.txtMsg);
    }

    browser.pause(100);
  }

  /**
   * method for user created from Object with properties provided see
   * @param userDetails
   * @param {boolean} [save=true] click save or cancel button
   * @returns token
   */
  createUserByDet(userDetails, save = true) {
    this.waitForLoadingIconDisappear();
    this.createUserButton.click();

    this.generateUserId();
    this.editUserDetails(userDetails);
    const token = this.userToken.getValue();

    browser.pause(250);
    if (save === true) {
      this.createButton.click();
    } else {
      this.cancelButton.click();
    }

    this.waitForLoadingIconDisappear();
    browser.pause(250);
    return (token);
  }

  /**
   * method for user created from Object with properties provided see
   * @param userDetails
   * @param {boolean} [save=true] click save or cancel button
   * @returns token
   */
  editUserByDet(userDetails, save = true) {
    this.waitForLoadingIconDisappear();
    this.editButton.waitForDisplayed();
    this.editButton.click();
    this.firstName.waitForDisplayed();

    this.editUserDetails(userDetails);
    const token = this.userToken.getValue();

    if (save === true) {
      this.createButton.click();
    } else {
      this.cancelButton.click();
    }

    this.waitForLoadingIconDisappear();
    browser.pause(250);
    return (token);
  }

  /**
   *
   * @param dropDown
   * @return {(String|String[]|string|*)}
   */
  getTextSelectedOption(dropDown) {
    return dropDown.$('option[selected="selected"]').getText();
  }

  /**
   * findByString
   * @param {string} str
   */
  findByString(str) {
    this.searchInput.setValue(`${str}\n`);
    this.searchBtn.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * findByName
   * @param {string} name
   */
  findByName(name) {
    this.waitForLoadingIconDisappear();
    this.searchDropDown.waitForDisplayed();
    this.searchDropDown.click();
    this.waitForLoadingIconDisappear();
    this.searchDropDown.selectByIndex(this.SEARCH.by_name.index);
    this.findByString(name);
  }

  /**
   * findByName
   * @param {string} name
   */
  findByEmail(email) {
    this.waitForLoadingIconDisappear();
    this.searchDropDown.waitForDisplayed();
    this.searchDropDown.click();
    this.waitForLoadingIconDisappear();
    this.searchDropDown.selectByIndex(this.SEARCH.by_email.index);
    this.findByString(email);
  }

  /**
   * findByToken
   * @param id
   */
  findByToken(id) {
    this.searchDropDown.waitForDisplayed();
    this.searchDropDown.click();
    this.waitForLoadingIconDisappear();
    this.searchDropDown.selectByIndex(this.SEARCH.by_token.index);
    this.findByString(id);
  }

  /**
   * get the username
   * @param {string} user - the row in table
   * @returns {string} username
   */
  getUserName(user) {
    this.waitForLoadingIconDisappear();
    const name = user.$('div:nth-of-type(2)');
    return name.getText();
  }

  /**
   * return the token id value for Invited Users table
   * @param {string} user - the row in table
   * @returns {string} tokenID
   */
  getUserTokenId(user) {
    this.waitForLoadingIconDisappear();
    const token = user.$('div:nth-of-type(2)');
    return token.getText();
  }

  /**
   * return the email value
   * @param {string} user - the row in table
   * @returns {string} email
   */
  getUserEmail(user) {
    this.waitForLoadingIconDisappear();
    const email = user.$('div:nth-of-type(3)');
    return email.getText();
  }

  /**
   * for close form
   */
  closeOpenedUsersForm() {
    if (this.cancelButton.isDisplayed()) {
      this.cancelButton.click();
      browser.pause(250);
    }

    if (this.closeButton.isDisplayed()) {
      this.closeButton.click();
      browser.pause(250);
    }
  }

  /**
   * provide the user's row, method will return the toggle for it
   * @param {Element} user - the row in table
   * @returns toogle
   */
  getLockedOutToggle(user) {
    const toggle = user.$(this.lockedOutToggle);
    return toggle;
  }

  /**
   * provide the user's row, method will return the toggle for it
   * @param {Element} user - the row in table
   * @returns toogle
   */
  getStatusToggle(user) {
    const toggle = user.$('[on-switch-click="updateUserStatus(user)"]');
    return toggle;
  }

  /**
   * @param {string} user - provide the row to return the user's status
   * @returns {boolean} ischecked
   */
  isUserLocked(user) {
    return this.isChecked(this.getLockedOutToggle(user));
  }

  /**
   * @param {string} user - provide the row to return the user's status
   * @returns {boolean} ischecked
   */
  isUserActive(user) {
    const button = this.getStatusToggle(user).$('button');
    return this.isChecked(button);
  }

  /**
   * By default the method activates the user
   * @param {string} user - the row in table
   * @param {boolean} [reverse=false]
   */
  activateUser(user, reverse = false) {
    if (!reverse && !this.isUserActive(user)) { // activate the user
      this.getStatusToggle(user).$('.bo-switch-toggle__wrapper').click();
    } else if (reverse && this.isUserActive(user)) { // deactivate
      this.getStatusToggle(user).click();
      browser.pause(250);
      this.onConfirmBtn.click();
    }

    this.waitForLoadingIconDisappear();
  }

  /**
   * By default the method activates the user
   * @param {string} user - the row in table
   */
  unlockUser(user) {
    this.getLockedOutToggle(user).click();
    this.onConfirmBtn.waitForDisplayed();
    this.onConfirmBtn.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * By default delete user
   * @param {string} user - the row in table
   */
  deleteInvite(user) {
    this.waitForLoadingIconDisappear();
    const deleteBtn = user.$('.listing-table__icon--is-delete');
    deleteBtn.click();
    browser.pause(250);
    this.onConfirmBtn.waitForDisplayed();
    this.onConfirmBtn.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * a little bit tricky in case of automation, but it works
   * @param {number} columnNum
   */
  sortTableByColumn(columnNum) {
    const columnHeader = $(`.listing-table__header div:nth-of-type(${columnNum})`);
    columnHeader.moveTo();
    columnHeader.click();
    this.waitForLoadingIconDisappear();
    columnHeader.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * verify Resend Invite
   * @param {string} user - the row in table
   * @param {string} emailToCheck - email to verify
   * @returns status
   */
  verifyResendInvite(user, emailToCheck) {
    this.waitForLoadingIconDisappear();
    const resendBtn = user.$('.listing-table__icon--is-resend');
    resendBtn.moveTo();
    resendBtn.click();
    this.waitForLoadingIconDisappear();
    browser.pause(250);
    let status = true;
    status = this.getFeedBackText().includes(emailToCheck);
    this.closeFeedBack();
    this.waitForLoadingIconDisappear();
    return status;
  }

  /**
   * utility method for open filter
   */
  expandFilter() {
    this.filterBtn.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * utility method for applying the filtering
   */
  clickApplyFilter() {
    this.applyFilterBtn.click();
    this.waitForLoadingIconDisappear();
  }

  /**
   * filterByStore
   * @param {String} name
   */
  filterByStore(name) {
    browser.pause(250);
    this.storeLocationFilterDropDown.click();
    browser.pause(250);
    this.storeLocationFilterDropDown.selectByVisibleText(name);
  }

  /** filterByGroup
   * @param {GROUP} group
   */
  filterByGroup(group) {
    browser.pause(250);
    this.groupFilterDropDown.click();
    browser.pause(250);
    this.groupFilterDropDown.selectByVisibleText(group.name);
  }

  /**
   * utility for get radio element to click
   * @param value
   * @return {cssSelectorObj}
   */
  getStatusInFilter(value) {
    return $(`[ng-if="!isInvitedUser"] div:nth-of-type(${value}) > span`);
  }

  /**
   * @param {STATUS} statusObj
   */
  filterByStatus(statusObj) {
    this.getStatusInFilter(statusObj.value).click();
  }

  /**
   * set all filter values to default
   */
  clearFilters() {
    this.expandFilter();
    this.filterByStore('All Stores');
    this.filterByGroup(this.GROUP.all);
    this.filterByStatus(this.STATUS.ANY_STATUS);
    this.clickApplyFilter();
  }

  /**
   * verifying filtering for first store after All Stores and No Store Assigned
   * @param {Number} [value=3] - option in dropdown to choose
   * @returns {boolean} storeOk
   */
  verifyStoreFilter(value = 3) {
    this.expandFilter();
    this.storeLocationFilterDropDown.click();
    this.waitForLoadingIconDisappear();
    const optionText = this.storeLocationFilterDropDown.$(`option:nth-of-type(${value})`).getText();
    this.storeLocationFilterDropDown.selectByVisibleText(optionText);
    this.clickApplyFilter();
    const storeOK = this.usersList.length > 0
      ? this.usersList.every((v) => v.getText().includes(optionText)) : true;
    return storeOK;
  }

  /**
   * verifyUserStatusFilter
   * @returns {boolean}
   */
  verifyUserStatusFilter() {
    const applyFilter = (obj) => {
      this.expandFilter();
      this.filterByStatus(obj);
      this.clickApplyFilter();
    };
    applyFilter(this.STATUS.ACTIVE);
    const activeOK = this.usersList.length > 0
      ? this.usersList.every((v) => this.isUserActive(v)) : true;

    applyFilter(this.STATUS.INACTIVE);
    const inActiveOK = this.usersList.length > 0
      ? this.usersList.every((v) => !this.isUserActive(v)) : true;

    return (activeOK && inActiveOK);
  }

  /**
   * verifying filtering for Group: User, Store Manager, Management, Corporate Admin
   * @returns {boolean}
   */
  verifyGroupFilter() {
    const applyFilter = (obj) => {
      this.expandFilter();
      this.filterByGroup(obj);
      this.clickApplyFilter();
    };
    applyFilter(this.GROUP.user);
    const userOK = this.usersList.length > 0
      ? this.usersList.every((v) => v.getText().includes(this.GROUP.user.name)) : true;

    applyFilter(this.GROUP.store_manager);
    const storeOK = this.usersList.length > 0
      ? this.usersList.every((v) => v.getText().includes(this.GROUP.store_manager.name)) : true;

    applyFilter(this.GROUP.management);
    const managementOK = this.usersList.length > 0
      ? this.usersList.every((v) => v.getText().includes(this.GROUP.management.name)) : true;

    applyFilter(this.GROUP.corp_admin);
    const corpOK = this.usersList.length > 0
      ? this.usersList.every((v) => v.getText().includes(this.GROUP.corp_admin.name)) : true;

    return (userOK && storeOK && managementOK && corpOK);
  }

  /**
   * closeFeedBack() close feedback window only
   */
  closeFeedBack() {
    this.waitForLoadingIconDisappear();
    const closeBtn = $('[ng-click="closeFeedback()"]');
    if (closeBtn.isDisplayed()) {
      closeBtn.click();
    }
  }

  /**
   * getFeedBackText()
   * @return {string} text for the Feedback window
   */
  getFeedBackText() {
    this.waitForLoadingIconDisappear();
    const feedBack = $('.feedback__text');
    return feedBack.getText();
  }

  /**
 * isChecked() trying to find string 'is-checked' in element's attribute class
 *
 * @param {cssSelectorObj} el a webdriverio element
 * @return {Boolean} return state
 */
  isChecked(el) {
    const attrVal = el.getAttribute('class');
    return (attrVal.includes('is-checked') || attrVal.includes('bootstrap-switch-on'));
  }
}
module.exports = new UserManagementPage();

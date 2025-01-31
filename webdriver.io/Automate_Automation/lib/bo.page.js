const Page = require('../pages/page');

/**
 * BOPage Class page
 *
 * @class BOPage
 * @classdesc Library of new version of BackOffice Site
 * @extends Page
 */
class BOPage extends Page {
  /**
   *Creates an instance of NEW Back Office Page.
   * @constructor
   */
  constructor() {
    super();

    /**
     * @property {object} taskStatuses
     * @property {('DELETED' | 'ALL' | 'ACTIVE' | 'EXPIRED')} taskStatuses.status
     */
    this.taskStatuses = {
      Deleted : 'Deleted',
      All     : 'All',
      Active  : 'Active',
      Expired : 'Expired',
    };
  }
  /* eslint-disable no-multi-spaces */

  // new backoffice
  // main menu
  /**  @type {cssSelectorObj} */
  get toolsOpt()           { return $('#bo-menu-item-tools'); }

  // Tools menu
  /**  @type {cssSelectorObj} */
  get corpTaskOpt()        { return $('div.menubar__menu>ul>li:nth-child(1)'); }

  /**  @type {cssSelectorObj} */
  get logoutOpt()          { return $('#bo-navbar-menu li:last-child'); }

  /**  @type {cssSelectorObj} */
  get repSettings()        { return $('#bo-rep-name'); }

  /**  @type {cssSelectorObj} */
  get logoutLink()         { return $('#bo-navbar li:last-child'); }

  /**  @type {cssSelectorObj} */
  get filterBtn()          { return $('#bo-filter-button'); }

  /**  @type {cssSelectorObj} */
  get applyFilterBtn()     { return $('button[ng-click="applyFilter()"]'); }

  /**  @type {cssSelectorObj} */
  get cancelFilterBtn()    { return $('button[ng-click="closePanel()"]'); }

  // filter options - corporate tasks
  /**  @type {cssSelectorObj} */
  get filterByAllOpt()     { return $('div[ng-click="selectFilter(\'all\')"]'); }

  /**  @type {cssSelectorObj} */
  get filterByActiveOpt()  { return $('div[ng-click="selectFilter(\'active\')"]'); }

  /**  @type {cssSelectorObj} */
  get filterByExpiredOpt() { return $('div[ng-click="selectFilter(\'expired\')"]'); }

  /**  @type {cssSelectorObj} */
  get filterByDeletedOpt() { return $('div[ng-click="selectFilter(\'deleted\')"]'); }

  /* eslint-enable no-multi-spaces */

  /**
   * logout() logoff of the backoffice
   */
  logout() {
    this.repSettings.click();
    browser.pause(500);
    this.logoutOpt.click();
  }

  /**
   * open Corporate Tasks option from Tools menu
   *
   * @memberof BOPage
   */
  openCorpTaskOpt() {
    this.toolsOpt.click();
    browser.pause(300);
    this.corpTaskOpt.click();
    this.toolsOpt.click();
    browser.pause(500);
  }

  /**
   * open a corporate task with active filter by default
   *
   * @param {string} [filter='Active'] filter name
   * @memberof BOPage
   */
  corpTaskPage(filter = 'Active') {
    this.openCorpTaskOpt();
    this.filterBy(filter);
    browser.pause(500);
  }

  /**
   * filter the corportate task by status
   *
   * @param  {String} taskStatuses.status
   * @memberof CorporateTasks
   */
  filterBy(taskStatus) {
    this.filterBtn.click();
    browser.pause(300);
    switch (taskStatus) {
      case this.taskStatuses.Deleted:
        this.filterByDeletedOpt.click();
        break;
      case this.taskStatuses.All:
        this.filterByAllOpt.click();
        break;
      case this.taskStatusestus.Active:
        this.filterByActiveOpt.click();
        break;
      case this.taskStatuses.Expired:
        this.filterByExpiredOpt.click();
        break;
      default:
    }
    this.applyFilterBtn.click();
    this.waitForLoadingIconDisappear();
    browser.pause(500);
  }
}
module.exports = new BOPage();

const CorporateTasksPage = require('./corporatetasks.page');

/**
 * Class Corporate Task Details
 * @class
 * @classdesc Corporate Tasks Library
 * @extends CorporateTasksPage
 */
class TaskDetailsPage extends CorporateTasksPage {
  /**
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // --> Task Description
  /**  @type {cssSelectorObj} */
  get autoDismissDateTimeLabelSel() { return $$('label.form-card__label--is-spaced-down')[1]; }
  // <-- Task Description

  // --> Task Info
  // <-- Task Info

  // --> Suggested Task Content
  // <-- Suggested Task Content

  /**  @type {cssSelectorObj} */
  get confirmDeleteTaskBtn() { return $('a[ng-click*="onConfirmClick("]'); }

  /**  @type {cssSelectorObj} */
  get backToTaskViewBtn() { return $('a.view-container__back-button'); }

  /**
   * delete a active task
   * @param {number} [rowNumber=1] row number from main view
   * @returns {boolean}
   */
  deleteTask(rowNumber = 1) {
    const taskData = this.fetchTaskData(rowNumber);
    this.deleteIconList[rowNumber - 1].click();
    browser.pause(300);
    this.confirmDeleteTaskBtn.waitForDisplayed();
    this.confirmDeleteTaskBtn.click();
    this.waitForLoadingIconDisappear();
    browser.pause(1500);
    const foundText = this.taskTitleList.findIndex((value) => {
      const titleName = value.getText();
      return titleName.includes(taskData.title);
    });
    return (foundText === -1);
  }

}
module.exports = new TaskDetailsPage();
// FIXME we need to remove prodLIb from here but the spec code need to be refactored
const ProdLib = require('./productlibrary.page');
const CorporateTasksPage = require('./corporatetasks.page');

/**
 * Class Corporate Edit Task
 * @class
 * @classdesc Corporate Tasks Library
 * @extends CorporateTasksPage
 */
class EditTaskPage extends CorporateTasksPage {
  /**
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // task page - fields

  /**  @type {cssSelectorObj} */
  get taskTitle() { return $('#bo-corporate-task-title'); }

  /**  @type {cssSelectorObj} */
  get autoDismissDateTimeLabelSel() { return $$('label.form-card__label--is-spaced-down')[2]; }

  /**  @type {cssSelectorObj} */
  get taskDetails() { return $('#bo-corporate-task-details'); }

  /**  @type {cssSelectorObj} */
  get reminderDate() { return $('#bo-corporate-task-reminder-date'); }

  /**  @type {cssSelectorObj} */
  get reminderTime() { return $('#bo-corporate-task-reminder-time'); }

  /**  @type {cssSelectorObj} */
  get dismissDate() { return $('#bo-corporate-task-dismiss-date'); }

  /**  @type {cssSelectorObj} */
  get dismissTime() { return $('#bo-corporate-task-dismiss-time'); }

  /**  @type {cssSelectorObj} */
  get suggestedSubject() { return $('#bo-corporate-task-suggested-subject'); }

  /**  @type {cssSelectorObj} */
  get suggestedContent() { return $('#bo-corporate-task-suggested-copy'); }

  /**  @type {cssSelectorObj} */
  get cancelTaskBtn() { return $('#bo-cancel-button'); }

  /**  @type {cssSelectorObj} */
  get selectProductBtn() { return $('button.bo-button--is-select-products'); }

  /*
  * DatePicker
  */

  /**  @type {cssSelectorObj} */
  get nextMonthBtn() { return $('a.ui-datepicker-next'); }

  /**  @type {cssSelectorArr} */
  get reminderTimeOpt() { return $$('#bo-corporate-task-reminder-time > option'); }

  /**  @type {cssSelectorArr} */
  get dismissTimeOpt() { return $$('#bo-corporate-task-dismiss-time > option'); }

  /**
   * adding a new corporate task
   * @param {boolean} [autoDismissDate=false]
   * @returns {object} newTask
   */
  addNewTask(autoDismissDate = false) {
    this.createNewTaskBtn.waitForDisplayed();
    this.createNewTaskBtn.click();
    this.cancelTaskBtn.waitForDisplayed();
    return (this.newTask(autoDismissDate));
  }

  /**
   * form fill the fields for a new Corporate task
   * @param {*} autoDismissDate
   * @returns {object} NewTask
   */
  newTask(autoDismissDate) {
    const fingerPrint = this.rawDateString();
    const newTask = {
      title          : `New task title-${fingerPrint}`,
      reminderDate   : '',
      reminderTime   : '',
      dismissDate    : '',
      dismissTime    : '',
      details        : `new task details-${fingerPrint}`,
      suggestSubject : `Suggested subject text field-${fingerPrint}`,
      suggestContent : `Suggested body text field-NewTask-${fingerPrint}`,
      fingerprint    : `${fingerPrint}`,
    };

    // reminder date
    this.reminderDate.waitForDisplayed();
    this.reminderDate.waitForEnabled();
    this.reminderDate.click();
    browser.pause(250);
    this.nextMonthBtn.waitForDisplayed();
    this.nextMonthBtn.click();
    const curDate = new Date();
    const reminderDay = this.randomDay(
      curDate.getFullYear(),
      (curDate.getMonth() === 11 ? 1 : curDate.getMonth() + 1)
    );
    $(`a=${reminderDay}`).click();

    // time - should not be 0:00
    this.reminderTimeOpt[this.randomNumber(this.reminderTimeOpt.length, 1)].click();

    if (autoDismissDate) {
      // dismiss date will start the 1st day of 2 months later since today
      this.dismissDate.waitForDisplayed();
      this.dismissDate.waitForEnabled();
      this.dismissDate.click();
      browser.pause(250);
      this.nextMonthBtn.click();
      browser.pause(100);
      this.nextMonthBtn.click();
      browser.pause(100);
      $('a=1').click();

      // time - should not be 0:00
      this.dismissTimeOpt[this.randomNumber(this.dismissTimeOpt.length, 1)].click();

      newTask.dismissTime = this.dismissTime.getValue();
    }
    if (this.dismissDate.getValue() === '') {
      newTask.dismissDate = '- -';
    } else {
      newTask.dismissDate = this.convertDate(this.dismissDate.getValue(), 'ymd', 'mdy');
    }
    // update time and date
    newTask.reminderDate = this.convertDate(this.reminderDate.getValue(), 'ymd', 'mdy');
    newTask.reminderTime = this.reminderTime.getValue();

    this.taskTitle.setValue(newTask.title);
    this.taskDetails.setValue(newTask.details);
    this.suggestedSubject.setValue(newTask.suggestSubject);
    this.suggestedContent.setValue(newTask.suggestContent);

    /*
     * adding a product
     */
    this.selectProductBtn.click();
    // click on first category
    browser.pause(1000);
    this.waitForLoadingIconDisappear(16000); // wait spinner to disappear
    ProdLib.categoryList[0].click();
    // click on sub-category
    this.waitForLoadingIconDisappear(); // wait spinner to disappear
    browser.pause(1500);
    ProdLib.categoryList[0].waitForDisplayed();
    ProdLib.categoryList[0].click();

    // open a list of products and select one
    browser.pause(1500);
    this.waitForLoadingIconDisappear(); // wait spinner to disappear

    // --> give second chance
    if (ProdLib.emptyState.isDisplayed()) {
      ProdLib.cancelProductBtn.click();
      this.waitForLoadingIconDisappear(); // wait spinner to disappear
      this.selectProductBtn.waitForDisplayed();
      this.selectProductBtn.click();

      browser.pause(1000);
      this.waitForLoadingIconDisappear(16000); // wait spinner to disappear

      const stringToFind = 'black';
      ProdLib.searchProductsByField(stringToFind);
    }
    // <--
    ProdLib.productList[0].waitForDisplayed();
    ProdLib.productList[0].click();
    ProdLib.addProductBtn.waitForEnabled();
    ProdLib.addProductBtn.click();
    browser.pause(1000);

    this.createNewTaskBtn.waitForEnabled();
    this.createNewTaskBtn.click();
    this.waitForLoadingIconDisappear(20000); // wait spinner to disappear
    browser.pause(1000);

    return (newTask);
  }

  /**
   * edit a corporate task
   *
   * @param {number} row
   * @returns {string}
   */
  editCorpTask(row) {
    // eslint-disable-next-line no-param-reassign
    this.waitForLoadingIconDisappear();
    this.taskList[row].click();
    this.clickEditTask();

    let changeText = '';
    this.taskTitle.waitForDisplayed({timeout: 5000});
    const title = this.taskTitle.getValue();

    // modify the content - alterance of content
    if (title.substring(0, 9) !== '123Modif-') {
      changeText = '123Modif-';
      this.taskTitle.setValue(`${changeText}${this.taskTitle.getValue()}`);
      this.taskDetails.setValue(`${changeText}${this.taskDetails.getValue()}`);
      this.suggestedSubject.setValue(`${changeText}${this.suggestedSubject.getValue()}`);
      this.suggestedContent.setValue(`${changeText}${this.suggestedContent.getValue()}`);
    } else {
      this.taskTitle.setValue(this.taskTitle.getValue().substring(9));
      this.taskDetails.setValue(this.taskDetails.getValue().substring(9));
      this.suggestedSubject.setValue(this.suggestedSubject.getValue().substring(9));
      this.suggestedContent.setValue(this.suggestedContent.getValue().substring(9));
    }

    const taskDataModif = {
      title : this.taskTitle.getValue(),
    };
    this.clickEditTask();
    return taskDataModif;
  }

  /**
   * Method for clicking Edit Task Button
   */
  clickEditTask() {
    this.waitForLoadingIconDisappear();
    this.editTaskBtn.waitForEnabled();
    this.editTaskBtn.click();
    this.waitForLoadingIconDisappear();
  }

}
module.exports = new EditTaskPage();
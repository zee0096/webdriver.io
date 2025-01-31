const BackOfficePage = require('../../backoffice.page');

/**
 * Class Corporate Tasks
 *
 * @class
 * @classdesc Corporate Tasks Library
 * @requires ProductLibrary
 * @extends BackOfficePage
 */
class CorporateTasks extends BackOfficePage {
  /**
   *Creates an instance of corporateTasks.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**  @type {cssSelectorObj} */
  get paginationMainView() { return $('div.bo-pagination__label'); }

  /**  @type {cssSelectorObj} */
  get nextPageBtn() { return $('button[ng-click="goToPage(page + 1)"]'); }

  /**  @type {cssSelectorObj} */
  get firstPageBtn() { return $('button[ng-click="goToPage(1)"]'); }

  /**  @type {cssSelectorArr} */
  get taskTitleList() { return $$('span[class*=listing-table__title]'); }

  /**  @type {cssSelectorArr} */
  get taskList() { return $$('div[ng-repeat="task in corporateTasks"]'); }

  // fields of a task in view page
  /**  @type {cssSelectorTxt} */
  get titleData() { return 'div.listing-table__item span.listing-table__content-wrapper'; }

  /**  @type {cssSelectorTxt} */
  get reminderData() { return 'div.listing-table__item + div.listing-table__item--is-medium span.listing-table__content-wrapper'; }

  /**  @type {cssSelectorTxt} */
  get dismissData() { return 'div.listing-table__item--is-medium + div.listing-table__item--is-medium span.listing-table__content-wrapper'; }

  /**  @type {cssSelectorArr} */
  get deleteIconList() { return $$('div:not(.listing-table__item--no-click).listing-table__item--is-icon'); }

  /*
  * task page
  */
  /**  @type {cssSelectorObj} */
  get createNewTaskBtn() { return $('button#bo-create-button'); }

  /**  @type {cssSelectorObj} */
  get editTaskBtn() { return $('#bo-create-button'); }

  /**
   * Validate on task view page if the finger print is displayed
   * it can be validate on all pages using next button
   * @param {array} task data
   * @param {string} [fieldSearch='fingerprint']
   * @param {boolean} [autoDismissDate=false]
   * @returns {boolean} found or not the fingerprint
   */
  checkTaskInMainView(taskData, fieldSearch = 'fingerprint') {
    const numOfPages = this.pageNumbers();
    let foundText;
    let arrayTitles = this.taskList;
    // take the content field as fieldSearch informed by parameter
    const searchedString = taskData[fieldSearch];
    let returnValue = false;
    browser.pause(1000);

    for (let pg = 1; pg <= numOfPages[1]; pg += 1) {
      foundText = arrayTitles.findIndex((value) => {
        const titleName = value.getText();
        return titleName.includes(searchedString);
      });
      if (foundText !== -1) {
        browser.pause(300);
        returnValue = true;
        break;
      } else if (pg < numOfPages[1]) {
        this.waitForLoadingIconDisappear();
        this.nextPageBtn.click();
        browser.pause(1000);
        arrayTitles = this.taskList;
      }
    }
    return returnValue;
  }

  /**
   * return the number of pages (current and last page) in main view page
   * @returns {array} number of current page and last page
   */
  pageNumbers() {
    this.paginationMainView.waitForDisplayed({ timeout : 5000 });
    const txtNumOfPages = this.paginationMainView.getText();
    const numOfPages = txtNumOfPages.match(/[0-9]+/g);
    return (numOfPages.map((pg) => (parseInt(pg, 10))));
  }

  /**
   * generate a random valid day for a specific month/year
   * @param {number} year
   * @param {number} month starts from 1 to 12
   * @returns {number}
   */
  randomDay(year, month) {
    const day = new Date(year, month, 0);
    return (Math.floor(Math.random() * (day.getDate() - 1)) + 1);
  }

  /**
   * return the data of a task in an array
   * @param {number} [row=1] row in main view page
   * @returns {object} task
   */
  fetchTaskData(row = 1) {
    const pages = this.pageNumbers();
    if (pages[0] !== 1) {
      // go to first page
      this.firstPageBtn.click();
      browser.pause(1000);
    }

    return {
      title        : $$(this.titleData)[row].getText(),
      reminderDate : this.dateExtract($$(this.reminderData)[row].getText()),
      reminderTime : this.timeExtract($$(this.reminderData)[row].getText()),
      dismissDate  : this.dateExtract($$(this.dismissData)[row].getText()),
      dismissTime  : this.timeExtract($$(this.dismissData)[row].getText()),
      fingerprint  : this.fingerprintExtract($$(this.titleData)[row].getText()),
    };
  }

  /**
   * return the date from a string with date and time
   *
   * @param {string} dateTime
   * @returns {string} only date
   */
  dateExtract(dateTime) {
    const ret = /^[0-9]+\/[0-9]+\/[0-9]{4}/.exec(dateTime);
    if (Array.isArray(ret)) {
      return ret[0];
    }
    return '';
  }

  /**
   * return the time from a string with date and time
   * @param {string} dateTime
   * @returns {string} only time
   */
  timeExtract(dateTime) {
    const ret = /[0-9]+:[0-9]+ [A|P]M/.exec(dateTime);
    if (Array.isArray(ret)) {
      return ret[0];
    }
    return '';
  }

  /**
   * return the fingerprint at the end of string
   * @param {string} title
   * @returns {string} only date
   */
  fingerprintExtract(title) {
    const ret = /[0-9]+$/.exec(title);
    if (Array.isArray(ret)) {
      return ret[0];
    }
    return '';
  }

  /**
   * convert a date (fromat string) to another format with delimiter choised
   * @param {string} inputDate date to be converted (must have 8 or 10 chars)
   * @param {string} from valid imput values: dmy, ymd, mdy
   * @param {string} to valid output values: dmy, ymd, mdy
   * @param {string} [limiter='/'] if empty "" return only numbers without delimiters
   * @returns {string}
   */
  convertDate(inputDate, from, to, delimiter = '/') {
    let outputDate;
    let mm;
    let dd;
    let yyyy;
    if (inputDate.length > 8) {
      // remove limiters
      // eslint-disable-next-line no-param-reassign
      inputDate = inputDate.replace(/[^0-9]+/g, '');
    }

    if (from === 'mdy') {
      mm = inputDate.substring(0, 2);
      dd = inputDate.substring(2, 4);
      yyyy = inputDate.substring(4);
    } else if (from === 'ymd') {
      mm = inputDate.substring(4, 6);
      dd = inputDate.substring(6, 8);
      yyyy = inputDate.substring(0, 4);
    } else if (from === 'dmy') {
      mm = inputDate.substring(2, 4);
      dd = inputDate.substring(0, 2);
      yyyy = inputDate.substring(4);
    }

    if (to === 'mdy') {
      outputDate = `${mm}${delimiter}${dd}${delimiter}${yyyy}`;
    } else if (to === 'ymd') {
      outputDate = `${yyyy}${delimiter}${mm}${delimiter}${dd}`;
    } else if (to === 'dmy') {
      outputDate = `${dd}${delimiter}${mm}${delimiter}${yyyy}`;
    }
    return outputDate;
  }
}
module.exports = CorporateTasks;

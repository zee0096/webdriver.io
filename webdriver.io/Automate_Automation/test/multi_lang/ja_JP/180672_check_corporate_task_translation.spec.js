const CorporateTasks = require('../../../pages/backoffice/corporatetasks/corporatetasks.page');
const TaskDetailsPage = require('../../../pages/backoffice/corporatetasks/taskdetails.page');
const EditTaskPage = require('../../../pages/backoffice/corporatetasks/edittask.page');
const speclib = require('../../../lib/speclib');
const { MULTILANGUAGES } = require('../../../lib/defaultconstantslib');

const CorporateTasksPage = new CorporateTasks();

speclib.descSkipIf(CorporateTasksPage.LOCALE !== MULTILANGUAGES.ja_JP)(`${CorporateTasksPage.RETAILER}
 Corporate task in Backoffice verification`, () => {
  it('C180672 Validate that, The translation at Backoffice corporate task creation is correct', () => {
    speclib.addModule(speclib.ALLURE.module.multiLang);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('180672');

    speclib.addStepAutoNumber('Open back office page and login as corp admin');
    CorporateTasksPage.openBoAndLoginByRole(CorporateTasksPage.ROLE.corp_admin, false);

    speclib.addStepAutoNumber('Click corporate tasks menu option');
    CorporateTasksPage.corporateTasksMnu.click();
    CorporateTasksPage.waitForLoadingIconDisappear();

    // We need it here cause the element is accesible only via document.querySelectorAll('.view-container__loader')
    // eslint-disable-next-line wdio/no-pause
    browser.pause(5000);

    speclib.addStepAutoNumber('Verify "Auto-Dismiss Date and Time" text');
    const autoDismissDateTimeLabelSel = CorporateTasksPage.taskTitleList[2];
    autoDismissDateTimeLabelSel.waitForDisplayed();
    expect(autoDismissDateTimeLabelSel.getText()).toEqual('自動却下の日時');


    if (CorporateTasksPage.taskList.length > 0) {
      speclib.addStepAutoNumber('Click on any task');
      CorporateTasksPage.taskList[0].click();

      // We need it here cause the element is accesible only via document.querySelectorAll('.view-container__loader')
      // eslint-disable-next-line wdio/no-pause
      browser.pause(3000);

      CorporateTasksPage.waitForLoadingIconDisappear();

      speclib.addStepAutoNumber('Verify "Auto-Dismiss on" text in Task detail screen');

      TaskDetailsPage.autoDismissDateTimeLabelSel.waitForExist();
      TaskDetailsPage.autoDismissDateTimeLabelSel.waitForDisplayed();
      expect(TaskDetailsPage.autoDismissDateTimeLabelSel.getText()).toEqual('自動却下日');

      speclib.addStepAutoNumber('Click Edit Task');
      EditTaskPage.clickEditTask();

      // We need it here cause the element is accesible only via document.querySelectorAll('.view-container__loader')
      // eslint-disable-next-line wdio/no-pause
      browser.pause(3000);

      speclib.addStepAutoNumber('Verify "Auto-Dismiss Date and Time" text in Task editing screen');

      EditTaskPage.autoDismissDateTimeLabelSel.waitForExist();
      EditTaskPage.autoDismissDateTimeLabelSel.waitForDisplayed();
      expect(EditTaskPage.autoDismissDateTimeLabelSel.getText()).toEqual('自動却下の日時');
    }
  });
});

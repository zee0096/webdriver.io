const speclib = require('../../../lib/speclib');
const BOPage = require('../../../lib/bo.page');
const EditTaskPage = require('../../../pages/backoffice/corporatetasks/edittask.page');
const TaskDetailsPage = require('../../../pages/backoffice/corporatetasks/taskdetails.page');

speclib.descSkipIf(BOPage.isProdEnv)(`${BOPage.RETAILER} Corporate Tasks`, () => {
  before('Logged as Corp_admin user', () => {
    speclib.addStepAutoNumber('Before Open back office page and login as corp admin');
    TaskDetailsPage.openBoAndLoginByRole(TaskDetailsPage.ROLE.corp_admin, false);
  });

  after('BO user logout', () => {
    TaskDetailsPage.waitForLoadingIconDisappear();
    speclib.addStepAutoNumber('After Logout from backoffice');
    BOPage.logout();
  });

  it('C184180 As corp admin, I should be able to edit existing corporate task', () => {
    speclib.addModule(speclib.ALLURE.module.corporateTasks);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184180');

    TaskDetailsPage.corporateTasksMnu.click();
    TaskDetailsPage.waitForLoadingIconDisappear(5000);
    const rowNumber = 1;
    const menuTaskData = TaskDetailsPage.fetchTaskData(rowNumber);

    BOPage.filterBtn.waitForDisplayed({ timeout : 5000 });
    speclib.addStepAutoNumber('Go to first view page and edit it');
    const dataModif = EditTaskPage.editCorpTask(rowNumber);

    speclib.addStepAutoNumber('Validate modified title');
    expect(menuTaskData.title).not.toEqual(dataModif.title);

    speclib.addStepAutoNumber('Click back to task view button');
    TaskDetailsPage.waitForLoadingIconDisappear();
    TaskDetailsPage.backToTaskViewBtn.waitForDisplayed({ timeout : 1500 });
    TaskDetailsPage.backToTaskViewBtn.click();
    browser.pause(1000);
    speclib.addStepAutoNumber('Verify task title was changed on main view page');
    expect($$(TaskDetailsPage.titleData)[rowNumber].getText()).toEqual(dataModif.title);
  });
});

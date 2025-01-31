const speclib = require('../../../lib/speclib');
const BOPage = require('../../../lib/bo.page');
const TaskDetailsPage = require('../../../pages/backoffice/corporatetasks/taskdetails.page');

speclib.descSkipIf(BOPage.isProdEnv)(`${BOPage.RETAILER} Corporate Tasks`, () => {
  before('Logged as Corp_admin user', () => {
    speclib.addStepAutoNumber('Before - Open back office page and login as corp admin');
    TaskDetailsPage.openBoAndLoginByRole(TaskDetailsPage.ROLE.corp_admin, false);
  });

  after('BO user logout', () => {
    TaskDetailsPage.waitForLoadingIconDisappear();
    speclib.addStepAutoNumber('After - Logout from backoffice');
    BOPage.logout();
  });

  it('C184181 As corp admin, I should be able to delete a corporate task', () => {
    speclib.addModule(speclib.ALLURE.module.corporateTasks);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('184181');
    TaskDetailsPage.corporateTasksMnu.click();
    TaskDetailsPage.waitForLoadingIconDisappear(5000);

    speclib.addStepAutoNumber('Get first task');
    const rowNumber = 1;
    const taskData = TaskDetailsPage.fetchTaskData(rowNumber);
    BOPage.filterBtn.waitForDisplayed({ timeout : 3000 });
    speclib.addStepAutoNumber('Delete task');
    expect(TaskDetailsPage.deleteTask()).toBe(true);
    speclib.addStepAutoNumber('Filter tasks by deleted status');
    BOPage.filterBy(BOPage.taskStatuses.Deleted);
    speclib.addStepAutoNumber('Verify task is in the main view');
    expect(TaskDetailsPage.checkTaskInMainView(taskData, 'title')).toBe(true);
  });
});

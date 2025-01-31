const speclib = require('../../../lib/speclib');
const BOPage = require('../../../lib/bo.page');
const EditTaskPage = require('../../../pages/backoffice/corporatetasks/edittask.page');
const TaskDetailsPage = require('../../../pages/backoffice/corporatetasks/taskdetails.page');

speclib.descSkipIf(BOPage.isProdEnv)(`${BOPage.RETAILER} Corporate Tasks`, () => {
  before('Logged as Corp_admin user', () => {
    speclib.addStepAutoNumber('Before - Open back office page and login as corp admin');
    TaskDetailsPage.openBoAndLoginByRole(TaskDetailsPage.ROLE.corp_admin, false);
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.corporateTasks);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  after('BO user logout', () => {
    TaskDetailsPage.waitForLoadingIconDisappear();
    speclib.addStepAutoNumber('After - Logout from backoffice');
    BOPage.logout();
  });

  it('C184178 As corp admin, I should be able to create corporate task', () => {
    speclib.addTestId('184178');
    speclib.addStepAutoNumber('Validate corporate tasks menu option is displayed');
    expect(TaskDetailsPage.corporateTasksMenuOpt).toBeDisplayed();
    speclib.addStepAutoNumber('Click corporate tasks menu option');
    TaskDetailsPage.corporateTasksMnu.click();
    TaskDetailsPage.waitForLoadingIconDisappear(5000);
    speclib.addStepAutoNumber('Verify page has correct url');
    expect(browser).toHaveUrlContaining('/preview/#/corporate-task');

    speclib.addStepAutoNumber('Validate filter button is displayed');
    TaskDetailsPage.waitForLoadingIconDisappear();
    expect(BOPage.filterBtn).toBeDisplayed();

    speclib.addStepAutoNumber('Add new task');
    const taskData = EditTaskPage.addNewTask();
    BOPage.filterBtn.waitForDisplayed({ timeout : 3000 });
    speclib.addStepAutoNumber('Verify task is displayed in main view');
    expect(TaskDetailsPage.checkTaskInMainView(taskData)).toBe(true);
  });

  it('C184179 As corp admin, I should be able to create corporate task with dismiss date', () => {
    speclib.addTestId('184179');
    speclib.addStepAutoNumber('Add new task with dismiss date');
    const taskData = EditTaskPage.addNewTask(true);
    BOPage.filterBtn.waitForDisplayed({ timeout : 3000 });
    speclib.addStepAutoNumber('Verify task is displayed in main view');
    expect(TaskDetailsPage.checkTaskInMainView(taskData, 'fingerprint')).toBe(true);
  });
});

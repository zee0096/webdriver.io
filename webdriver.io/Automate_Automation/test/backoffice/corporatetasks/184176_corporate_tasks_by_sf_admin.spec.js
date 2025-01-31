/* eslint-disable wdio/await-expect */
const speclib = require('../../../lib/speclib');
const BOPage = require('../../../lib/bo.page');
const TaskDetailsPage = require('../../../pages/backoffice/corporatetasks/taskdetails.page');

describe(`${BOPage.RETAILER} Corporate Tasks`, () => {
  it('C184176 As salesfloor admin, I can access corporate tasks', () => {
    speclib.addTestId('184176');
    speclib.addModule(speclib.ALLURE.module.corporateTasks);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addStepAutoNumber('Open backoffice and login as admin');
    TaskDetailsPage.openBoAndLoginByRole(TaskDetailsPage.ROLE.admin, false);
    speclib.addStepAutoNumber('Verify corporate task menu is displayed');
    expect(TaskDetailsPage.corporateTasksMnu).toBeDisplayed();
    speclib.addStepAutoNumber('Click corporate task menu button');
    TaskDetailsPage.corporateTasksMnu.click();
    speclib.addStepAutoNumber('Verify browser url is correct');
    expect(browser).toHaveUrlContaining('/preview/#/corporate-task');
    speclib.addStepAutoNumber('Logout from backoffice');
    TaskDetailsPage.waitForLoadingIconDisappear();
    BOPage.logout();
  });
});

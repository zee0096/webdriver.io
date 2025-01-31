/* eslint-disable wdio/await-expect */
const speclib = require('../../../lib/speclib');
const TaskDetailsPage = require('../../../pages/backoffice/corporatetasks/taskdetails.page');

describe(`${TaskDetailsPage.RETAILER}
 Corporate Tasks`, () => {
  it('C184177 As rep, I cannot access the corporate tasks menu', () => {
    speclib.addTestId('184177');
    speclib.addModule(speclib.ALLURE.module.corporateTasks);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addStepAutoNumber('Open backoffice and login as rep');
    TaskDetailsPage.openBoAndLoginByRole(TaskDetailsPage.ROLE.rep, false);
    speclib.addStepAutoNumber('Verify corporate task menu is not displayed');
    expect(TaskDetailsPage.corporateTasksMnu).not.toBeDisplayed();
    speclib.addStepAutoNumber('Logout from backoffice');
    TaskDetailsPage.logoutWithoutUI();
  });
});

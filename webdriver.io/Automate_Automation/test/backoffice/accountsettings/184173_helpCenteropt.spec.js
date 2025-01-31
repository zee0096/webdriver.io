/* eslint-disable wdio/await-expect */
// previous test namebackoffice.spec.js

const Backoffice = require('../../../pages/backoffice.page');
const speclib = require('../../../lib/speclib');

const BackOfficePage = new Backoffice();

describe(`${BackOfficePage.RETAILER} - Validating Help Center link`, () => {
  it('C184173 Help Center Link goes to Zendesk', () => {
    speclib.addTestId('184173');
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addModule(speclib.ALLURE.module.accountSettings);

    speclib.addStepAutoNumber('Open BO page and log in as Rep');
    BackOfficePage.openBoAndLoginByRole(BackOfficePage.ROLE.rep, false);

    speclib.addStepAutoNumber('Click on settings/help center option');
    BackOfficePage.clickOnSettingsHelpCenterOpt();
    BackOfficePage.switchToHelpCenterWindow();

    speclib.addStepAutoNumber('Validating help center page has zendesk link');
    expect(browser).toHaveUrlContaining('https://salesfloor.zendesk.com/');

    speclib.addStepAutoNumber('Validating Salesfloor logo');
    expect(BackOfficePage.sfLogo).toBeDisplayed();
  });
});

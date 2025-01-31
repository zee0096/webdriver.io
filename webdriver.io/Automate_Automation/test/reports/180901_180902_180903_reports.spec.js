/* eslint-disable wdio/await-expect */
const ReportsPage = require('../../pages/backoffice/reports/reports.page');
const speclib = require('../../lib/speclib');

describe(`${ReportsPage.RETAILER} Back Office Report`, () => {
  before(() => {
    speclib.addStepAutoNumber('Open back office and login as rep');
    ReportsPage.openBoAndLoginByRole(ReportsPage.ROLE.rep, false);
    speclib.addStepAutoNumber('Click on report menu button');
    ReportsPage.clickOnReportsMnu();
    speclib.addStepAutoNumber('Wain until spinner is done');
    ReportsPage.waitUntilSpinnerIsDone();
  });

  beforeEach(() => {
    speclib.addModule(speclib.ALLURE.module.backoffice);
    speclib.addSeverity(speclib.ALLURE.severity.major);
  });

  it('C180901 Rep sees Sales reports', () => {
    speclib.addTestId('180901');
    speclib.addStepAutoNumber('Go to sales tab');
    ReportsPage.gotoSalesTab();
    speclib.addStepAutoNumber('Change sales time ranges');
    expect(ReportsPage.RANGES.every((v) => ReportsPage.changeSalesTimeRange(v))).toBeTruthy();
  });

  it('C180902 Rep sees KPIs reports', () => {
    speclib.addTestId('180902');
    speclib.addStepAutoNumber('Go to KPI tab');
    ReportsPage.gotoKPIsTab();
    speclib.addStepAutoNumber('Change KPI time ranges');
    expect(ReportsPage.KPI_RANGES.every((v) => ReportsPage.changeKPITimeRange(v))).toBe(true);
  });

  it('C180903 Rep sees Dashboard report', () => {
    speclib.addTestId('180903');
    speclib.addStepAutoNumber('Go to dashboard');
    ReportsPage.gotoDashboardTab();
    speclib.addStepAutoNumber('Verify dashboard sales metrics are displayed');
    expect(ReportsPage.metricsDashboardSales).toBeDisplayed();
    speclib.addStepAutoNumber('Verify metrics service is displayed');
    expect(ReportsPage.metricsService).toBeDisplayed();
    speclib.addStepAutoNumber('Verify metrics management is displayed');
    expect(ReportsPage.metricsEngagement).toBeDisplayed();
    speclib.addStepAutoNumber('Validate dashboard data');
    expect(ReportsPage.validateDashboardData()).toBe(true);
  });
});

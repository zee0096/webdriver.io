const assert = require('assert');
const BackOffice = require('../../backoffice.page');

/**
 * BackOfficeReportsPage Class page
 *
 * @class BackOfficeReportsPage
 * @classdesc Library of Backoffice report page
 * @extends BackOfficePage
 */
class ReportsPage extends BackOffice {
  /**
   *Creates an instance of BackOfficePage.
   * @constructor
   */
  constructor() {
    super();
    this.RANGES = ['today', 'yesterday', 'lastweek', 'lastmonth', 'month-2', 'month-3', 'month-4',
      'month-5', 'month-6', '7days', '30days', 'WTD', 'MTD'];
    this.KPI_RANGES = this.RANGES.concat(['YTD', 'all']);
  }

  /**  @type {cssSelectorObj} */
  get dashboardTab() { return $('#ui-id-1'); }

  /**  @type {cssSelectorObj} */
  get salesTab() { return $('#ui-id-2'); }

  /**  @type {cssSelectorObj} */
  get kpiTab() { return $('#ui-id-3'); }

  /**  @type {cssSelectorObj} */
  get timeRangeKPI() { return $('#activityRangeActivity'); }

  /**  @type {cssSelectorObj} */
  get timeRangeSale() { return $('#activityRangeTransactions'); }

  /**  @type {cssSelectorObj} */
  get salesSummary() { return $('div.fn-metrics-sales-summary'); }

  /**  @type {cssSelectorObj} */
  get salesDetails() { return $('div.fn-metrics-sales-details'); }

  /**  @type {cssSelectorObj} */
  get kpiSummary() { return $('div.fn-metrics-activity-service'); }

  /**  @type {cssSelectorObj} */
  get kpiDetails() { return $('div.fn-metrics-activity-content'); }

  /**  @type {cssSelectorArr} */
  get kpiValues() { return $$('td.report__kpis__value'); }

  /**  @type {cssSelectorArr} */
  get kpiRanks() { return $$('td.report__kpis__rank'); }

  /**  @type {cssSelectorArr} */
  get kpiVariances() { return $$('td.report__kpis__variance'); }

  /**  @type {cssSelectorArr} */
  get metricsDashboardSales() { return $('div.fn-metrics-dashboard-sales'); }

  /**  @type {cssSelectorArr} */
  get metricsService() { return $('div.fn-metrics-service'); }

  /**  @type {cssSelectorArr} */
  get metricsEngagement() { return $('div.fn-metrics-engagement'); }

  /**
   * waitUntilSpinnerIsDone() waits for the loading spinner to disappear
   */
  waitUntilSpinnerIsDone() {
    $('div#dashboard div div.loading-ctn.fn-loading').waitForDisplayed({ timeout : 15000, reverse : true });
    $('div#transaction div div.loading-ctn.fn-loading').waitForDisplayed({ timeout : 15000, reverse : true });
    $('div#activity div div.loading-ctn.fn-loading').waitForDisplayed({ timeout : 15000, reverse : true });
  }

  /**
   * gotoKpisTab() to see customer request information
   */
  gotoKPIsTab() {
    this.kpiTab.click();
    this.waitUntilSpinnerIsDone();
  }

  /**
   * changeKPITimeRange() changes the time range in the KPI drop-down
   * @param {string} range value to put in the Range drop-down
   * @returns {boolean}
   */
  changeKPITimeRange(range) {
    this.timeRangeKPI.selectByAttribute('value', range);

    this.waitUntilSpinnerIsDone();
    // FIXME to revew the this function - improvement
    this.validateKPICustomerEngagementData(range);

    return (this.timeRangeKPI.getValue() === range);
  }

  /**
   * gotoSalesTab() to see sales information: summary and details
   */
  gotoSalesTab() {
    this.salesTab.click();
    this.waitUntilSpinnerIsDone();
  }

  /**
   * changeSalesTimeRange() changes the time range in the Sales drop-down
   *
   * @param {String} range value to put in the Range drop-down
   * @returns {boolean}
   */
  changeSalesTimeRange(range) {
    this.timeRangeSale.selectByAttribute('value', range);

    this.waitUntilSpinnerIsDone();
    return (this.timeRangeSale.getValue() === range);
  }

  /**
   * gotoSalesTab() to see sales information: summary and details
   * @returns {boolean}
   */
  gotoDashboardTab() {
    this.dashboardTab.click();
    this.waitUntilSpinnerIsDone();
    return (this.metricsDashboardSales.waitForDisplayed());
  }

  /**
   * validateDashboardData() checks the formatting of the Dashboard columns
   * @returns {boolean}
   */
  validateDashboardData() {
    const check = [];
    const numbersRE = /\d{1,3}(,\d{3})?$/;

    check.push(this.kpiValues[0].getText().indexOf('$') === 0);
    check.push(this.kpiValues[2].getText().indexOf('%') === this.kpiValues[2].getText().length - 1);
    check.push(this.kpiValues[3].getText().indexOf('m') === this.kpiValues[3].getText().length - 1);
    check.push(numbersRE.test(this.kpiValues[4].getText()));
    check.push(numbersRE.test(this.kpiValues[5].getText()));

    if (!this.isProdEnv || this.isTeamMode) {
      check.push(this.kpiRanks[0].getText().indexOf('#') === 0);
      check.push(this.kpiRanks[2].getText().indexOf('#') === 0);
      check.push(this.kpiRanks[3].getText().indexOf('#') === 0);
      check.push(this.kpiRanks[5].getText().indexOf('#') === 0);

      check.push(this.kpiVariances[0].getText().indexOf('%') === this.kpiVariances[0].getText().length - 1
        || this.kpiVariances[0].getText() === '—');
      check.push(this.kpiVariances[2].getText().indexOf('%') === this.kpiVariances[2].getText().length - 1
        || this.kpiVariances[2].getText() === '—');
      check.push(this.kpiVariances[3].getText().indexOf('%') === this.kpiVariances[3].getText().length - 1
        || this.kpiVariances[3].getText() === '—');
      check.push(this.kpiVariances[4].getText().indexOf('%') === this.kpiVariances[4].getText().length - 1
        || this.kpiVariances[4].getText() === '—');
      check.push(this.kpiVariances[5].getText().indexOf('%') === this.kpiVariances[5].getText().length - 1
        || this.kpiVariances[5].getText() === '—');
    }
    return (check.every((v) => v === true));
  }

  /**
   * Verifies the Customer Engagement section in KPI Tab. Check every row and parse to get value,
   * verify each row is not empty and value is digit. Also verify two statistic data is present.
   *
   * @param range
   * // FIXME to revew the this function - improvement no return value
   */
  validateKPICustomerEngagementData(range) {
    const checkValue = (key, value) => {
      // eslint-disable-next-line no-restricted-globals
      if (value.length === 0 || isNaN(Number.parseInt(value, 10))) {
        assert(false, `Expected: KPI Customer  Engagement data format is ok, but is not. Check:
          '${key}' and '${value}' for range=${range}.`);
      }
    };

    const testData = $$('div.fn-metrics-activity-content > table:nth-of-type(1) > tbody > tr');

    let haveVideoChatSession = false;
    let haveVideoChatDuration = false;
    for (let i = 0; i < testData.length; i++) {
      const rowCol1Val = testData[i].$('th').getText();
      let rowCol2Val = testData[i].$('td').getText();

      if (rowCol2Val.includes('$')) {
        rowCol2Val = rowCol2Val.substring(rowCol2Val.indexOf('$') + 1, rowCol2Val.length);
      }

      if (rowCol1Val.includes('% Forwarded to CS (Approx.)?')) {
        rowCol2Val = rowCol2Val.substring(0, rowCol2Val.indexOf('%'));
      }

      if (rowCol1Val.includes('Email/Text Correspondence Preference ?')) {
        const email = rowCol2Val.substring(0, rowCol2Val.indexOf('%') - 1);
        const text = rowCol2Val.substring(rowCol2Val.indexOf(' / ') + 3, rowCol2Val.indexOf(' % (Text message)'));
        checkValue(rowCol1Val, email);
        checkValue(rowCol1Val, text);
      }

      if (rowCol1Val.includes('Video Chat Sessions?')) {
        haveVideoChatSession = true;
      }

      if (rowCol1Val.includes('Video Chat Duration?')) {
        haveVideoChatDuration = true;
        /* eslint no-continue: "off" */
        if (rowCol2Val.length > 0 || rowCol2Val.includes('<') || rowCol2Val.includes('>')
          || rowCol2Val.includes('m')
          || rowCol2Val.includes('h')) {
          continue;
        }
      }

      // due to the SF-28877
      if (rowCol1Val.includes('Unique Storefront Visitors') && rowCol2Val === 'N/A') {
        continue;
      }
      checkValue(rowCol1Val, rowCol2Val);
    }

    if ('saks_bash'.includes(this.RETAILER)) {
      assert(haveVideoChatSession && haveVideoChatDuration, `Expected: KPI Customer  Engagement data format is ok, but is not. Check:
        'haveVideoChatSession=${haveVideoChatSession}' and 'haveVCDuration=${haveVideoChatDuration}' for range=${range}.`);
    }
  }
}

module.exports = new ReportsPage();

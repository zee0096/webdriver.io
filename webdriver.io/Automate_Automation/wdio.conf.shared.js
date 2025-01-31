const fs = require('fs-extra');
const request = require('sync-request');
const speclib = require('./lib/speclib');

// eslint-disable-next-line prefer-const
let testRun = [];

process.env.NODE_CONFIG_DIR = speclib.nodeConfigDirsPath;
if (speclib.SF_ARGS.testRunId) {
  const options = {
    headers : {
      Authorization  : `Basic ${Buffer.from('qatest@salesfloor.net:L5N4hyk5zYnXWGsOuIhy-oiP.xTDv3LMXU3JTMo58').toString('base64')}`,
      'Content-Type' : 'application/json',
    },
  };

  const uri = `https://salesfloor.testrail.net/index.php?/api/v2/get_tests/${speclib.SF_ARGS.testRunId}`;
  let response = request('GET', uri, options);
  response = JSON.parse(response.getBody('utf8'));
  if (response.error) {
    // eslint-disable-next-line no-console
    console.log('Error get: %s', JSON.stringify(response.body));
    if (error) {
      error(response.error);
    } else {
      throw new Error(response.error);
    }
  }
  response.tests.forEach((element) => {
    testRun.push(`./test/**/*${element.case_id}*`);
  });
}

const config = ({
  suites : {

    backoffice : ['./test/storefront/requestbadgeappnt.spec.js',
      './test/backoffice/**/*.js'],
    bo_new        : ['./test/bo_new/**/*.js'],
    chat_timeout  : ['./test/chat_timeout/**/*.js'],
    footer        : ['./test/footer/**/*.js'],
    footer_sup    : ['./test/footer_suppression/**/*.js'],
    miscellaneous : ['./test/miscellaneous/**/*.js'],
    multi_lang    : ['./test/multi_lang/**/*.js'],
    ret_specific  : ['./test/retailer_specific/**/*.js'],
    salestracking : ['./test/salestracking/**/*.js'],
    sidebar       : ['./test/sidebar/**/*.js'],
    storefront    : ['./test/storefront/**/*.js'],
    livechat      : ['./test/livechat/**/*.js'],
    connect       : ['./test/connect/**/*.js'],
    reports       : ['./test/reports/**/*.js'],
    allsuites     : [
      // storefront should be the first, because will generate data for other tests
      './test/storefront/**/*.js',
      './test/backoffice/**/*.js',
      './test/footer/**/*.js',
      './test/footer_suppression/**/*.js',
      './test/miscellaneous/*.js',
      './test/multi_lang/**/*.js',
      './test/retailer_specific/**/*.js',
      './test/sidebar/**/*.js',
      './test/livechat/**/*.js',
      './test/connect/**/*.js',
    ],
    moretimeoutsuites : [
      // these suites should not work with regular timeout
      // than it is necessary increase timeout via sf_args parameter
      './test/salestracking/**/*.js',
      './test/reports/*.js'
    ],
    // backoffice suites
    bo_account        : ['./test/backoffice/account_creation_login/**/*.js'],
    bo_onboarding     : ['./test/backoffice/account_creation_login/webonboarding.spec.js'],
    bo_settings       : ['./test/backoffice/accountsettings/*.js'],
    bo_contacts       : ['./test/backoffice/contacts/*.js'],
    bo_corp_tasks     : ['./test/backoffice/corporatetasks/*.js'],
    bo_home           : ['./test/backoffice/home/*.js'],
    bo_message_center : ['./test/backoffice/messagecenter/*.js'],
    bo_new_leads      : ['./test/backoffice/newleads/*.js'],
    // dynamic test run
    testRun,

  },

  sync : true,

  // Don't stop tests after failures
  bail : 0,

  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel : 'silent',

  // Enables colors for log output.
  coloredLogs : true,

  // Saves a screenshot to a given path if a command fails.
  screenshotPath : './errorShots/',

  // Visual regression path to store screenshots.
  vrtPath : './screenshots',

  baseUrl : 'http://localhost',

  // Default request retries count
  connectionRetryCount : 3,
  defaultTestRetries   : 1,
  deprecationWarnings  : false,

  plugins : {
    'wdio-screenshot' : {},
  },

  framework : 'mocha',

  reporters : [['allure',
    {
      outputDir                            : './allure-results',
      disableWebdriverStepsReporting       : true,
      disableWebdriverScreenshotsReporting : true,
      tmsLinkTemplate                      : 'https://salesfloor.testrail.net/index.php?/cases/view/{}',
      addConsoleLogs                       : true,
    },
  ], 'spec'],

  mochaOpts : {
    ui      : 'bdd',
    timeout : speclib.SF_ARGS.timeout || 60000,
  },

  // =====
  // Hooks
  // =====

  /**
   * Function to be executed once before all workers get launched.
   */
  onPrepare() {
    const environment = speclib.ENVIRONMENT;
    const retailer = speclib.RETAILER;
    fs.ensureDir(`${this.vrtPath}/${retailer}-${environment}`);
  },

  /**
   * Function to be executed before test execution begins
   */
  // eslint-disable-next-line
  before(capabilities, specs) {
  },

  /**
   * Function to be executed before the suite starts
   */
  beforeSuite(suite) {
    // eslint-disable-next-line no-console
    console.info(`Suite started:'${suite.title}'`);
    browser.maximizeWindow();
  },

  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  // eslint-disable-next-line no-unused-vars
  beforeTest(test, context) {
    speclib.addEnvironment('server', speclib.ENVIRONMENT);
    speclib.addEnvironment('SF_ARGS', process.env.SF_ARGS || '{}');
    speclib.addRetailer(speclib.RETAILER);
  },

  /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
  // eslint-disable-next-line
  afterTest(test, context, {
    // eslint-disable-next-line no-unused-vars
    error, result, duration, passed, retries,
  }) {
    if (error) {
      speclib.addAttachment('Screenshot on fail');
    }
  },

  // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
  // beforeEach in Mocha)
  // beforeHook: function () {
  // },
  //
  // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
  // afterEach in Mocha)
  // afterHook: function () {
  // },
  // Runs before a WebdriverIO command gets executed.
  // beforeCommand: function (commandName, args) {
  // },
  //
  // Runs after a WebdriverIO command gets executed
  // afterCommand: function (commandName, args, result, error) {
  // },
  // Hook that gets executed after the suite has ended
  // afterSuite: function (suite) {
  // },
  //
  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  // after: function (result, capabilities, specs) {
  // },
  //
  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  // onComplete: function(exitCode) {
  // }
});

module.exports = config;

// eslint-disable-next-line import/no-unresolved
require('./fast-selenium'); // tyring to solve  the HTTP keep-alive connection issue
const request = require('sync-request');
const supercharge = require('@supercharge/strings');
const config = require('./wdio.conf.shared');

const speclib = require('./lib/speclib');

const jobLong = process.env.JOB_NAME;
const job = jobLong === undefined
  ? 'Ran manually via console'
  : jobLong.substring(0, jobLong.indexOf('/'));
const jobname = process.env.BUILD_NUMBER
  ? `Jenkins # ${process.env.BUILD_NUMBER}`
  : `Ran from ${process.env.LOGNAME}'s computer`;

let suiteResult = true;

config.specs = [
  './test/**/*.js',
];

config.exclude = [];

config.defaultTestRetries = 2;

config.mochaOpts.timeout = speclib.SF_ARGS.timeout || 160000;

config.capabilities = [{
  maxInstances : 1,
  browserName  : 'chrome',
  resolution   : '1280x1024',
  browserstack : {
    selenium_version : '3.6.0',
    debug            : true,
    autoWait         : 0,
    networkLogs      : true,
    console          : 'verbose',
  },
  browser_version : 'latest',
  os              : 'OS X',
  os_version      : 'Big Sur',
  project         : job,
  name            : jobname,
  build           : speclib.RETAILER,
}];

config.afterTest = function (test, context, {
  error, result, duration, passed, retries,
}) {
  if (error) {
    speclib.addAttachment('Screenshot on fail');
  }
  suiteResult = suiteResult && passed;

  let uri = `https://www.browserstack.com/automate/sessions/${browser.sessionId}.json`;
  const options = {
    headers : {
      Authorization  : `Basic ${Buffer.from(`${config.user}:${config.key}`).toString('base64')}`,
      'Content-Type' : 'application/json',
    },
  };

  let response = request('GET', uri, options);
  response = JSON.parse(response.getBody('utf8'));
  if (response.error) {
    console.log('Error get: %s', JSON.stringify(response.body));
    if (error) {
      error(response.error);
    } else {
      throw new Error(response.error);
    }
  }

  speclib.addLink(response.automation_session.public_url, speclib.ALLURE.linkType.other);

  speclib.addEnvironment('Operational System', `${response.automation_session.os} ${response.automation_session.os_version}`);
  speclib.addEnvironment('Browser', `${response.automation_session.browser} ${response.automation_session.browser_version}`);

  uri = `${speclib.getBackofficeUrl}/version.txt?`;

  response = request('GET', uri, options);

  let buffer = Buffer.from(response.body, 'utf8');

  let versionInfo = supercharge(buffer.toString()).lines();

  speclib.addEnvironment('Web branch name', versionInfo[0]);
  speclib.addEnvironment('Web deployment date', versionInfo[1]);
  speclib.addEnvironment('Web git commit', versionInfo[4]);

  uri = `${speclib.getBackofficeUrl}/preview/version.txt?`;
  response = request('GET', uri, options);
  buffer = Buffer.from(response.body, 'utf8');
  versionInfo = supercharge(buffer.toString()).lines();

  speclib.addEnvironment(
    'Mobile git commit',
    supercharge(versionInfo[4]).replace('platform', 'mobile').get()
  );
};

// Hook that gets executed after the suite has ended
config.afterSuite = function (suite, error = undefined) {
  const uri = `https://www.browserstack.com/automate/sessions/${browser.sessionId}.json`;
  const options = {
    headers : {
      Authorization  : `Basic ${Buffer.from(`${this.user}:${this.key}`).toString('base64')}`,
      'Content-Type' : 'application/json',
    },
  };
  const body = {
    status : suiteResult ? 'passed' : 'failed',
    reason : 'Rest Api status was updated from WebdriverIO config.',
  };
  options.json = body;

  let response = request('PUT', uri, options);
  response = JSON.parse(response.getBody('utf8'));
  if (response.error) {
    // eslint-disable-next-line no-console
    console.log('Error updated: %s', JSON.stringify(response.body));
    if (error) {
      error(response.error);
    } else {
      throw new Error(response.error);
    }
  }
};

config.services = ['browserstack'];
config.user = 'testautomation_aJ3lif';
config.key = 'F3mLTcpKjiQaC6zwe9s4';
config.browserstackLocal = false;

config.waitforTimeout = 1500000;
config.connectionRetryTimeout = 90000;

exports.config = config;

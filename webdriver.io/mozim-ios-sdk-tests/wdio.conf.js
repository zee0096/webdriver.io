const { PLATFORM_NAME, PLATFORM_VERSION, DEVICE_NAME } = require('./constants/constants');
const path = require('path');
const fs = require('fs');

exports.config = {
  specs: [
    './test/specs/*.js',
  ],
  exclude: [],


  path: '/wd/hub',
  port: 4723,
  capabilities: [{
    "appium:platformName": PLATFORM_NAME,
    "appium:platformVersion": PLATFORM_VERSION, // Set your iOS version
    "appium:deviceName": DEVICE_NAME, // Set your device name
    "appium:app": getAppPath(), // Dynamically get the latest .app file
    "appium:automationName": 'XCUITest',
    "appium:newCommandTimeout": 10000,
  }],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 3000000
  }
};

function getAppPath() {
  const iosAppDir = path.resolve('./apps/ios');
  const appFiles = fs.readdirSync(iosAppDir).filter(file => file.endsWith('.app'));

  if (appFiles.length === 0) {
    throw new Error('No .app files found in the apps/ios directory.');
  }

  // Get the latest .app file (assuming it's the one you want to use)
  const latestAppFile = appFiles.sort().reverse()[0];

  return path.join(iosAppDir, latestAppFile);
}

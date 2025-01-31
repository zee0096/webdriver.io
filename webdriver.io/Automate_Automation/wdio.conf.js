const config = require('./wdio.conf.shared');

config.runner = 'local';

config.specs = [
  './test/**/*.js',
];

config.exclude = [];

config.capabilities = [{
  maxInstances         : 1,
  browserName          : 'chrome',
  acceptInsecureCerts  : true,
  'goog:chromeOptions' : {
    prefs : {
      'profile.managed_default_content_settings.popups'        : 2,
      'profile.managed_default_content_settings.notifications' : 2,
    },
  },
}];

config.services = ['chromedriver'];

config.logLevel = 'error';

config.waitforTimeout = 10000;
config.connectionRetryTimeout = 120000;
config.connectionRetryCount = 3;

exports.config = config;

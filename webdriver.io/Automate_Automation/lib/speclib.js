const path = require('path');
const AllureRep = require('@wdio/allure-reporter').default;
const PageLib = require('./pagelib');
const moduleName = require('./module_name');
/**
 * SpecLib Class page
 *
 * @class
 * @classdesc used to access Allure report and standard func in config files
 * @module path
 * @module AllureRep
 * @extends PageLib
 */
class Speclib extends PageLib {
  /**
   * Edit products from Home page in different sections (top picks, new arrivals )
   * @constructor
   */
  #ALLURE_REP;

  constructor() {
    super();
    /**
     * @private
     * @property {object} allure report class
     */
    this.#ALLURE_REP = AllureRep;
    /**
     * @prop {object} ALLURE - constants specific for allure configuration
     * @prop {object} ALLURE.feature - list of possible features used at SF
     * @prop {string} ALLURE.feature.backoffice -
     * @prop {string} ALLURE.feature.frontend -
     * @prop {string} ALLURE.feature.footer -
     * @prop {String} ALLURE.feature.multiLang -
     * @prop {String} ALLURE.feature.retailerSpecific -
     * @prop {string} ALLURE.feature.salestracking -
     * @prop {string} ALLURE.feature.sidebar -
     * @prop {string} ALLURE.feature.storefront -
     * @prop {string} ALLURE.feature.chatTimeout -
     * @prop {string} ALLURE.feature.utils -
     * @prop {object} ALLURE.severity - list of possible severities used at SF
     * @prop {string} ALLURE.severity.blocker
     * @prop {string} ALLURE.severity.critical
     * @prop {string} ALLURE.severity.normal
     * @prop {string} ALLURE.severity.major - major = normal, tobe compatible with sf severity definition
     * @prop {string} ALLURE.severity.minor
     * @prop {string} ALLURE.severity.trivial
     * @prop {object} Allure.module
     * @prop {string} Allure.module.moduleName
     * @prop {object} Allure.module.module
     * @prop {string} Allure.module.module.moduleName
     * @prop {object} Allure.module.module.module
     * @prop {string} Allure.module.module.module.moduleName
     */
    this.ALLURE = {
      module   : moduleName,
      severity : {
        blocker  : 'blocker',
        critical : 'critical',
        normal   : 'normal',
        major    : 'normal',
        minor    : 'minor',
        trivial  : 'trivial',
      },
      linkType : {
        jira  : 'https://salesfloor.atlassian.net/browse/',
        other : '',
      },
    };

    this.stepCount = 0;
    this.stepCountTmp = 0;
  }

  /** @type {string} */
  get nodeConfigDirsPath() {
    return path.resolve(`./config/${this.RETAILER}`) + path.delimiter + path.resolve('./config');
  }

  /** skip describe (mocha) and all tests into it if the conditon is true
   * @param {boolean} condition
   * @returns {Function} return "describe.skip" if the condition is true or "describe" if not
   */
  descSkipIf(condition) {
    return (condition ? describe.skip : describe);
  }

  /** skip it (mocha) test if condition is true
   * @param {boolean} condition
   * @returns {Function} "it.skip" if the condition is true or "it" if not
   */
  itSkipIf(condition) {
    return (condition ? it.skip : it);
  }

  /** runs only specific test
   * @returns {Function} "it.only"
   */
  itOnly() {
    // eslint-disable-next-line no-only-tests/no-only-tests
    return it.only;
  }

  /** Allure wrapper to add environment to report
   * @param {string} envName - environment name
   * @param {string} envValue - environment value
   */
  addEnvironment(envName, envValue) {
    this.#ALLURE_REP.addEnvironment(envName, envValue);
  }

  /**
   * Allure wrapper to add steps to report
   * @param {string} title
   */
  addStep(title, addStepTextInDescription = false) {
    if (addStepTextInDescription) {
      this.#ALLURE_REP.addStep(`Step ${this.stepCount += 1} - ${title}`);
    } else {
      this.#ALLURE_REP.addStep(title);
    }
  }

  /**
   * add steps to report, numering the steps automatically
   * @param {string} title
   */
  addStepAutoNumber(title) {
    this.addStep(title, true);
  }

  /**
   * Allure wrapper to starts steps to report
   * @param {string} title
   */
  startStep(title) {
    this.#ALLURE_REP.startStep(title);
    this.stepCountTmp = this.stepCount;
    this.stepCount = 0;
  }

  /**
   * Allure wrapper to end steps to report
   * @param {string} title
   */
  endStep() {
    this.#ALLURE_REP.endStep();
    this.stepCount = this.stepCountTmp;
  }
  /**
   * Allure wrapper to starts steps to report
   * @param title {string}
   */
  startStep(title) {
    this.#ALLURE_REP.startStep(title);
  }
  /**
   * Allure wrapper to end steps to report
   * @param title {string}
   */
  endStep() {
    this.#ALLURE_REP.endStep();
  }

  /**
   * Allure wrapper to add retailer to report
   * @param {string} retailerName
   */
  addRetailer(retailerName) {
    this.#ALLURE_REP.addFeature(retailerName);
  }

  /**
   * Allure wrapper to add retailer to report
   * @param {string} moduleName
   */
  addModule(module) {
    this.#ALLURE_REP.addStory(module);
  }

  /**
   * Allure wrapper to add parameter to the report
   * @param {string} name
   * @param {string} value
   */
  addParameter(name, value) {
    this.#ALLURE_REP.addArgument(name, value);
  }

  /**
   * Allure wrapper to add description to the report
   * @param {string} name
   * @param {['text'|'html'|'markdown']} descriptionType
   */
  addDescription(name, descriptionType) {
    this.#ALLURE_REP.addDescription(name, descriptionType);
  }

  /**
   * Allure wrapper to add test ID to report
   * @param {string} testId
   */
  addTestId(testId) {
    this.#ALLURE_REP.addTestId(testId);
    this.stepCount = 0;
  }

  /**
   * Allure wrapper to add issue to report
   * @param {string} issueId
   */
  addIssue(issueId) {
    this.addLink(issueId, this.ALLURE.linkType.jira);
  }

  /**
   * AddLink uses the addIssue functionality to accept different kind of links
   * wrapper to add issue to report
   * @param {string} linkName  - ID ticket for Jira or full URL for other
   * @param {string} [linkType=this.ALLURE.linkType.jira]  - default is Jira
   */
  addLink(linkName, linkType = this.ALLURE.linkType.jira) {
    if (this.ALLURE.linkType.jira === linkType) {
      this.#ALLURE_REP.addIssue(`${this.ALLURE.linkType.jira}${linkName}`);
    } else {
      this.#ALLURE_REP.addIssue(linkName);
    }
  }

  /**
   * Allure wrapper to add severity to report
   * @param {string} severity
   */
  addSeverity(severity) {
    this.#ALLURE_REP.addSeverity(severity);
  }

  /**
   * Allure wrapper to add a screenshot to report
   * @param {string} screenshotName
   */
  addAttachment(screenshotName) {
    this.#ALLURE_REP.addAttachment(screenshotName, Buffer.from(browser.takeScreenshot(), 'base64'), 'image/png');
  }
}

module.exports = new Speclib();

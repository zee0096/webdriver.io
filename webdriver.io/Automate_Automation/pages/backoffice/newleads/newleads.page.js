const config = require('config');
const BackOfficePage = require('../../backoffice.page');

const lookupUserName = 'Reggie Repartie';
/**
 * NewLeadsPage Class page
 *
 * @class
 * @classdesc Library of Backoffice page
 * @extends BackOfficePage
 */
class NewLeadsPage extends BackOfficePage {
  /**
   *Creates an instance of NEW Back Office Page.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /** @type {string} */
  get hasNewLeads() { return config.get('bo.homeTabs.newLeads'); }

  /**  @type {cssSelectorObj} */
  get homeBanner() { return $('.icon-assistant'); }

  /**  @type {cssSelectorArr} */
  get leads() { return $$('article.fn-lead-list-item'); }

  /**  @type {cssSelectorArr} */
  get leadAcceptButtonsList() { return $$('.btn.bo-btn-type-1.fn-lead-trigger'); }

  /**  @type {cssSelectorObj} */
  get leadAcceptConfirmOKButton() { return $('div.ui-dialog-buttonset button.bo-btn-type-1'); }

  /**  @type {cssSelectorObj} */
  get leadAcceptConfirmCancelButton() { return $('div.ui-dialog-buttonset button.bo-btn-type-2'); }

  /**  @type {cssSelectorObj} */
  get leadDetailAcceptButton() { return $('.bo-btn-type-1[ng-click="confirmAcceptNewLead()"]'); }

  /**  @type {cssSelectorObj} */
  get leadDetailDismissButton() { return $('.btn.bo-btn-type-2'); }

  /**  @type {cssSelectorObj} */
  get leadDetailCustServButton() { return $('.btn.bo-btn-type-10-small-text.btn--underline-text'); }

  /**  @type {cssSelectorArr} */
  get leadDetailBlock() { return $$('div.data span.ng-binding'); }

  /**  @type {cssSelectorObj} */
  get customerRequestTab() { return $('#store_request-tab'); }

  /**  @type {cssSelectorObj} */
  get newLeadList() { return $$('article'); }

  /**  @type {cssSelectorObj} */
  get acceptBtn() { return $('div.btn-edit a'); }

  /**  @type {cssSelectorArr}
   */
  get newLeadsAcceptBtn() { return $$('a.btn.bo-btn-type-1.fn-lead-trigger'); }

  /**  @type {cssSelectorObj} */
  get okBtn() { return $('.btn.bo-btn-type-1.ui-button'); }

  /**  @type {cssSelectorObj} */
  get markResolvedBtn() { return $('*=RESOLVED'); }

  /**
   * actOnLeadInHomePage() performs accept or dismiss actions on a lead
   *
   * @param {number} index value to choose a specific lead
   * @param {string} action to perform 'accept' or 'dismiss'
   * @returns {boolean}
   */
  actOnLeadInHomePage(index, action) {
    if (this.leads.length === 0) {
      return false;
    }

    this.leadAcceptButtonsList[index].click();
    browser.pause(100);
    if (action === 'accept') {
      this.leadAcceptConfirmOKButton.waitForDisplayed();
      this.leadAcceptConfirmOKButton.click();
      this.customerRequestTab.waitForExist();
      this.customerRequestTab.waitForDisplayed();
      return (this.customerRequestTab.getText() === 'Customer Requests');
    }
    // Cancel the lead accept
    this.leadAcceptConfirmCancelButton.click();
    browser.pause(200);
    return (this.homeBanner.getText() === 'New Leads');
  }

  /**
   * actOnLeadInDetailPage() performs various actions on a lead
   *
   * @param {number} index value to choose a specific lead
   * @param {string} action to perform 'accept' or 'dismiss' or 'forward'
   * @returns {boolean}
   */
  actOnLeadInDetailPage(index, action) {
    if (this.leads.length === 0) {
      return false;
    }

    this.leads[index].$('a.new-lead').click();
    browser.pause(1000);

    if (action === 'accept') {
      this.leadDetailAcceptButton.click();
      browser.pause(200);
      this.leadAcceptConfirmOKButton.click();
      this.customerRequestTab.waitForDisplayed();
      return (this.customerRequestTab.getText() === 'Customer Requests');
      /* eslint-disable */
    } else if (action === 'dismiss') {
      this.leadDetailDismissButton.click();
      browser.pause(200);
      return (this.homeBanner.waitForDisplayed());
    }
      /* eslint-enable */
    // Forward to customer service
    this.leadDetailCustServButton.click();
    browser.pause(200);
    this.leadAcceptConfirmOKButton.click();
    return (this.homeBanner.waitForDisplayed());
  }

  /**
   * viewLeadDetails() verifies the first new lead of the specified type for the test user
   *
   * @param {string} leadType the specific lead type to verify, 'appt' for appointment requests,
   *                 'product' for Personal Shopper, and 'question' for Emails
   * @return {boolean} true if the new lead details are ok, false if they are not or there is no
   *                   requests of that type for the test user
   */
  viewLeadDetails(leadType) {
    if (this.leads.length === 0) {
      return false;
    }

    // Filter leads, by a specific user and lead type
    const specificUserLeads = this.leads.filter((elem) => {
      const currentLeadType = JSON.parse(elem.getAttribute('data-bind'));
      return (elem.$('strong').getText() === lookupUserName)
          && currentLeadType.requestType.includes(leadType);
    });

    if (specificUserLeads.length > 0) {
      // There would be a list of qualified leads but we just need to verify one.
      return (this.confirmLeadDetails(specificUserLeads[0], leadType));
    }
    return false;
  }

  /**
   * confirmLeadReqDetails() to verify if the lead has all details.
   *
   * @param {object} currentLead lead object to verify details
   * @param {string} leadType a reference for lead type
   * @return {boolean} true if all details are ok, false if not
   */
  confirmLeadDetails(currentLead, leadType) {
    currentLead.$('a.new-lead').click();
    $('h1 > a.new-lead.ng-binding').waitForDisplayed();

    const check = [];

    check.push(this.leadDetailBlock[0].getText() === lookupUserName);
    check.push(this.leadDetailBlock[1].getText() === 'qatest@salesfloor.net');
    check.push(this.leadDetailBlock[2].getText() === '+15145551212');

    if (leadType === 'appt') {
      check.push(this.leadDetailBlock[4].getText() === 'appointment');
      check.push(this.leadDetailBlock[9].getText().includes('Sidebar Appointment'));
    } else if (leadType === 'product') {
      check.push(this.leadDetailBlock[4].getText() === leadType);
      check.push(this.leadDetailBlock[9].getText().includes('Sidebar P'));
    } else if (leadType === 'question') {
      check.push(this.leadDetailBlock[4].getText() === leadType);
      check.push(this.leadDetailBlock[9].getText().includes('Sidebar Email'));
    }
    return (check.every((v) => v === true));
  }

  /**
   * findAndAcceptNewLead() find a contact and accept in new leads
   * @param {string} contactName name
   */
  findAndAcceptNewLead(contactName) {
    const listOfNewLeads = this.newLeadList;
    let elementText = '';
    listOfNewLeads.every((element) => {
      elementText = element.$('div div p').getText();
      if (elementText.includes(contactName)) {
        this.acceptBtn.click();
        this.leadAcceptConfirmOKButton.click();
        return false;
      }
      return true;
    });
  }

  /**
   * acceptNewLead() goes to new lead page and accepts the first one.
   * one is what we expected
   */
  acceptNewLead() {
    const listOfNewLeads = this.newLeadsAcceptBtn;
    listOfNewLeads[0].click();
    this.okBtn.waitForDisplayed();
    this.okBtn.click();
    this.markResolvedBtn.waitForDisplayed();
    this.markResolvedBtn.click();
  }
}

module.exports = new NewLeadsPage();

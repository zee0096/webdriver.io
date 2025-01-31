const CustomerRequestsPage = require('../../../pages/backoffice/messagecenter/customerrequests.page');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(CustomerRequestsPage.RETAILER !== 'novartis')(`${CustomerRequestsPage.RETAILER} 
  Email Me from Backoffice title verification`, () => {
  it(`C183350 As a rep I should see "Contact your Scientific Engagement Manager" 
  below the Contact me request icon on the backoffice homepage`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('183350');

    speclib.addStepAutoNumber('Open backoffice page');
    CustomerRequestsPage.openBoAndLoginByRole(CustomerRequestsPage.ROLE.rep, false);

    speclib.addStepAutoNumber('Verify Contact Me text');

    const titleSel = $('a.sf-icon-ask');
    titleSel.waitForExist();

    const textToCheck = 'CONTACT\nYOUR\nSCIENTIFIC\nENGAGEMENT\nMANAGER';

    expect(titleSel.getText()).toContain(textToCheck);
  });
});

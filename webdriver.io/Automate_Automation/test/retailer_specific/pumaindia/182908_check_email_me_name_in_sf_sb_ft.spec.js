const StorefrontPage = require('../../../pages/storefront.page');
const FooterPage = require('../../../pages/footer.page');
const SidebarPage = require('../../../pages/sidebar.page');
const EmailMe = require('../../../lib/emailme');
const speclib = require('../../../lib/speclib');

speclib.descSkipIf(StorefrontPage.RETAILER !== 'pumaindia')(`${StorefrontPage.RETAILER} 
  Email Me service name verification`, () => {
  it(`C182908 Validate that , "Contact me" service name was 
  changed to “Get Personalized Product Advice”`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addTestId('182908');

    speclib.addStepAutoNumber('Open storefront page');
    StorefrontPage.openStorefrontPage(StorefrontPage.REP_NAME);

    const textToCheck = 'Get Personalized\nProduct Advice';

    speclib.addStepAutoNumber('Verify Contact Me service name in storefront');
    expect(StorefrontPage.emailButton.getText()).toContain(textToCheck);

    speclib.addStepAutoNumber('Open footer page');
    FooterPage.openFooterPage();

    speclib.addStepAutoNumber('Verify Contact Me service name in footer');
    FooterPage.switchToFooterIframe();
    expect(FooterPage.emailMeLnk.getText()).toContain(textToCheck);

    speclib.addStepAutoNumber('Open sidebar page');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();

    speclib.addStepAutoNumber('Click on widget');
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Verify Contact Me service name in sidebar widget');
    SidebarPage.selectFindStoreFrame();
    expect(EmailMe.emailOpt.getText()).toEqual(textToCheck.replace(/\n/g, ' '));
  });
});

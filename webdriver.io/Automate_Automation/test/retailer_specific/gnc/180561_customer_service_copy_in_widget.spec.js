const SidebarPage = require('../../../pages/sidebar.page');
const speclib = require('../../../lib/speclib');
const LiveChat = require('../../../lib/livechat');
const EmailMe = require('../../../lib/emailme');
const PersonalShopper = require('../../../lib/personalshopper');
const AppointmentRequestPage = require('../../../lib/appntrequest');

speclib.descSkipIf(SidebarPage.RETAILER !== 'gnc')(`${SidebarPage.RETAILER} Check 
  Customer Service copy in Widgets`, () => {
  it(`C180561 As a customer, when I open the Landing page, The customer copy
     should be displayed on top of the service forms requests at the top`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.critical);
    speclib.addTestId('180561');

    speclib.addStepAutoNumber('Open sidebar page and click on Widget');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();
    SidebarPage.clickOnWidgetIco();

    const customerCopySel = $('section.landing-page__services p.landing-page__mention-top, .global-services__mention--is-top');
    const customerCopyTxt = 'For requests related to customer service, please click here or call 1-877-GNC-4700';

    EmailMe.selectLandingFrameIfExists();

    speclib.addStepAutoNumber('Verify Customer Service copy in Widget: Main screen');
    expect(customerCopySel.getText()).toContain(customerCopyTxt);

    speclib.addStepAutoNumber('Click Contact Me');
    EmailMe.clickOnEmailMeOpt();

    speclib.addStepAutoNumber('Verify Customer Service copy in Widget: Contact Me');
    expect(customerCopySel.getText()).toContain(customerCopyTxt);

    speclib.addStepAutoNumber('Reopen sidebar page and click on Widget');
    SidebarPage.switchToSidebarWindow();
    SidebarPage.refreshPage();
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Click Personal Shopper');
    PersonalShopper.clickOnPersonalShopperOpt();

    speclib.addStepAutoNumber('Verify Customer Service copy in Widget: Personal Shopper');
    expect(customerCopySel.getText()).toContain(customerCopyTxt);

    speclib.addStepAutoNumber('Reopen sidebar page and click on Widget');
    SidebarPage.switchToSidebarWindow();
    SidebarPage.refreshPage();
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Click Appointment Request');
    AppointmentRequestPage.clickOnApptRequestOpt();

    speclib.addStepAutoNumber('Verify Customer Service copy in Widget: Appointment Request');
    expect(customerCopySel.getText()).toContain(customerCopyTxt);

    speclib.addStepAutoNumber('Reopen sidebar page and click on Widget');
    SidebarPage.switchToSidebarWindow();
    SidebarPage.refreshPage();
    SidebarPage.clickOnWidgetIco();

    speclib.addStepAutoNumber('Click Live Chat');
    LiveChat.clickOnLiveChat();

    speclib.addStepAutoNumber('Verify Customer Service copy in Widget: Live Chat');
    expect(customerCopySel.getText()).toContain(customerCopyTxt);
  });
});

/* eslint-disable wdio/await-expect */
const SidebarPage = require('../../pages/sidebar.page');
const ChangeRepPage = require('../../pages/sidebar/changeRep.page');
const LiveChat = require('../../lib/livechat');
const FindStore = require('../../lib/findstore');
const speclib = require('../../lib/speclib');
const StorefrontPage = require('../../pages/storefront.page');
const AppointmentRequestPage = require('../../lib/appntrequest');

speclib.descSkipIf(!SidebarPage.hasSidebar)(`${SidebarPage.RETAILER} Change Rep/Store`, () => {
  speclib.itSkipIf((!SidebarPage.hasSearchAdvisorInSidebar && SidebarPage.MODE !== 'rep')
    || !SidebarPage.hasAppointmentRequest)('C84693 Select Rep pictures are ok in Appointment (through services)', () => {
    speclib.addTestId('47861');
    speclib.addTestId('84693');
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addModule(speclib.ALLURE.module.sidebar);

    FindStore.widgetWindowComingFrom = FindStore.IT_IS_COMMING_FROM.sidebar;
    speclib.addStepAutoNumber('Open Sidebar page');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();

    speclib.addStepAutoNumber('Click on widget icon');
    SidebarPage.clickOnWidgetIco();
    FindStore.switchToCarouselIframe();

    speclib.addStepAutoNumber('Click on Appnt request option');
    LiveChat.switchToServicesLandingFrameId();
    AppointmentRequestPage.clickOnApptRequestOpt();

    try {
      speclib.addStepAutoNumber('Validate Rep picture has real image in carousel');
      FindStore.switchToRepCarouselFrameId();
      expect(SidebarPage.isRealImage(ChangeRepPage.repPictures)).toBeTruthy();
    } finally {
      FindStore.backToPreviousPage();
    }
    speclib.addStepAutoNumber('Click on search associate link');
    LiveChat.clickOnSearchAnAssociateLnk();

    speclib.addStepAutoNumber('Click on shop now button');
    LiveChat.clickOnShopNowBtn();
    LiveChat.switchToRepWindow();
    speclib.addStepAutoNumber('Validate Jumbotron is displayed');
    expect(StorefrontPage.jumbotron).toBeDisplayed();
  });
});

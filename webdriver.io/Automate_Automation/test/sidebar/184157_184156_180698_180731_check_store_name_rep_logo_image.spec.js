/* eslint-disable wdio/await-expect */
const SidebarPage = require('../../pages/sidebar.page');
const ChangeRepPage = require('../../pages/sidebar/changeRep.page');
const LiveChat = require('../../lib/livechat');
const FindStore = require('../../lib/findstore');
const speclib = require('../../lib/speclib');

speclib.descSkipIf(!SidebarPage.hasSidebar)(`${SidebarPage.RETAILER} Check Store name, rep/logo image`, () => {
  it('C35726 Logo is shown in sidebar widget, not rep pictures', () => {
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addModule(speclib.ALLURE.module.sidebar);
    speclib.addTestId('184157');
    speclib.addTestId('184156');
    speclib.addTestId('180698');
    speclib.addTestId('180731');

    FindStore.widgetWindowComingFrom = FindStore.IT_IS_COMMING_FROM.sidebar;
    speclib.addStepAutoNumber('Open Sidebar page');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();

    if (SidebarPage.hasSidebarLogo) {
      speclib.addStepAutoNumber('Validate the widget logo is a real image');
      expect(SidebarPage.isRealImage(ChangeRepPage.widgetLogoCss)).toBeTruthy();

      speclib.addStepAutoNumber('Validate the sidebar log has the expected URL');
      expect(ChangeRepPage.sidebarLogoImg).toHaveElementProperty('src', SidebarPage.sidebarLogo);
    } else {
      speclib.addStepAutoNumber('Validate Main Rep photo is real image');
      expect(SidebarPage.isRealImage(ChangeRepPage.repPictures)).toBeTruthy();
    }

    speclib.addStepAutoNumber('Click on widget icon');
    SidebarPage.clickOnWidgetIco();
    FindStore.switchToCarouselIframe();

    speclib.addStepAutoNumber('Validate Rep picture is a real image');
    expect(SidebarPage.isRealImage(ChangeRepPage.repPictures)).toBeTruthy();

    if (SidebarPage.hasCheckGeo) {
      speclib.startStep('Store map is displayed/hidden in sidebar (hasCheckGeo)');
      speclib.addStepAutoNumber('Click on find store link');
      FindStore.clickOnFindStoreLnk();

      speclib.addStepAutoNumber('Click on show on map link');
      FindStore.clickOnShowOnMapLnk(0);

      speclib.addStepAutoNumber('Validate map of store is displayed');
      expect(FindStore.isRealImage(FindStore.mapStoreImageSel)).toBeTruthy();

      speclib.addStepAutoNumber('Click on hide map link');
      FindStore.clickOnHideStoreMapLnk();

      speclib.addStepAutoNumber('Validate map of store is hidden');
      expect(FindStore.mapImage.waitForDisplayed({ timeout : 1000, reverse : true })).toBeTruthy();
      speclib.endStep();

      speclib.addStepAutoNumber('Change the store name by search field');
      FindStore.changeStoreBySearchField(FindStore.changedStoreCityName);
      FindStore.switchToServicesLandingFrameId();

      if (!SidebarPage.hasNearByInsteadOfLocation) {
        speclib.addStepAutoNumber('validate if store changed the name');
        expect(FindStore.storeNameLandingPage.getText()).toBe(FindStore.changedStoreCityName);

        const city = FindStore.storeNameLandingPage.getText();

        speclib.addStepAutoNumber('Refresh/Reload page');
        FindStore.refreshPage();
        FindStore.switchToServicesLandingFrameId();

        speclib.addStepAutoNumber('Validate the store name was changed');
        expect(FindStore.storeNameLandingPage.getText()).toBe(city);
      }
      speclib.addStepAutoNumber('Click on Live Chat option');
      LiveChat.liveChatOption.click();
      FindStore.switchToServicesLandingFrameId();

      speclib.addStepAutoNumber('Validate the store name matches in chat option');
      expect(ChangeRepPage.getChatStoreCity()).toHaveTextContaining(ChangeRepPage.ChangedChatStore);
    }
  });
});

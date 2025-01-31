const SidebarPage = require('../../../pages/sidebar.page');
const speclib = require('../../../lib/speclib');
const { COLORS } = require('../../../lib/defaultconstantslib');

speclib.descSkipIf(SidebarPage.RETAILER !== 'macys')(`${SidebarPage.RETAILER} 
  Sidebar styling verification`, () => {
  it(`C183344 Verify that, sidebar widget styling and texts is updated`, () => {
    speclib.addModule(speclib.ALLURE.module.retailerSpecific);
    speclib.addSeverity(speclib.ALLURE.severity.trivial);
    speclib.addTestId('183344');

    speclib.addStepAutoNumber('Open sidebar');
    SidebarPage.openSidebarPage();
    SidebarPage.openSidebar();

    speclib.addStepAutoNumber('Verify the background color');
    const backGround = $('body');
    expect(backGround.getCSSProperty('background-color').parsed.hex.toLowerCase())
      .toEqual(COLORS.Black.hex);

    speclib.addStepAutoNumber('Verify text color and the close button color');
    expect(SidebarPage.sidebarTitle.getCSSProperty('color').parsed.hex.toLowerCase())
      .toEqual(COLORS.White.hex);
    expect(SidebarPage.closeBtn.getCSSProperty('fill').parsed.hex.toLowerCase())
      .toEqual(COLORS.White.hex);

    const textToCheck = 'Talk to a Style Expert';
    expect(SidebarPage.sidebarTitle.getText().trim()).toEqual(textToCheck);
  });
});

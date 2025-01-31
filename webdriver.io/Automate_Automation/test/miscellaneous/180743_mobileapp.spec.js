const MobileAppPage = require('../../pages/backoffice/mobileapp.page');
const speclib = require('../../lib/speclib');

describe(`${MobileAppPage.RETAILER} Mobile Apps page`, () => {
  it('C180743 Mobile app page displays correctly', () => {
    speclib.addModule(speclib.ALLURE.module.miscellaneous);
    speclib.addSeverity(speclib.ALLURE.severity.major);
    speclib.addTestId('180743');

    speclib.addStepAutoNumber('Open mobile QR code page');
    MobileAppPage.openMobilePage();

    speclib.addStepAutoNumber('Validate iOS app - QR code page');
    expect(MobileAppPage.iosDownloadButton.waitForDisplayed()).toBeTruthy();

    speclib.addStepAutoNumber('Validate Android app - QR code page');
    expect(MobileAppPage.androidDownloadButton.waitForDisplayed()).toBeTruthy();
  });
});

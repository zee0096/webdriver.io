/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const webChat = require('../../../../lib/webChat');
const speclib = require('../../../../lib/speclib');
const shoppingPage = require('../../../../pages/salestracking/shopping.page');

speclib.descSkipIf(speclib.RETAILER !== 'credobeauty')(`${speclib.RETAILER} 
Sales floor Project`, () => {
  it('C186019 Verify as a shopper I should not see the Book an appointment option in storefront', () => {
    speclib.addTestId('186019');
    speclib.addModule(speclib.ALLURE.module.storefront);
    speclib.addSeverity(speclib.ALLURE.severity.major);

    speclib.addStepAutoNumber(`Open ${speclib.RETAILER} page`);

    speclib.addStepAutoNumber(shoppingPage.getShoppingUrl);
    speclib.openWebPage(shoppingPage.getShoppingUrl);

    speclib.addStepAutoNumber('verify the storefront home page');
    expect(webChat.isChatbotDisplayed()).toBeExisting();

    speclib.addStepAutoNumber("verify 'book An Appointment' Card is not visible");
    expect(webChat.bookAnAppointmentOptions).not.toBeDisplayed();
  });
});

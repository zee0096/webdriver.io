/* eslint wdio/await-expect: 0, max-len: ['warn', { 'code': 80 }] */
const config = require('config');
const Lure = require('../../lib/lure');
const speclib = require('../../lib/speclib');

describe(`Using ${speclib.RETAILER} Project`, () => {
  it(`C152778 As a User, I can see the product recommendations after completing the ${speclib.RETAILER} quiz`, () => {
    speclib.addTestId('152778');
    speclib.addModule(speclib.ALLURE.module.automat);
    speclib.addSeverity(speclib.ALLURE.severity.blocker);

    speclib.startStep(`Open ${speclib.RETAILER} page`);
    speclib.openWebPage(config.get('clientUrl'));
    speclib.addStepAutoNumber('settings');
    // close popup button
    speclib.addStepAutoNumber('validating closePopup button');
    Lure.clickClosePopup();

    speclib.addStepAutoNumber('validating accept button');
    Lure.clickOnAcceptCookieBtn();

    speclib.addStepAutoNumber('click on Lure');
    Lure.openLure();
    const allTests = config.get(`lang.${speclib.LOCALE}`);
    allTests.forEach((test) => {
      speclib.addStepAutoNumber(`running test id ${test.testId}`);
      speclib.startStep(`testId ${test.testId}`);
      test.questions.forEach((question, index) => {
        speclib.addStepAutoNumber(`${index}-question ${index}-${question.question}`);
        speclib.addStepAutoNumber(`${index + 1}-question: ${index}-${question.question} ->answer: ${question.answer}`);
        // click on answer button
        expect(Lure.buttonWithText(question.answer)).toBeExisting();
        Lure.clickButtonWithText(question.answer);
      });

      test.recommendations.forEach((recommendation, index) => {
        speclib.addStepAutoNumber(`${index}-product ${index}-${recommendation.productName}`);
        // click on answer button
        expect(Lure.findProductElement(recommendation.productName)).toBeExisting();
      });
      speclib.endStep();
    });
    speclib.addStep('End of test');
  });
});

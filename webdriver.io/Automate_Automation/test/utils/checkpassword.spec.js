// checkpassword.spec.js

const BackOffice = require('../../pages/backoffice.page');

const BackOfficePage = new BackOffice();

describe(`${BackOfficePage.RETAILER} Password Check`, () => {
  it('C17024 Login as Rep is working', () => {
    BackOfficePage.openBoAndLoginByRole(BackOfficePage.ROLE.rep);
    expect(BackOfficePage.backOfficeProof).toBeDisplayed();
  });
});

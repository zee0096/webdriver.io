const path = require('path');
const ProfilePicturePage = require('../../../pages/backoffice/home/profilepicture.page');
const speclib = require('../../../lib/speclib');

const pathToFirstPhoto = path.resolve('./files/first_photo.png');
const pathToSecondPhoto = path.resolve('./files/second_photo.png');

speclib.descSkipIf(ProfilePicturePage.isTeamMode)(`${ProfilePicturePage.RETAILER} Change profile picture`, () => {
  it('C180961 Change profile picture', () => {
    speclib.addTestId('180961');
    speclib.addSeverity(speclib.ALLURE.severity.minor);
    speclib.addModule(speclib.ALLURE.module.accountSettings);

    speclib.addStepAutoNumber('Open BO page and log in as rep');
    ProfilePicturePage.openBoAndLoginByRole(ProfilePicturePage.ROLE.rep, false);
    speclib.addStepAutoNumber('Click edit profile button');
    ProfilePicturePage.clickEditProfilePhotoButton();
    speclib.addStepAutoNumber('Upload the first profile photo');
    ProfilePicturePage.uploadProfilePhoto(pathToFirstPhoto);
    speclib.addStepAutoNumber('Check the first image was loaded');
    expect(ProfilePicturePage.isRealImage(ProfilePicturePage.profilePhotoSelector)).toBeTruthy();
    speclib.addStepAutoNumber('Save the first profile photo url');
    const firstPhotoUrl = ProfilePicturePage.getProfilePhotoUrl();
    speclib.addStepAutoNumber('Click edit profile button');
    ProfilePicturePage.clickEditProfilePhotoButton();
    speclib.addStepAutoNumber('Upload the second profile photo');
    ProfilePicturePage.uploadProfilePhoto(pathToSecondPhoto);
    speclib.addStepAutoNumber('Check the second image was loaded');
    expect(ProfilePicturePage.isRealImage(ProfilePicturePage.profilePhotoSelector)).toBeTruthy();
    speclib.addStepAutoNumber('Save the second profile photo url');
    const secondPhotoUrl = ProfilePicturePage.getProfilePhotoUrl();
    speclib.addStepAutoNumber('Verify profile photo has changed');
    expect(firstPhotoUrl).not.toEqual(secondPhotoUrl);
  });
});

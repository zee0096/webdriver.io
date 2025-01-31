const Backoffice = require('../../backoffice.page');

/**
 * Class BoMainPage
 *
 * @class ProfilePicturePage
 * @classdesc Page to change profile picture
 * @extends BackOfficePage
 */
class ProfilePicturePage extends Backoffice {
  /** @type {cssSelectorObj} */
  get editPhotoButton() { return $('.identity-ctn  div.btn-bar a'); }

  /** @type {cssSelectorObj} */
  get imageUploadInput() { return $('input#imgProfileUpload'); }

  /** @type {cssSelectorObj} */
  get changePhotoButton() { return $('span.mention'); }

  /** @type {cssSelectorObj} */
  get confirmNewPhotoButton() { return $('a.fn-confirm-crop'); }

  /** @type {string} */
  get profilePhotoSelector() { return '.identity-ctn img'; }

  /**
   * Click edit avatar button
   */
  clickEditProfilePhotoButton() {
    this.editPhotoButton.click();
  }

  /**
   * Uploads avatar
   * @param {string} filePath
   */
  uploadProfilePhoto(filePath) {
    this.changePhotoButton.click();
    const remoteFilePath = browser.uploadFile(filePath);
    this.imageUploadInput.setValue(remoteFilePath);
    this.confirmNewPhotoButton.click();
    this.confirmNewPhotoButton.waitForDisplayed({ reverse : true });
  }

  /**
   * Returns photo url
   * @returns {string} photo url
   */
  getProfilePhotoUrl() {
    return $(this.profilePhotoSelector).getAttribute('src');
  }
}

module.exports = new ProfilePicturePage();

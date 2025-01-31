const PageLib = require('../../lib/pagelib');

/**
 * MobileAppPage Class page
 *
 * @class MobileAppPage
 * @classdesc
 * @extends PageLib
 */
class MobileAppPage extends PageLib {
  /**
   *Creates an instance of NEW Back Office Page.
   * @constructor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**  @type {cssSelectorObj} */
  get iosDownloadButton() { return $('a.js-download-link-ios'); }

  /**  @type {cssSelectorObj} */
  get androidDownloadButton() { return $('a.js-download-link-android'); }

  /**
   * openMobilePage() the /mobileapp page
   */
  openMobilePage() {
    this.openWebPage(`${this.getBackofficeUrl}/mobileapp`);
  }
}
module.exports = new MobileAppPage();

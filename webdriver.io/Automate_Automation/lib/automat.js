/* eslint-disable linebreak-style */
const config = require('config');
const PageLib = require('../lib/pagelib');

/**
 * Class General library called Page
 *
 * @class Page
 * @classdesc The Page class is the main class for all other scritps.
 * @extends PageLib
 */
class automat extends PageLib {
  /** Create a Page instance -  This is the main library of the system
   * @constructor Page
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /** return a selector string inside array
   * @type {array<string>} */
  get modal() { return config.get('Selectors.modal'); }
}

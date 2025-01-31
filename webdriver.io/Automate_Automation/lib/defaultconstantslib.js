// constant values used
/** @module defaultconstantslib
*/
/**
 * @property {Object} COLORS - Contains the internal name of default colors and it's value in rgb and in hex code
 * @property {Object} COLORS.Black - Object to deal with black color
 * @property {String} COLORS.Black.name - the internal name of item
 * @property {String} COLORS.Black.value - the value in rgb
 * @property {String} COLORS.Black.hex - the value in hex code
 * @property {Object} COLORS.White - Object to deal with white color
 * @property {String} COLORS.White.name - the internal name of item
 * @property {String} COLORS.White.value - the value in rgb
 * @property {String} COLORS.White.hex - the value in hex code
 *
 */
exports.COLORS = Object.freeze({
  Black : { name : 'Black', value : 'rgba(0,0,0,0)', hex : '#000000' },
  White : { name : 'White', value : 'rgba(255,255,255,1)', hex : '#ffffff' },
});

/** The automation is available for following languages - multi-language parameter
 * @typedef {object<string>} MULTILANGUAGES
 * @property {string} en_US='en_US'
 * @property {string} fr_CA='fr_CA'
 * @property {string} nl_NL='nl_NL'
 * @property {string} ja_JP='ja_JP'
 */
exports.MULTILANGUAGES = Object.freeze({
  en_US : 'en_US',
  fr_CA : 'fr_CA',
  nl_NL : 'nl_NL',
  ja_JP : 'ja_JP',
});

/**
 * @typedef {object<string>} BADGES
 * @property {string} email='email'
 * @property {string} ask='ask'
 * @property {string} contactus='contactus' - contactus is synonymous of ask
 * @property {string} appnt='appnt'
 * @property {string} ps='ps'
 * @property {string} registryRequest='registryRequest' - registryRequest synonymous of ps
 */
exports.BADGES = Object.freeze({
  email           : 'email',
  ask             : 'ask',
  contactus       : 'contactus',
  appnt           : 'appnt',
  ps              : 'ps',
  registryRequest : 'RegistryRequest',
});

/**
 * @typedef {object} TEST_DATA common data using across the tests
 * @property {object} TEST_DATA.request data we use during creation of different request types
 * @property {object} TEST_DATA.request.sb data we use during creation of requests from sidebar
 * @property {object} TEST_DATA.request.sf data we use during creation of requests from storefront
 * @property {object} TEST_DATA.request.ft data we use during creation of requests from footer
 * @property {object} TEST_DATA.request.sfr data we use during creation of salesfloor
 */
exports.TEST_DATA = Object.freeze({
  request : {
    sb : {
      name         : 'Reggie Repartie',
      phone        : '+15145551212',
      email        : 'qatest@salesfloor.net',
      emailMessage : 'Sidebar Email Request Test',
      appntMessage : 'Sidebar Appointment Request Test',
      psMessage    : 'Sidebar Personal Shopper Request Test',
    },
    sf : {
      name         : 'Reggie Repartie',
      phone        : '+15145551212',
      email        : 'qatest@salesfloor.net',
      emailMessage : 'Storefront Email Request Test',
      appntMessage : 'Storefront Appointment Request Test',
      psMessage    : 'Storefront Personal Shopper Request Test',
    },
    ft : {
      name         : 'Reggie Repartie',
      phone        : '+15145551212',
      email        : 'qatest@salesfloor.net',
      emailMessage : 'Footer Email Request Test',
      appntMessage : 'Footer Appointment Request Test',
      psMessage    : 'Footer Personal Shopper Request Test',
    },
    sfr : {
      randomData        : 'testing',
      name              : 'Ambreen',
      phone             : '+15145551212',
      invalidPhone      : '+',
      email             : 'ambreen@getnada.com',
      invalidEmail      : 'amb',
      postalCode        : 'L5M',
      invalidPostalCode : 'L00',
      specialCharacter  : '!@#$%^&',
      alphabet          : 'asdfghj',
    },
  },
});

/** Status
* @typedef {object} ON_OFF_SWITCH
* @property {object} ON_OFF_SWITCH.OFF
* @property {string} ON_OFF_SWITCH.OFF.name='Off'
* @property {number} ON_OFF_SWITCH.OFF.value=0
* @property {object} ON_OFF_SWITCH.ON
* @property {string} ON_OFF_SWITCH.ON.name='On'
* @property {number} ON_OFF_SWITCH.ON.value=1
*/
exports.ON_OFF_SWITCH = Object.freeze({
  off : { name : 'Off', value : 0 },
  on  : { name : 'On', value : 1 },
});

/**
 * @typedef {object} CREDENTIAL credential data for Storefront
 * @property {string} email.auth='email'
 * @property {string} password='password'
 */
exports.CREDENTIAL = Object.freeze({
  request : {
    auth : {
      email    : 'test_selling_store_mgr0',
      password : '123123Aa',
    }
  }
});


exports.unused = {};

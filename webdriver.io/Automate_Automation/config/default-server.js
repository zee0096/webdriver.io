/*
* this file was created for documentation propose
* usually, all variables should be personalized with data of retailer but
* we can know what variables are avaibable in config-stg environment
* and identify each field when it is possible
*/
/** default-stg config file
 * @module config/default-server
 */

const repName = 'test_rep1';

module.exports = {
  // eslint-disable-next-line max-len
  /** @property {String} changedStoreCity='' - Based on geo_id, the store chosen in sidebar landing page */
  changedStoreCity  : '',
  /** @property {String} changedChatStore='' - Default store populated when chosen chat service */
  changedChatStore  : '',
  /** @property {String} geo_ip='' - ip address of storeCity ex 192.169.1.1 */
  geo_ip            : '',
  /** @property {String} repName */
  repName,
  /** @property {String} sfHTMLTitle_en_US */
  sfHTMLTitle_en_US : '',
  /** @property {String} store  - store name displayed on URL and rep store title */
  store             : '',

  /**
   * @property {object[]} cookies
   * @property {String} cookies.name cookie name Ex. stg_cotr_sf_wdt_tracking
   * @property {String} cookies.value
   * @property {(Number|'Session')} cookies.expiration
   */
  cookies : [
    // expiration date available in configs folder of platform system
    // search by retailer.sale_cookie_expire (calculate in ms)
    // works for both cookies ..._sf_wdt_tracking and ..._sf_wdt_tracking_rep

    // IMPORTANT
    // these next 3 lines should be unconmented and updated with retailer's information
    /*
    { name : 'stg_cotr_sf_wdt_tracking', value : 'true', expiration : 5 },
    { name : 'stg_cotr_sf_wdt_tracking_rep', value : repName, expiration : 5 },
    { name : 'stg_cotr_sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
    */
  ],
};

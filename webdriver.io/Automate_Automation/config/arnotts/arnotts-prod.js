/**
 * Created by sukhpreet on 08/05/2020.
 */
const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'New York',
  changedChatStore : 'New York - Nolita',
  geo_ip           : '62.9.255.255',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 2 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 2 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName       : 'en_US',
      shoppingUrl    : 'https://widgets.mystore.arnotts.ie/tests/desktop',
      sidebarUrl     : 'http://widgets.mystore.arnotts.ie/tests/desktop',
      backOfficeUrl  : 'https://mystore.arnotts.ie',
      productPageUrl : 'https://arnotts.ie',
    },
  },
};

/**
 * Created by agultsov on 11/08/21.
 */
const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'DOUBLE BAY',
  changedChatStore : 'DOUBLE BAY - Double Bay',
  geo_ip           : '54.153.255.127',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 2 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 2 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://widgets.merchants.danmurphys.com.au/tests/desktop',
      sidebarUrl    : 'http://widgets.merchants.danmurphys.com.au/tests/desktop',
      backOfficeUrl : 'https://merchants.danmurphys.com.au',
    },
  },
};

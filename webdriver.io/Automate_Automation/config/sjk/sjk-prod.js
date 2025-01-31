/**
 * Created by agultsov on 11/02/20.
 */
const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'New York',
  changedChatStore : 'New York - Nolita',
  geo_ip           : '72.229.28.185', // changed to NY ip
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 2 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 2 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://widgets.styledby.stjohnknits.com/tests/desktop',
      sidebarUrl    : 'http://widgets.styledby.stjohnknits.com/tests/desktop',
      backOfficeUrl : 'https://styledby.stjohnknits.com',
    },
  },
};

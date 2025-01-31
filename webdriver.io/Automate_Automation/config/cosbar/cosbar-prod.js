/**
 * Created by agultsov on 10/01/20.
 */
const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'New York',
  changedChatStore : 'New York - Cos Bar Brookfield Place',
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
      shoppingUrl   : 'https://widgets.connect.cosbar.com/tests/desktop',
      sidebarUrl    : 'http://widgets.connect.cosbar.com/tests/desktop',
      backOfficeUrl : 'https://connect.cosbar.com',

    },
  },
};

const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'New York',
  changedChatStore : 'New York - Phony Shops',
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
      shoppingUrl   : 'https://widgets.mystore.buckle.com/tests/desktop',
      sidebarUrl    : 'http://widgets.mystore.buckle.com/tests/desktop',
      backOfficeUrl : 'https://mystore.buckle.com',

    },
  },
};

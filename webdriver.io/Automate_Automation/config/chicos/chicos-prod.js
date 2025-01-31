const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'Estero',
  changedChatStore : 'Estero - Coconut Point',
  geo_ip           : '72.229.28.185',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 2 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 2 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://widgets.mystore.chicos.com/tests/desktop',
      sidebarUrl    : 'http://widgets.mystore.chicos.com/tests/desktop',
      backOfficeUrl : 'https://mystore.chicos.com',
    },
  },
};

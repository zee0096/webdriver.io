const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'Miami Dade',
  changedChatStore : 'Miami Dade Stores',
  geo_ip           : '131.91.4.40',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 30 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 30 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName       : 'en_US',
      shoppingUrl    : 'https://widgets.mystore.relaxtheback.com/tests/desktop',
      sidebarUrl     : 'http://widgets.mystore.relaxtheback.com/tests/desktop',
      backOfficeUrl  : 'https://mystore.relaxtheback.com',
      productPageUrl : 'https://relaxtheback.com',
    },
  },
};

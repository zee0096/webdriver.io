const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'Skokie',
  changedChatStore : 'Online Shop', // for now for bloom
  geo_ip           : '23.82.85.65',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 1 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 1 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://widgets.stores-bloomingdales.com/tests/desktop',
      sidebarUrl    : 'http://widgets.stores-bloomingdales.com/tests/desktop',
      backOfficeUrl : 'https://stores-bloomingdales.com',
    },
  },
};

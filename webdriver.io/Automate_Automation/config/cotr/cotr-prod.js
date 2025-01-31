const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'Estero',
  changedChatStore : 'Estero - Miromar Outlets',
  geo_ip           : '70.88.35.2',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 2 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 2 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://widgets.mystore.chicosofftherack.com/tests/desktop',
      sidebarUrl    : 'http://widgets.mystore.chicosofftherack.com/tests/desktop',
      backOfficeUrl : 'https://mystore.chicosofftherack.com',

    },
  },
};

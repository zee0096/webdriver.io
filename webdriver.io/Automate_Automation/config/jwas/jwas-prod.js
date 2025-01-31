const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'New York',
  changedChatStore : 'New York - COLUMBUS AVENUE',
  geo_ip           : '17.17.96.210',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 14 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 14 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://www.johnnywas.com/',
      sidebarUrl    : 'http://www.johnnywas.com',
      backOfficeUrl : 'https://storejohnnywas.com',
    },
  },
};

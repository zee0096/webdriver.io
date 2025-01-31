const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'Hyderabad',
  changedChatStore : 'Hyderabad - Banjara',
  geo_ip           : '103.48.198.141',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 2 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 2 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_IN : {
      langName       : 'en_IN',
      shoppingUrl    : 'https://widgets.retailstores.in.puma.com/tests/desktop',
      sidebarUrl     : 'http://widgets.retailstores.in.puma.com/tests/desktop',
      backOfficeUrl  : 'https://retailstores.in.puma.com',
      productPageUrl : 'https://in.puma.com/',
    },
  },
};

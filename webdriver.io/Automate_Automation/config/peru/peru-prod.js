const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'CHICAGO',
  changedChatStore : 'CHICAGO - Chicago',
  geo_ip           : '63.141.227.26',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 14 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 14 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://www.peruvianconnection.com/home.do&sf_ip=62.141.227.26', // trying to fix Access Denied
      sidebarUrl    : 'http://www.peruvianconnection.com/home.do',
      backOfficeUrl : 'https://stores.peruvianconnection.com',
      sf            : {
        htmlTitle : 'Shop with Testy Rep1 Tester Rep1 - Peruvian Connection',
      },
    },
  },
};

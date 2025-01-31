const repName = 'salesfloor_test_rep1';
const storeID = '0624';

module.exports = {
  changedStoreCity : 'Palm Beach',
  changedChatStore : 'Palm Beach',
  geo_ip           : '76.109.114.123',
  repName,
  storeID,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 14 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 14 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://widgets.stores.saksfifthavenue.com/tests/desktop',
      sidebarUrl    : 'http://widgets.stores.saks.com/tests/desktop',
      backOfficeUrl : 'https://stores.saks.com',
      sf            : {
        searchTrackingUrl : 'https://www.saksfifthavenue.com/search?search-button=&lang=en_US&q=shirt'
          + '&sf_rep=#REP_NAME&sf_storeid=#STORE_ID&sf_associd=90000002&site_refer=salesfloor&sf_source_origin=storefront',
      },
    },
  },
};

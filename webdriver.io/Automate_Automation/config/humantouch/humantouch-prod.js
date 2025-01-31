/**
 * Created by agultsov on 04/09/21.
 */
const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'New York',
  changedChatStore : 'New York - Nolita',
  geo_ip           : '72.229.28.185',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 2 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 2 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName       : 'en_US',
      shoppingUrl    : 'https://widgets.shop.humantouch.com/tests/desktop',
      sidebarUrl     : 'http://widgets.shop.humantouch.com/tests/desktop',
      backOfficeUrl  : 'https://shop.humantouch.com',
      productPageUrl : 'https://humantouch.com',
    },
  },
};

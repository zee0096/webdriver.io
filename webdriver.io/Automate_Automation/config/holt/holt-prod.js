/**
 * Created by agultsov on 03/09/20.
 */
const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'Calgary',
  changedChatStore : 'Calgary',
  geo_ip           : '164.166.179.68',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 7 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 7 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://widgets.associates.holtrenfrew.com/tests/desktop',
      sidebarUrl    : 'http://widgets.associates.holtrenfrew.com/tests/desktop',
      backOfficeUrl : 'https://associates.holtrenfrew.com',
    },
  },
};

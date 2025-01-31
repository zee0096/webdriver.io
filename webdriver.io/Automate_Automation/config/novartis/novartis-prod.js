/**
 * Created by agultsov on 10/28/21.
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
      langName      : 'en_US',
      shoppingUrl   : 'https://widgets.connect.novartis.ca/tests/desktop',
      sidebarUrl    : 'http://widgets.connect.novartis.ca/tests/desktop',
      backOfficeUrl : 'https://connect.novartis.ca',
    },
    fr_CA : {
      langName      : 'fr_CA',
      shoppingUrl   : 'https://widgets.connect.novartis.ca/tests/desktop',
      sidebarUrl    : 'http://widgets.connect.novartis.ca/tests/desktop',
      backOfficeUrl : 'https://connect.novartis.ca',
    },
  },
};

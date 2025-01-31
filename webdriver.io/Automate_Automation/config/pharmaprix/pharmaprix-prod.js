/**
 * Created by agultsov on 07/14/21.
 */
const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'Montreal',
  changedChatStore : 'MONTREAL - PLACE VILLE MARIE',
  geo_ip           : '70.82.55.20',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 1 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 1 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://widgets.services.pharmaprix.ca/tests/desktop',
      sidebarUrl    : 'http://widgets.services.pharmaprix.ca/tests/desktop',
      backOfficeUrl : 'https://services.pharmaprix.ca',
    },
  },
};

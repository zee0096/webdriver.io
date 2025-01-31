/**
 * Created by agultsov on 05/19/22.
 */
const repName = 'salesfloor_test_rep1';

module.exports = {
  SidebarUrl       : 'widgets.credolive.credobeauty.com/tests/desktop',
  geo_ip           : '68.43.102.190',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 2 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 2 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://widgets.credolive.credobeauty.com/tests/desktop',
      sidebarUrl    : 'http://widgets.credolive.credobeauty.com/tests/desktop',
      backOfficeUrl : 'https://credolive.credobeauty.com',
    },
  },
};

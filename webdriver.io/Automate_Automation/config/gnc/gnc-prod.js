/**
 * Created by agultsov on 12/21/21.
 */
const storeID = '1004';

module.exports = {
  storeAPIValue    : storeID,
  BackOfficeUrl    : 'coaches.gnc.com',
  changedStoreCity : 'New York',
  changedChatStore : 'New York - 130 EAST 57TH STREET',
  geo_ip           : '104.162.115.168',
  repName          : 'gateway-center-in-brooklyn',
  store            : 'Gateway Center In Brooklyn',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 30 },
    { name : 'sf_wdt_tracking_store', value : storeID, expiration : 30 },
    { name : 'sf_wdt_footer_store_session', value : storeID, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://widgets.coaches.gnc.com/tests/desktop',
      sidebarUrl    : 'http://widgets.coaches.gnc.com/tests/desktop',
      backOfficeUrl : 'https://coaches.gnc.com',
      sf            : {
        htmlTitle : 'Shop with Gateway Center In Brooklyn - GNC',
      },
    },
  },
};

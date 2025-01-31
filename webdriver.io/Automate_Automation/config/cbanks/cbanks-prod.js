/**
 * Created by agultsov on 05/23/22.
 */
const storeID = 'team-east';

module.exports = {
  storeID,
  storeAPIValue    : storeID,
  BackOfficeUrl    : 'style.christopherandbanks.com',
  changedStoreCity : 'Manhattan',
  changedChatStore : 'Manhattan - 7th Avenue',
  geo_ip           : '104.162.115.168',
  repName          : 'team-east',
  store            : 'Team East',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 30 },
    { name : 'sf_wdt_tracking_store', value : storeID, expiration : 30 },
    { name : 'sf_wdt_footer_store_session', value : storeID, expiration : 'Session' },
  ],
  lang : {
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : 'https://widgets.style.christopherandbanks.com/tests/desktop',
      sidebarUrl    : 'http://widgets.style.christopherandbanks.com/tests/desktop',
      backOfficeUrl : 'https://style.christopherandbanks.com',
      sf            : {
        htmlTitle : 'Shop with Team East - Christopher & Banks',
      },
    },
  },
};

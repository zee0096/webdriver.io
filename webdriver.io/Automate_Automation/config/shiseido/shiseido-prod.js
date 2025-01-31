/**
 * Created by agultsov on 10/19/21.
 */
const storeID = '10003130';

module.exports = {
  storeAPIValue    : storeID,
  changedStoreCity : 'Atlanta, GA',
  changedChatStore : 'Atlanta - Phipps Plaza',
  geo_ip           : '114.166.27.192',
  repName          : 'store-102013',
  store            : 'たなべ化粧品店',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 30 },
    { name : 'sf_wdt_tracking_store', value : storeID, expiration : 30 },
    { name : 'sf_wdt_footer_store_session', value : storeID, expiration : 'Session' },
  ],
  lang : {
    ja_JP : {
      langName      : 'ja_JP',
      shoppingUrl   : 'https://widgets.omiseplus.shiseido.co.jp/tests/desktop',
      sidebarUrl    : 'http://widgets.omiseplus.shiseido.co.jp/tests/desktop',
      backOfficeUrl : 'https://omiseplus.shiseido.co.jp',
      sf            : {
        htmlTitle : 'Omise+ supported by SHISEIDO// たなべ化粧品店',
      },
    },
  },
};

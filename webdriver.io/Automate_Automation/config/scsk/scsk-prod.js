const repName = 'salesfloor_test_rep1';

module.exports = {
  changedStoreCity : 'New York',
  changedChatStore : 'New York - Phony Shops',
  geo_ip           : '70.82.55.20',
  repName,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 2 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 2 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  lang : {
    ja_JP : {
      langName      : 'ja_JP',
      shoppingUrl   : 'https://widgets.staff.f-ace.jp/tests/desktop',
      sidebarUrl    : 'http://widgets.staff.f-ace.jp/tests/desktop',
      backOfficeUrl : 'https://staff.f-ace.jp',
    },
  },
};

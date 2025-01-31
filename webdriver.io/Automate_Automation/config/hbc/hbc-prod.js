const repName = 'salesfloor_test_rep1';
const storeID = '1014';

module.exports = {
  lang : {
    fr_CA : {
      langName      : 'fr_CA',
      backOfficeUrl : 'https://stores.thebay.com',
      shoppingUrl   : 'https://widgets.stores.thebay.com/tests/desktop',
      sidebarUrl    : 'https://widgets.stores.thebay.com/tests/desktop',
      sf            : {
        searchTrackingUrl : 'https://www.labaie.com/search?search-button=&lang=fr_CA&q=shirt'
          + '&sf_rep=#REP_NAME&sf_storeid=#STORE_ID&sf_associd=90000002&site_refer=salesfloor&sf_source_origin=storefront',
        page404 : {
          menuValidation : ['MARQUES', 'FEMME', 'CHAUSSURES', 'SACS', 'ACCESSOIRES', 'BEAUTÉ', 'HOMME', 'ENFANT', 'JOUETS', 'MAISON', 'HBC', 'PLUS', 'L\'AUTOMNE 50', 'ÉTÉ', 'SOLDES'],
        },
      },
    },
    en_US : {
      langName      : 'en_US',
      backOfficeUrl : 'https://stores.thebay.com',
      shoppingUrl   : 'https://widgets.stores.thebay.com/tests/desktop',
      sidebarUrl    : 'https://widgets.stores.thebay.com/tests/desktop', // 'www.thebay.com'
      sf            : {
        searchTrackingUrl : 'https://www.thebay.com/search?search-button=&lang=en_CA&q=shirt'
          + '&sf_rep=#REP_NAME&sf_storeid=#STORE_ID&sf_associd=90000002&site_refer=salesfloor&sf_source_origin=storefront',
        footerContent : ['ORDER SUPPORT', 'SHOPPING OUR SITE', 'ABOUT US', 'SERVICES'],
        page404       : {
          menuValidation : ['BRANDS', 'WOMEN', 'SHOES', 'HANDBAGS', 'ACCESSORIES', 'BEAUTY', 'MEN', 'KIDS & BABY', 'TOYS', 'HOME', 'HBC STRIPES', 'SALE'],
        },
      },
    },
  },

  changedStoreCity : 'Calgary, AB',
  changedChatStore : 'Calgary - Sunridge',
  geo_ip           : '164.166.179.68',
  repName,
  storeID,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 7 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 7 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
};

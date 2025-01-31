const repName = 'test_rep1';

module.exports = {
  changedStoreCity : 'Laval',
  changedChatStore : 'Laval - Imaginary Center',
  geo_ip           : '70.82.55.20',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 7 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 7 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  socialShop      : true,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/brownt/brownt-logo.png',
  hasAssets       : false,

  sf : {
    menuItems      : '',
    updatesLink    : 'a[data-modal-open="inscriptionModal"]',
    trProductCount : 8,
    page404        : {
      productPageLink : '#navigation  ul.menu-category.level-1',
    },
  },

  bo : {
    onboarding : {
      specialties    : true,
      socialNetworks : ['twitter'],
    },
    product : {
      tpProductCount : 8,
      naProductCount : 4,
    },
    newContactPhoneNumberStartsWith : '+35385012',
  },

  widget : {
    liveChat : {
      hasSpecialityDrp : true,
    },
    appRequest : {
      appntType : {
        hasInStore : false,
      },
    },
  },

  lang : {
    en_US : {
      currency : '€',
      sf       : {
        searchTrackingUrl : 'https://www.brownthomas.com/search/?q=shirt&sf_rep=#REP_NAME&sf_source_origin=storefront',
        htmlTitle         : 'Shop with Testy Rep0 Tester Rep0 - Brown Thomas',
        page404           : {
          menuValidation : ['NEW IN', 'BEAUTY', 'WOMEN', 'MEN', 'CHILDREN', 'LIVING', 'CHRISTMAS', 'GIFTS', 'SALE', 'BRANDS', 'BT MAGAZINE', 'WHAT\'S ON'],
        },
      },
    },
  },
};

const repName = 'test_rep1';

module.exports = {
  changedStoreCity : 'Laval',
  changedChatStore : 'Laval - Imaginary Center',
  geo_ip           : '70.82.55.20',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 2 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 2 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  sms             : true,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/cotr/cotr-logo.png',

  sf : {
    menuItems      : 'body > div.js-storefront.main-body > header > div > nav > ul > li',
    updatesLink    : 'a[data-modal-open="inscriptionModal"]',
    trProductCount : 4,
    page404        : {
      productPageLink : 'li.dropdown[role="menuitem"]',
      footerLinks     : 'div.storefront-footer__title',
    },
    articles : {
      prdDescCss : 'h1.product__title',
    },
    mainPage : {
      posts : false,
    },
  },

  lp : {
    logoRetailerURL : 'https://res.cloudinary.com/salesfloor-net/image/upload/v1588779420/cotr/sidebar.png',
  },

  bo : {
    onboarding : {
      vanityURL : true,
    },
    product : {
      tpProductCount : 8,
      naProductCount : 4,
    },
  },

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://www.chicosofftherack.com/store/search/?emptySearch=true&searchTerms=shirt'
          + '&sf_rep=#REP_NAME&sf_source_origin=storefront&page=1',
        htmlTitle     : 'Shop with Testy Rep0 Tester Rep0 - Chico\'s Off The Rack',
        footerContent : ['MORE WAYS TO SHOP', 'SUPPORT', 'ABOUT CHICOS', 'FOLLOW US ON FACEBOOK'],
        page404       : {
          menuValidation : ['NEW ARRIVALS', 'HOLIDAY SHOP', 'CLOTHING', 'COLLECTIONS', 'ACCESSORIES', 'GLAM GOOD DEALS', 'SALE'],
        },
      },
    },
  },
};

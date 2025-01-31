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
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/soma/soma-logo.png',

  sf : {
    updatesLink    : 'a[data-modal-open="inscriptionModal"]',
    trProductCount : 4,
    page404        : {
      footerLinks     : 'li.storefront-footer__navigation-list__item',
      productPageLink : 'a#logo',
    },
    articles : {
      prdDescCss : 'h1.product__title',
    },
    mainPage : {
      posts : false,
    },
  },

  lp : {
    logoRetailerURL : 'https://res.cloudinary.com/salesfloor-net/image/upload/v1588779420/soma/sidebar.png',

  },

  bo : {
    onboarding : {
      vanityURL : true,
    },
    product : {
      tpProductCount : 8,
      naProductCount : 8,
    },
  },

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://www.soma.com/store/search/?searchTerms=shirt'
          + '&sf_rep=#REP_NAME&sf_source_origin=storefront&page=1',
        htmlTitle : 'Shop with Testy Rep0 Tester Rep0 - Soma',
        page404   : {
          menuValidation : ['BRAS', 'PANTIES', 'SLEEP', 'APPAREL & DRESSES', 'SWIM', 'COLLECTIONS', 'Valentine\'s', 'SALE'],
        },
      },
    },
  },
};

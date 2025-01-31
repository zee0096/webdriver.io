const repName = 'test_rep1';

module.exports = {
  changedStoreCity : 'Montreal',
  changedChatStore : 'Montreal - Fake Mall',
  geo_ip           : '70.82.55.20',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 5 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 5 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  sms             : true,
  share           : false,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/chicos/chicos-logo.png',

  sf : {
    menuItems      : 'nav.storefront-header__navigation.navigation.js-storefront-navigation > ul > li.navigation__list__item > a.navigation__link',
    updatesLink    : 'a.jumbotron__inscription-ctn__update.js-service-link',
    trProductCount : 4,
    page404        : {
      productPageLink : 'a.top-nav-cat',
      footerLinks     : 'div.storefront-footer__section.storefront-footer__section--has-accordion.large-6.xlarge-6',
    },
    articles : {
      prdDescCss : 'h1.product__title',
    },
    mainPage : {
      posts : false,
    },
  },

  lp : {
    logoRetailerURL : 'https://res.cloudinary.com/salesfloor-net/image/upload/v1588779420/chicos/sidebar.png',
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
        searchTrackingUrl : 'https://www.chicos.com/store/search/?emptySearch=true&searchTerms=shirt'
          + '&sf_rep=#REP_NAME&sf_source_origin=storefront&page=1',
        htmlTitle     : 'Shop with Testy Rep0 Tester Rep0 - Chico\'s',
        footerContent : ['MORE WAYS TO SHOP', 'SUPPORT', 'ABOUT CHICOS'],
        page404       : {
          menuValidation : ['NEW ARRIVALS', 'GET THE LOOK', 'CLOTHING', 'JEWELRY', 'ACCESSORIES', 'COLLECTIONS', 'PETITES', 'SALE'],
        },
      },
    },
  },
};

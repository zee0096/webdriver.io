const repName = 'test_rep1';

module.exports = {
  changedStoreCity : 'Laval',
  changedChatStore : 'Laval - Imaginary Center',
  geo_ip           : '70.82.55.20',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 5 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 5 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  sms             : true,
  share           : false,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/whbm/whbm-logo.png',

  sf : {
    menuItems      : 'nav.storefront-header__navigation.navigation.js-storefront-navigation > ul > li.navigation__list__item > a.navigation__link',
    updatesLink    : 'a.jumbotron__inscription-ctn__update.js-service-link',
    trProductCount : 4,
    page404        : {
      footerLinks     : 'div.storefront-footer__section.storefront-footer__section--has-accordion.large-6.xlarge-6',
      productPageLink : 'a.top-nav-cat',
    },
    articles : {
      prdDescCss : 'h1.product__title',
    },
    mainPage : {
      posts : false,
    },

  },

  lp : {
    dotChatWidget   : false,
    logoRetailerURL : 'https://res.cloudinary.com/salesfloor-net/image/upload/v1588779420/whbm/sidebar.png',

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
        searchTrackingUrl : 'https://www.whitehouseblackmarket.com/store/search/?emptySearch=true&searchTerms=shirt'
          + '&sf_rep=#REP_NAME&sf_source_origin=storefront&page=1',
        htmlTitle     : 'Shop with Testy Rep0 Tester Rep0 - White House Black Market',
        footerContent : ['MORE WAYS TO SHOP', 'SUPPORT', 'ABOUT US'],
        page404       : {
          menuValidation : ['NEW ARRIVALS', 'CLOTHING', 'DRESSES', 'SHOES & ACCESSORIES', 'WORK', 'FALL EDIT', 'PETITES', 'SALE'],
        },
      },
    },
  },
};

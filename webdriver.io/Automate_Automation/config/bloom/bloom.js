const repName = 'test_rep1';
module.exports = {
  changedStoreCity : 'Montreal',
  changedChatStore : 'Montreal - Fake Mall',
  geo_ip           : '70.82.55.20',
  logoRetailerURL  : 'https://bloom-qa05.salesfloor.net/img/retailers/bloom/bloom_t.png',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 1 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 1 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  socialShop   : true,
  tracking     : 'localstorage',
  hasPhoneInPS : false,

  sf : {
    menuItems   : 'nav li.navigation__list__item:not(.navigation__list__item--is-mobile)',
    updatesLink : 'a.jumbotron__social-list__link.js-service-link',
    onboarding  : {
      footerLinks          : '.storefront-footer__navigation-list__title',
      productPageLink      : '#header-category-rail-fob-2910',
      menuValidation_en_US : ['WOMEN', 'SHOES', 'HANDBAGS', 'JEWELRY & ACCESSORIES', 'BEAUTY', 'MEN', 'KIDS', 'HOME', 'SALE', 'DESIGNERS', 'EDITORIAL', 'GIFTS', 'THE REGISTRY'],
    },
    page404 : {
      productPageLink : '#wglHeaderResponsive',
      link404         : 'a.errors__link',
    },
    mainPage : {
      events : true,
      posts  : false,
    },
  },

  lp : {
    hasCheckGeo            : false,
    hasAppointmentRequest  : false,
    searchAdvisorInSidebar : false,
    personalShopper        : false,
  },

  bo : {
    onboarding : {
      specialties : true,
    },
    roles : {
      createUserRoles : ['admin', 'corp_admin'],
    },
    product : {
      naProductCount    : 4,
      tpProductTitleSel : 'section:not([data-library="deals"],.identity-ctn, .recommendations-panel) article h2.product-item__content__title',
    },
  },

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://www.bloomingdales.com/shop/search?keyword=shirt&sf_rep=#REP_NAME&sf_source_origin=storefront',
        htmlTitle         : 'Shop with Testy Rep0 Tester Rep0 - Bloomingdale\'s',
        footerContent     : ['CUSTOMER SERVICE', 'MY ACCOUNT', 'ABOUT BLOOMINGDALE\'S', 'SHOPPING SERVICES'],
        page404           : {
          menuValidation : ['WOMEN', 'SHOES', 'HANDBAGS', 'JEWELRY & ACCESSORIES', 'BEAUTY', 'MEN', 'KIDS', 'HOME', 'SALE', 'DESIGNERS', 'EDITORIAL', 'GIFTS'],
        },
      },
    },
  },
};

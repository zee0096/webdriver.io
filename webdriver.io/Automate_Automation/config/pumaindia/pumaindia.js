const environment = process.env.NODE_APP_INSTANCE;
const retailer = process.env.NODE_ENV;
const repName = 'test_rep1';

module.exports = {
  changedStoreCity : 'Montreal',
  changedChatStore : 'Montreal - Fake Mall',
  geo_ip           : '167.114.209.19',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 5 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 5 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  personalShopper : false,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/pumaindia/pumaindia-logo.png',
  hasAssets       : false,
  widget          : {
    appRequest : {
      appntType : {
        hasLiveChat : false,
        hasVirtual  : true,
      },
    },
  },
  sf : {
    menuItems   : 'ul > li.navigation__list__item > a.navigation__link',
    updatesLink : '',
    page404     : {
      productPageLink : '#mobileMenu li',
      footerLinks     : '.storefront-footer__navigation a',
    },
    articles : {
      prdDescCss : 'h1.product__title',
    },
  },

  lp : {
    personalShopper : false,
  },

  bo : {
    onboarding : {
      importContacts : true,
      socialNetworks : ['twitter'],
    },
    product : {
      tpProductCount : 8,
      naProductCount : 4,
    },
  },

  languages : ['en_IN'],
  lang      : {
    en_IN : {
      langName      : 'en_IN',
      currency      : '₹',
      shoppingUrl   : `https://${retailer}-widgets-${environment}.salesfloor.net/tests/desktop`,
      sidebarUrl    : `http://${retailer}-widgets-${environment}.salesfloor.net/tests/desktop`,
      backOfficeUrl : `https://${retailer}-${environment}.salesfloor.net`,
      sf            : {
        searchTrackingUrl : 'https://in.puma.com/in/en/search?q=shirt&sf_rep=#REP_NAME&sf_source_origin=storefront',
        htmlTitle         : 'Shop with Testy Rep0 Tester Rep0 - Puma India',
        availableRepText  : 'Available',
      },
    },
  },

  ft : {
    hasPersonalShopper : false,
  },
};

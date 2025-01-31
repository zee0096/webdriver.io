const repName = 'test_rep1';

module.exports = {
  changedStoreCity : 'Montreal',
  changedChatStore : 'Montreal - Fake Mall',
  geo_ip           : '70.82.55.20',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 1 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 1 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  personalShopper : false,
  hasPhoneInPS    : false,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/shoppers/shoppers-logo.png',
  hasAssets       : false,

  sf : {
    menuItems   : 'nav li.navigation__list__item:not(.navigation__list__item--is-mobile)',
    updatesLink : 'a.jumbotron__social-list__link.js-service-link',
    page404     : {
      productPageLink : '#beauty-shoppers',
      footerLinks     : '.storefront-footer__navigation-list__item',
    },
    mainPage : {
    },
  },

  lp : {
    nearBy                 : 'near you',
    searchAdvisorInSidebar : false,
  },

  bo : {
    onboarding : {
      vanityURL : true,
    },
    homeTabs : {
      contacts      : false,
      messageCenter : false,
      newLeads      : false,
    },
    product : {
      tpProductCount : 8,
      naProductCount : 4,
    },
    customerRequestsBadges : false,
  },

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://shop.shoppersdrugmart.ca/search?lang=en&text=shirt&sf_rep=#REP_NAME&sf_source_origin=storefront',
        htmlTitle         : 'Shop with Testy Rep0 Tester Rep0 - Shoppers Drug Mart',
        footerContent     : ['CUSTOMER SERVICE', 'MY ACCOUNT', 'ABOUT BLOOMINGDALE\'S', 'SHOPPING SERVICES'],
        page404           : {
          menuValidation : ['WOMEN', 'SHOES', 'HANDBAGS', 'JEWELRY & ACCESSORIES', 'BEAUTY', 'MEN', 'KIDS', 'HOME', 'SALE', 'DESIGNERS', 'EDITORIAL', 'GIFTS', 'THE REGISTRY'],
        },
      },
    },
  },

  widget : {
    appRequest : {
      appntType : {
        hasLiveChat : false,
      },
    },
  },
};

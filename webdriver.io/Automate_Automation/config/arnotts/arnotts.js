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
  share           : false,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/arnotts/arnotts-logo.png',
  hasAssets       : false,
  useWidgetsPage  : false,
  Selectors       : {
    popupCloseButton : '#onetrust-accept-btn-handler',
  },

  sf : {
    menuItems   : 'nav.js-storefront-navigation > ul > li.navigation__list__item > a.navigation__link',
    updatesLink : 'a.jumbotron__social-list__link.js-service-link',
    page404     : {
      footerLinks     : '', // no links
      productPageLink : '#navigation li.js-menu-item-wrapper',
    },
    mainPage : {
    },

  },

  lp : {
    dotChatWidget : false,
    hasCheckGeo   : false,
  },

  bo : {
    onboarding : {
      vanityURL      : true,
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
      currency : '$,€', // In backoffice and storefront arrnots has different currencies and this won't be fixed
      sf       : {
        searchTrackingUrl : 'https://www.arnotts.ie/search/?q=shirt&sf_rep=#REP_NAME&sf_source_origin=storefront',
        htmlTitle         : 'Shop with Testy Rep0 Tester Rep0 - ARNOTTS',
        page404           : {
          menuValidation : ['NEW IN', 'DRESSES', 'Jackets & Coats', 'Jumpsuits', 'Tops & Shirts', 'Jumpers & Cardigans', 'T-Shirts',
            'Skirts & Shorts', 'Trousers & Jeans', 'Bags & Accessories', 'Shoes', 'See All'],
        },
      },
    },
  },
};

const environment = process.env.NODE_APP_INSTANCE;
const retailer = process.env.NODE_ENV;
const repName = 'test_rep1';

module.exports = {
  storeID          : '1002',
  changedStoreCity : 'Montreal, QC',
  changedChatStore : 'Montreal - French With English',
  geo_ip           : '67.68.215.18',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 7 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 7 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  hasPrivacyPolicyLnk : false,
  languages           : ['fr_CA', 'en_US'],
  lang                : {
    fr_CA : {
      langName      : 'fr_CA',
      shoppingUrl   : `https://${retailer}-widgets-${process.env.NODE_APP_INSTANCE}.salesfloor-ecom.net/tests/desktop`,
      backOfficeUrl : `https://${retailer}-${environment}.salesfloor.net`,
      sidebarUrl    : `https://${retailer}-widgets-${process.env.NODE_APP_INSTANCE}.salesfloor-ecom.net/tests/desktop?domain=labaie.com`,
      sf            : {
        searchTrackingUrl : 'https://www.labaie.com/search?search-button=&lang=fr_CA&q=shirt'
          + '&sf_rep=#REP_NAME&sf_storeid=#STORE_ID&sf_associd=90000007&site_refer=salesfloor&sf_source_origin=storefront',
        htmlTitle : 'Magasinez avec Testy Rep0 Tester Rep0 - La Baie D\'Hudson',
        page404   : {
          menuValidation : ['MARQUES', 'FEMME', 'CHAUSSURES', 'SACS', 'ACCESSOIRES', 'BEAUTÉ', 'HOMME', 'ENFANT', 'JOUETS', 'MAISON', 'HBC', 'PLUS', 'L\'AUTOMNE 50', 'ÉTÉ', 'SOLDES'],
        },
      },
    },
    en_US : {
      langName      : 'en_US',
      shoppingUrl   : `https://${retailer}-widgets-${process.env.NODE_APP_INSTANCE}.salesfloor.net/tests/desktop`,
      backOfficeUrl : `https://${retailer}-${environment}.salesfloor.net`,
      sidebarUrl    : `http://${retailer}-widgets-${process.env.NODE_APP_INSTANCE}.salesfloor.net/tests/desktop?domain=thebay.com`,
      sf            : {
        searchTrackingUrl : 'https://www.thebay.com/search?search-button=&lang=en_CA&q=shirt'
          + '&sf_rep=#REP_NAME&sf_storeid=#STORE_ID&sf_associd=90000007&site_refer=salesfloor&sf_source_origin=storefront',
        htmlTitle     : 'Shop with Testy Rep0 Tester Rep0 - The Bay',
        footerContent : ['ORDER SUPPORT', 'SHOPPING OUR SITE', 'ABOUT US', 'SERVICES'],
        page404       : {
          menuValidation : ['BRANDS', 'WOMEN', 'SHOES', 'HANDBAGS', 'ACCESSORIES', 'BEAUTY', 'MEN', 'KIDS & BABY', 'TOYS', 'HOME', 'HBC STRIPES', 'SALE'],
        },
      },
    },
  },

  widget : {
    liveChat : {
      hasPrivacyPolicyLnk : false,
      hasSubscribeOpt     : true,
      hasSpecialityDrp    : true,
    },
    appRequest : {
      hasPrivacyPolicyLnk : false,
      hasSubscribeOpt     : true,
      hasSpecialityDrp    : true,
    },
  },

  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/hbc/images/hbc_s.png',

  sf : {
    menuItems   : 'nav li.navigation__list__item:not(.navigation__list__item--is-mobile)',
    repComments : '.product__comment',
    updatesLink : 'footer.jumbotron__footer ul li a.jumbotron__social-list__link.js-service-link',
    page404     : {
      footerLinks     : 'nav.storefront-footer__navigation > div',
      productPageLink : '.menu-group li',
    },
  },

  lp : {
    logoRetailerURL : 'https://res.cloudinary.com/salesfloor-net/image/upload/v1569854201/hbc/hbc_store_icon.svg',
  },

  bo : {
    onboarding : {
      specialties    : true,
      vanityURL      : true,
      socialNetworks : ['twitter'],
    },
    roles : {
      createUserRoles : ['admin', 'corp_admin'],
    },
    product : {
      tpProductCount : 16,
      naProductCount : 4,
    },
    newContactPhoneNumberStartsWith : '+1450202',
  },
};

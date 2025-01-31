const repName = 'test_rep1';

module.exports = {
  changedStoreCity : 'New York',
  changedChatStore : 'New York - Phony Shops',
  geo_ip           : '72.229.28.185',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 14 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 14 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  chatMode        : 'queue',
  sms             : true,
  socialShop      : true,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/peru/logo.png',
  Selectors       : {
    popupCloseButton : '#email_message .closebtn',
  },

  sf : {
    menuItems   : 'ul.navigation__list > li > a.navigation__link',
    repComments : '.product__comment',
    updatesLink : 'footer.jumbotron__footer ul li a.jumbotron__social-list__link.js-service-link',
    page404     : {
      productPageLink : '.navbar li',
      footerLinks     : '', // no links
    },
    articles : {
      prdDescCss : 'h1.product__title',
    },
  },

  bo : {
    onboarding : {
      vanityURL      : true,
      socialNetworks : ['twitter'],
    },
    roles : {
      createUserRoles : ['admin', 'corp_admin'],
    },
    product : {
      tpProductCount : 20,
    },
  },

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://www.peruvianconnection.com/search.do?query=shirt&sf_rep=#REP_NAME&sf_source_origin=storefront',
        htmlTitle         : 'Shop with Testy Rep0 Tester Rep0 - Peruvian Connection',
        page404           : {
          menuValidation : ['Sweaters', 'Dresses', 'Tees & Tops', 'Skirts & Pants', 'Coats & Jackets', 'Jewelry & Accessories', 'Lounge & Home', 'Men\'s', 'SALE'],
        },
      },
    },
  },

  widget : {
    appRequest : {
      appntType : {
        hasInStore : false,
      },
    },
  },
};

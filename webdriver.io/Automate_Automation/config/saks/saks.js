const repName = 'test_rep1';

module.exports = {
  storeID          : '1001',
  changedStoreCity : 'Toronto',
  changedChatStore : 'Bogus Plaza',
  geo_ip           : '196.247.56.19',
  logoRetailerURL  : 'https://saks-qa05.salesfloor.net/img/retailers/saks/saks_t.png',
  hasComexCookie   : false,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 14 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 14 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  /**
   * @prop {boolean} customerService=true - If true, you can forward to CS
   * from phpconfig file = customerservice.can_forward
   */
  customerService : false,

  sf : {
    updatesLink    : 'a.jumbotron__social-list__link.js-service-link',
    repComments    : '.product__comment',
    trProductCount : 8,
    page404        : {
      productPageLink : 'nav[aria-label="Main navigation menu"]',
      footerLinks     : 'a.storefront-footer__navigation-list__link',
    },
    mainPage : {
      events : true,
      posts  : false,
    },
    closeButton   : 'button.reveal__close-button.proper-icon-close',
    reportConcern : 'li.storefront-footer__header__list-item.fn-reportConcern',
  },

  lp : {
    personalShopper : false,
    dotChatWidget   : false,
    logoRetailerURL : 'https://res.cloudinary.com/salesfloor-net/image/upload/v1564504420/saks/sidebar-logo.png',
  },

  bo : {
    onboarding : {
      importContacts : true,
      specialties    : true,
      vanityURL      : true,
      socialNetworks : ['twitter'],
    },
    product : {
      tpProductCount : 16,
      naProductCount : 8,
    },
  },

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://www.saksfifthavenue.com/search?search-button=&lang=en_US&q=shirt'
          + '&sf_rep=#REP_NAME&sf_storeid=#STORE_ID&sf_associd=90000007&site_refer=salesfloor&sf_source_origin=storefront',
        htmlTitle     : 'Shop with Testy Rep0 Tester Rep0 - Saks',
        footerContent : ['Shop Saks', 'Stores & Corporate', 'Shipping & Returns', 'SaksFirst Credit Card'],
        page404       : {
          menuValidation : ['DESIGNERS', 'WOMEN\'S APPAREL', 'SHOES', 'HANDBAGS', 'JEWELRY & ACCESSORIES', 'BEAUTY', 'MEN', 'KIDS', 'HOME', 'TRENDING', 'GIFTS', 'SALE'],
        },
      },
    },
  },
};

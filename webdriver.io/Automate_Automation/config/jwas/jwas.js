const repName = 'test_rep1';

module.exports = {
  geo_ip           : '70.82.55.20',
  changedStoreCity : 'Laval',
  changedChatStore : 'Laval - Imaginary Center',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 14 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 14 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],

  sms             : true,
  share           : false,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/jwas/jwas-logo.png',

  sf : {
    menuItems      : 'nav.navigation > ul > li[class="navigation__list__item"] > a.navigation__link',
    updatesLink    : '.jumbotron__button__link.jwas-icon-updates.js-service-link',
    trProductCount : 4,
    page404        : {
      footerLinks     : 'ul.storefront-footer__navigation-list',
      productPageLink : '#maincontent',
    },
    articles : {
      prdDescCss : 'h1.product__title',
    },
  },

  lp : {
    logoRetailerURL : 'https://res.cloudinary.com/salesfloor-net/image/upload/v1553540086/jwas/sidebar-logo.png',
  },

  bo : {
    onboarding : {
      socialNetworks : ['twitter'],
    },
    product : {
      tpProductCount : 8,
      naProductCount : 8,
    },
  },

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://www.johnnywas.com/catalogsearch/result/?q=shirt&sf_rep=#REP_NAME&sf_source_origin=storefront',
        htmlTitle         : 'Shop with Testy Rep0 Tester Rep0 - Johnny Was',
        footerContent     : ['ABOUT', 'CUSTOMER CARE'],
        page404           : {
          menuValidation : ['NEW ARRIVALS', 'MASKS', 'CLOTHING', 'DRESSES', 'CALMÉ SUSTAINABLE', 'ACCESSORIES', 'HOME', 'SWIM', 'FALL EDIT', 'SALE'],
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

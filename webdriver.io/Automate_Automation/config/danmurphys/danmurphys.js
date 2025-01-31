/**
 * Created by agultsov on 11/08/21.
 */
const repName = 'test_rep1';

module.exports = {
  chatMode         : 'queue',
  changedStoreCity : 'Montreal',
  changedChatStore : 'Montreal - Fake Mall',
  geo_ip           : '167.114.209.19',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 5 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 5 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  share           : false,
  hasAssets       : false,
  customerService : false,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/danmurphys/danmurphys-logo.png',

  sf : {
    menuItems   : '.storefront-header__navigation li.navigation__list__item',
    updatesLink : 'a.jumbotron__social-list__link.js-service-link',
    page404     : {
      footerLinks     : 'li.storefront-footer__navigation-list__item',
      productPageLink : '.mega-nav ul li',
    },
    articles : {
      prdDescCss : 'p.product__brand',
    },
    mainPage : {
      hasEmailMeRequest : false,
    },
  },

  lp : {
    hasEmailMeRequest : false,
    dotChatWidget     : false,
  },

  ft : {
    hasEmailMeRequest : false,
  },

  bo : {
    onboarding : {
      importContacts : true,
      vanityURL      : true,
      socialNetworks : ['twitter'],
    },
    product : {
      tpProductCount : 16,
      naProductCount : 0,
    },
  },

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://www.danmurphys.com.au/search?searchTerm=shirt&sf_rep=#REP_NAME&sf_source_origin=storefront&size=24',
        htmlTitle         : 'Shop with Testy Rep0 Tester Rep0 - Dan Murphy\'s',
        page404           : {
          menuValidation : ['NEW IN', 'DRESSES', 'Jackets & Coats', 'Jumpsuits', 'Tops & Shirts', 'Jumpers & Cardigans', 'T-Shirts',
            'Skirts & Shorts', 'Trousers & Jeans', 'Bags & Accessories', 'Shoes', 'See All'],
        },
      },
    },
  },
};

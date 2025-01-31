/**
 * Created by agultsov on 10/29/21.
 */
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
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/macys/macys-logo.png',

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

  sf : {
    menuItems   : '.storefront-header li.storefront-header__list__item',
    updatesLink : 'a.jumbotron__social-list__link.js-service-link',
    page404     : {
      footerLinks     : 'li.storefront-footer__navigation-list__item',
      productPageLink : '#mainNavigation ul li',
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
      specialties    : true,
      vanityURL      : true,
      socialNetworks : ['twitter'],
    },
    product : {
      naProductCount : 4,
    },
  },

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://www.macys.com/shop/search?keyword=shirt&sf_rep=#REP_NAME&sf_source_origin=storefront',
        htmlTitle         : 'Shop with Testy Rep0 Tester Rep0 - Macys',
        page404           : {
          menuValidation : ['NEW IN', 'DRESSES', 'Jackets & Coats', 'Jumpsuits', 'Tops & Shirts', 'Jumpers & Cardigans', 'T-Shirts',
            'Skirts & Shorts', 'Trousers & Jeans', 'Bags & Accessories', 'Shoes', 'See All'],
        },
      },
    },
  },
};

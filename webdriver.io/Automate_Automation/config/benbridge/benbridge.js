/**
 * Created by agultsov on 10/01/20.
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
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/benbridge/benbridge-logo.png',

  sf : {
    menuItems   : 'nav.js-storefront-navigation > ul > li.navigation__list__item > a.navigation__link',
    updatesLink : 'a.jumbotron__social-list__link.js-service-link',
    page404     : {
      footerLinks     : '', // no links
      productPageLink : '#navigation li.nav-item',
    },
    articles : {
      prdDescCss : 'h1.product__title',
    },
  },

  lp : {
    dotChatWidget   : false,
    logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/benbridge/benbridge_sidebar.png',
  },

  bo : {
    onboarding : {
      vanityURL      : true,
      socialNetworks : ['twitter'],
      importContacts : true,
    },
    product : {
      tpProductCount : 8,
      naProductCount : 4,
    },
  },

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://www.benbridge.com/search?q=shirt&sf_rep=#REP_NAME&sf_source_origin=storefront',
        htmlTitle         : 'Shop with Testy Rep0 Tester Rep0 - Ben Bridge',
        page404           : {
          menuValidation : ['NEW IN', 'DRESSES', 'Jackets & Coats', 'Jumpsuits', 'Tops & Shirts', 'Jumpers & Cardigans', 'T-Shirts',
            'Skirts & Shorts', 'Trousers & Jeans', 'Bags & Accessories', 'Shoes', 'See All'],
        },
      },
    },
  },
};

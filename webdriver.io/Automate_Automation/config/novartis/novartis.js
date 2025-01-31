/**
 * Created by agultsov on 10/28/21.
 */
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
  share           : false,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/novartis/novartis-logo.png',
  customerService : false,
  hasProducts     : false,
  hasAssets       : false,

  sf : {
    menuItems   : '',
    updatesLink : '',
    page404     : {
      footerLinks     : '.storefront-footer__navigation a.storefront-footer__navigation-list__link',
      productPageLink : '#navigation li.menu__item',
    },
    articles : {
      opt : {
        salePriceFirst : true,
      },
    },
  },

  lp : {
    dotChatWidget          : false,
    hasCheckGeo            : false,
    personalShopper        : false,
    searchAdvisorInSidebar : false,
  },

  bo : {
    onboarding : {
      vanityURL   : true,
      specialties : true,
    },
    product : {
      tpProductCount : 0,
    },
  },

  widget : {
    appRequest : {
      appntType : {
        hasInStore : false,
      },
    },
  },

  languages : ['en_US', 'fr_CA'],
  lang      : {
    en_US : {
      sf : {
        htmlTitle : 'Testy Rep0 Tester Rep0 - Novartis',
        page404   : {
          menuValidation : ['NEW IN', 'DRESSES', 'Jackets & Coats', 'Jumpsuits', 'Tops & Shirts', 'Jumpers & Cardigans', 'T-Shirts',
            'Skirts & Shorts', 'Trousers & Jeans', 'Bags & Accessories', 'Shoes', 'See All'],
        },
      },
    },
    fr_CA : {
      langName      : 'fr_CA',
      shoppingUrl   : `https://${retailer}-widgets-${environment}.salesfloor.net/tests/desktop`,
      sidebarUrl    : `http://${retailer}-widgets-${environment}.salesfloor.net/tests/desktop`,
      backOfficeUrl : `https://${retailer}-${environment}.salesfloor.net`,
      htmlTitle     : 'Shop with Testy Rep0 Tester Rep0 - Novartis',

      sf : {
        htmlTitle : 'Shop with Testy Rep0 Tester Rep0 - Novartis',
        page404   : {
          menuValidation : ['NEW IN', 'DRESSES', 'Jackets & Coats', 'Jumpsuits', 'Tops & Shirts', 'Jumpers & Cardigans', 'T-Shirts',
            'Skirts & Shorts', 'Trousers & Jeans', 'Bags & Accessories', 'Shoes', 'See All'],
        },
      },
    },
  },
};

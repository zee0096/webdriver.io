/**
 * Created by agultsov on 10/19/21.
 */
const environment = process.env.NODE_APP_INSTANCE;
const retailer = process.env.NODE_ENV;
const storeID = '1008';

module.exports = {
  changedStoreCity : 'Toronto',
  changedChatStore : 'Toronto - Bogus Plaza',
  geo_ip           : '67.68.215.18',
  repName          : 'fake-mall',
  store            : 'FAKE MALL',
  storeAPIValue    : storeID,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 30 },
    { name : 'sf_wdt_tracking_store', value : storeID, expiration : 30 },
    { name : 'sf_wdt_footer_store_session', value : storeID, expiration : 'Session' },
  ],

  mode            : 'team',
  sidebar         : false,
  personalShopper : false,
  hasAssets       : false,
  customerService : false,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/shiseido/shiseido-logo.png',

  widget : {
    appRequest : {
      appntType : {
        hasPhone    : false,
        hasLiveChat : false,
        hasInStore  : false,
        hasVirtual  : true,
      },
    },
  },
  sf : {
    menuItems   : '',
    updatesLink : '',
    page404     : {
      productPageLink : '#omsHeader_menu li',
      footerLinks     : 'ul.storefront-footer__navigation-list > li',
    },
    articles : {
      prdDescCss : 'h1.product__title',
    },
    mainPage : {
      posts         : false,
      imageCount    : 0,
    },
  },

  lp : {
    personalShopper        : false,
    visitStorefront        : true,
    searchAdvisorInSidebar : false,
  },

  bo : {
    onboarding : {
      importContacts : true,
    },
    product : {
      tpProductCount : 8,
      naProductCount : 4,
    },
    homeTabs : {
      newLeads : false,
    },
  },

  languages : ['ja_JP'],
  lang      : {
    ja_JP : {
      langName      : 'ja_JP',
      currency      : '¥',
      shoppingUrl   : `https://${retailer}-widgets-${environment}.salesfloor.net/tests/desktop`,
      sidebarUrl    : `http://${retailer}-widgets-${environment}.salesfloor.net/tests/desktop`,
      backOfficeUrl : `https://${retailer}-${environment}.salesfloor.net`,
      htmlTitle     : 'Winkelen met Fake Mall - Perry Sport',

      sf : {
        footerContent : ['Order Status', 'Customer Service', 'Gift Cards', 'Our Story', 'Dream Jobs', 'Catalog', 'Download our App'],
        page404       : {
          menuValidation : ['SALE', 'NEW', 'PRINTS + COLORS', 'DRESSES', 'CLOTHING', 'SWIM', 'GIFTS + ACCESSORIES', 'GIRLS'],
        },
        htmlTitle        : 'Omise+ supported by SHISEIDO// Fake Mall',
        availableRepText : '',
      },
    },
  },

  ft : {
    hasPersonalShopper    : false,
  },
};

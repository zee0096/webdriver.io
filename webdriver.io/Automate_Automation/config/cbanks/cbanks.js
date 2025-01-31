/**
 * Created by agultsov on 05/23/22.
 */
const storeID = '1031';

module.exports = {
  storeID,
  changedStoreCity : 'Toronto',
  changedChatStore : 'Toronto - Bogus Plaza',
  geo_ip           : '70.82.55.20',
  repName          : 'fake-mall',
  store            : 'Fake Mall',
  storeAPIValue    : storeID,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 30 },
    { name : 'sf_wdt_tracking_store', value : storeID, expiration : 30 },
    { name : 'sf_wdt_footer_store_session', value : storeID, expiration : 'Session' },
  ],
  mode            : 'team',
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/cbanks/cbanks-logo.png',

  widget : {
    appRequest : {
      hasSubscribeOpt : false,
      appntType       : {
        hasInStore : false,
        hasVirtual : true,
      },
    },
  },
  // variables by system
  // storefront
  sf : {
    menuItems   : 'ul > li.navigation__list__item > a.navigation__link',
    updatesLink : 'a[data-modal-open="inscriptionModal"]',
    page404     : {
      productPageLink : '#navigation li',
      footerLinks     : '.storefront-footer__navigation-list',
    },
    articles : {
      prdDescCss : 'h1.product__title',

    },
    mainPage : {
      imageCount    : 0,
    },
  },
  // landingpage selectors
  lp : {
    visitStorefront        : false,
    hasCheckGeo            : false,
    searchAdvisorInSidebar : false,
  },
  // BackOffice selectors
  bo : {
    onboarding : {
      importContacts : true,
      socialNetworks : [],
    },
    product : {
      tpProductCount : 8,
      naProductCount : 4,
    },
    homeTabs : {
      newLeads : false,
    },
  },
  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://www.christopherandbanks.com/search?q=shirt&sf_store=#STORE_ID&sf_source_origin=storefront',
        htmlTitle         : 'Shop with Fake Mall - Christopher & Banks',
        footerContent     : ['Order Status', 'Customer Service', 'Gift Cards', 'Our Story', 'Dream Jobs', 'Catalog', 'Download our App'],
        page404           : {
          menuValidation : ['SALE', 'NEW', 'PRINTS + COLORS', 'DRESSES', 'CLOTHING', 'SWIM', 'GIFTS + ACCESSORIES', 'GIRLS'],
        },
      },
    },
  },
};

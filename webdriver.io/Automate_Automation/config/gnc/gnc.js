/**
 * Created by agultsov on 12/21/21.
 */
const storeID = '13';

module.exports = {
  changedStoreCity : 'Toronto',
  changedChatStore : 'Toronto - Bogus Plaza',
  geo_ip           : '70.82.55.20',
  repName          : 'fake-mall',
  store            : 'Fake Mall',
  hasAssets        : false,
  hasProducts      : false,
  storeAPIValue    : storeID,
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 30 },
    { name : 'sf_wdt_tracking_store', value : storeID, expiration : 30 },
    { name : 'sf_wdt_footer_store_session', value : storeID, expiration : 'Session' },
  ],
  mode            : 'team',
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/gnc/gnc-logo.png',

  // variables by system
  // storefront
  sf : {
    searchTrackingUrl : 'https://www.gnc.com/search?q=shirt'
      + '&sf_store=#STORE_ID&sf_source_origin=storefront',
    menuItems   : 'ul > li.navigation__list__item > a.navigation__link',
    updatesLink : 'a[data-modal-open="inscriptionModal"]',
    page404     : {
      productPageLink : '#main-nav-wrapper li',
      footerLinks     : '.storefront-footer__navigation-list > a',
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
    searchAdvisorInSidebar : false,
  },
  // BackOffice selectors
  bo : {
    onboarding : {
    },
    product : {
      tpProductCount    : 8,
      naProductCount    : 8,
      tpProductTitleSel : 'section:not([data-library="deals"], .identity-ctn, .recommendations-panel) article .bo-brand-name'
    },
    homeTabs : {
      newLeads : false,
    },
  },
  lang : {
    en_US : {
      sf : {
        htmlTitle     : 'Shop with Fake Mall - GNC',
        footerContent : ['Order Status', 'Customer Service', 'Gift Cards', 'Our Story', 'Dream Jobs', 'Catalog', 'Download our App'],
        page404       : {
          menuValidation : ['SALE', 'NEW', 'PRINTS + COLORS', 'DRESSES', 'CLOTHING', 'SWIM', 'GIFTS + ACCESSORIES', 'GIRLS'],
        },
      },
    },
  },
};

/**
 * Created by agultsov on 05/19/22.
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

  posts             : false,
  useWidgets        : true,
  personalShopper   : false,
  phoneInPS         : true,
  share             : false,
  sfHTMLTitle_en_US : 'Shop with Testy Rep0 Tester Rep0 - Credo Beauty',
  logoRetailerURL   : 'https://cdn.salesfloor.net/salesfloor-assets/credobeauty/credobeauty-logo.png',
  Selectors         : {
    modal       : ['dialog.popup.popup-modal.has-newsletter.has-social-icons.completed'],
    productPage : '#shopify-section-product',
  },

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://credobeauty.com/pages/search-results-page?q=shirt'
          + '&sf_rep=#REP_NAME&sf_source_origin=storefront',
        htmlTitle : 'Shop with Testy Rep0 Tester Rep0 - Credo Beauty',
      },
    },
  },

  sf : {
    menuItems : '',
    page404   : {
      productPageLink     : '[role="navigation"] li',
      footerContent_en_US : [],
    },
    articles : {
      prdDescCss : 'h1.product__title',
    },
    mainPage : {
      hasAppointmentRequest : false,
      events                : false,
    },
  },

  lp : {
    dotChatWidget         : false,
    personalShopper       : false,
    hasCheckGeo           : false,
    hasEmailMeRequest     : false,
    hasAppointmentRequest : false,
  },

  bo : {
    onboarding : {
      importContacts : true,
      vanityURL      : true,
      socialNetworks : ['twitter'],
    },
    product : {
      naProductCount : 4,
    },
  },
  ft : {
    hasAppointmentRequest : false,
  },
};

const repName = 'test_rep1';

module.exports = {
  useWidgetsPage   : false,
  changedStoreCity : 'Montreal',
  changedChatStore : 'Montreal - Fake Mall',
  geo_ip           : '167.114.209.19',
  cookies          : [
    { name : 'sf_wdt_tracking', value : 'true', expiration : 5 },
    { name : 'sf_wdt_tracking_rep', value : repName, expiration : 5 },
    { name : 'sf_wdt_footer_rep_session', value : repName, expiration : 'Session' },
  ],
  sms             : true,
  logoRetailerURL : 'https://cdn.salesfloor.net/salesfloor-assets/allenedmonds/allenedmonds-logo.png',
  hasAssets       : false,
  sf              : {
    updatesLink    : 'a[data-modal-open="inscriptionModal"]',
    hasRepComments : false,
    page404        : {
      footerLinks     : 'li.storefront-footer__navigation-list__item',
      productPageLink : '#header',
    },
    mainPage : {
    },
  },

  lp : {
  },

  bo : {
    onboarding : {
      vanityURL : true,
    },
    product : {
      tpProductCount : 8,
      naProductCount : 8,
    },
  },

  lang : {
    en_US : {
      sf : {
        searchTrackingUrl : 'https://www.allenedmonds.com/search?q=shirt&'
          + 'sf_rep=#REP_NAME&sf_source_origin=storefront#sort=relevancy',
        htmlTitle : 'Shop with Testy Rep0 Tester Rep0 - Allen Edmonds',
      },
    },
  },
};
